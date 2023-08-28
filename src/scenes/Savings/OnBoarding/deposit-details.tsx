import * as React from "react"
import {
  FormControlLabel,
  FormControl,
  MenuItem,
  InputAdornment,
  Radio,
  RadioGroup,
  FormLabel,
  Input,
  Box,
  Button,
  Grid,
  Select,
  Typography,
  Checkbox,
} from "@mui/material"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "src/app/hooks"
import { selectStep, postDepositDetails } from "../OnBoarding/store"
import {
  getSelectedProduct,
  getDepositSuccess,
  getDepositDetails,
} from "../OnBoarding/store/selectors"
import { useNavigate } from "react-router-dom"
import "./Onboarding.scss"
import { KeyboardArrowDown } from "@mui/icons-material"
import { CommonNextButton } from "./components/common-next-button"
import CustomizedDialogsBox from "src/components/CustomizedDialogsBox"
import { useForm } from "./components/helpers/formValidation"
import Reaptcha from "reaptcha"

export const DepositDetails: React.FC = () => {
  const depositDetails = useAppSelector(getDepositDetails)
  const [openDilog, setOpenDilog] = useState(false)

  const [onNext, setOnNext] = useState(false)

  const { handleSubmit, handleChange, data, errors } = useForm({
    validations: {
      depositProduct: {
        required: {
          value: true,
          message: "This field is required",
        },
      },
      intendedDepositAmount: {
        required: {
          value: true,
          message: "This field is required",
        },
        pattern: {
          value: "^[0-9]*$",
          message: "This field should be number",
        },
        custom: {
          isValid: (value: string) =>
            parseInt(value) > 999 && parseInt(value) < 100000,
          message: "you need to deposit at least £1,000 or maximum £100,000",
        },
      },
      agreementConfirmation: {
        required: {
          value: true,
          message: "This field is required",
        },
        custom: {
          isValid: (value: boolean) => value,
          message: `You must confirm you have read the requirements in the "What you should know before you start"`,
        },
      },
      applicantsUKResidenceConfirmation: {
        required: {
          value: true,
          message: "This field is required",
        },
        custom: {
          isValid: (value: string) => value === "yes",
          message:
            "Unfortunately, you are not eligible for one of our accounts",
        },
      },
      privacyNotice: {
        required: {
          value: true,
          message: `You must confirm that you have read our Privacy Notice.`,
        },
      },
      recaptchaResponse: {
        required: {
          value: true,
          message:
            "Please complete the CAPTCHA field in order to progress to the next page",
        },
      },
    },
    onSubmit: () => handleClickOnsubmit(),
    initialValues: {
      depositProduct: depositDetails.depositProduct
        ? depositDetails.depositProduct
        : 0,
      intendedDepositAmount: depositDetails.intendedDepositAmount
        ? depositDetails.intendedDepositAmount
        : "",
      agreementConfirmation: depositDetails.agreementConfirmation
        ? depositDetails.agreementConfirmation
        : false,
      applicantsUKResidenceConfirmation:
        depositDetails.applicantsUKResidenceConfirmation ? "yes" : "no",
      privacyNotice: depositDetails.privacyNotice
        ? depositDetails.privacyNotice
        : false,
      recaptchaResponse: depositDetails.recaptchaResponse
        ? depositDetails.recaptchaResponse
        : "",
    },
  })

  const selectedProduct = useAppSelector(getSelectedProduct)
  const depositSuccess = useAppSelector(getDepositSuccess)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [captchaToken, setCaptchaToken] = useState(null)
  const captchaRef = React.useRef(null)

  const captchVerify = () => {
    captchaRef.current.getResponse().then((res: any) => {
      handleChange("recaptchaResponse", { target: { value: res } })
      setCaptchaToken(res)
    })
  }

  useEffect(() => {
    dispatch(selectStep(0))
    if (depositSuccess && onNext) {
      navigate("/savings/personal-details")
    }
  }, [depositSuccess, data, dispatch, onNext, navigate, errors])

  const handleClickOnsubmit = () => {
    console.log("submited", data)
    setOnNext(true)
    dispatch(postDepositDetails(data))
  }
  const handleClick = () => {
    //navigate("/savings/personal-details")
    var pagebutton = document.getElementById("submitButton")
    pagebutton?.click()
  }

  const policyConfirmation = () => {
    setOpenDilog(false)
    handleChange("privacyNotice", { target: { value: true } })
  }

  const privacyNoticeClick = () => {
    if (data.privacyNotice) {
      handleChange("privacyNotice", { target: { value: false } })
    } else {
      setOpenDilog(true)
    }
  }

  return (
    <Box id="deposit-details" className="deposit-details">
      <Box className="title">What you should know before you start</Box>
      <ul className="WorkSansFamily">
        <li>
          Accounts are available to UK residents aged 18 and over who are liable
          to pay tax only in the UK
        </li>
        <li>
          To open an account with us, you will need the account number and sort
          code of a UK current account on which you are named as an account
          holder. The account will be used as the source of any money you
          deposit with us, and it will also be used as the destination account
          for any funds you withdraw.
        </li>
        <li>
          You must deposit at least £1,000 within 14 calender days of the
          account being opened.
        </li>
        <li>
          Alba Bank does not provide online banking facility at this point of
          time.
        </li>
      </ul>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              required
              className={errors.depositProduct ? "error" : ""}
            >
              <FormLabel className="label">
                Select your savings account
              </FormLabel>
              <Select
                className="input"
                variant="standard"
                disableUnderline
                IconComponent={KeyboardArrowDown}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                placeholder={"choose one"}
                value={data.depositProduct || 0}
                onChange={(e: any) => handleChange("depositProduct", e)}
              >
                <MenuItem value={0}>Choose one</MenuItem>
                <MenuItem value={"FTD_Test1"}>
                  Fixed Rate Deposit (Issue 11) - AER 4.99%
                </MenuItem>
                <MenuItem value={"FTD_Test1"}>
                  Fixed Rate Deposit (Issue 14) - AER 4.95%
                </MenuItem>
              </Select>
              {errors.depositProduct && (
                <p className="msg">{errors.depositProduct}</p>
              )}
            </FormControl>
          </Grid>
        </Grid>
        <FormControl
          fullWidth
          variant="standard"
          required
          className={errors.intendedDepositAmount ? "error" : ""}
        >
          <FormLabel className="label">
            How much are you intending to deposit into this account?
          </FormLabel>
          <Grid container columnSpacing={4}>
            <Grid item xs={12} sm={3}>
              <Input
                value={data.intendedDepositAmount || ""}
                disableUnderline
                fullWidth
                placeholder="Enter amount"
                className="input"
                id="standard-adornment-amount"
                onInput={(el) => handleChange("intendedDepositAmount", el)}
                startAdornment={
                  <InputAdornment position="start">£</InputAdornment>
                }
              />
            </Grid>
          </Grid>
          {errors.intendedDepositAmount && (
            <p className="msg">{errors.intendedDepositAmount}</p>
          )}
        </FormControl>
        <FormControl
          className={errors.applicantsUKResidenceConfirmation ? "error" : ""}
        >
          <FormLabel className="label" id="demo-row-radio-buttons-group-label">
            Can you confirm that all applicants are resident in the UK and
            liable to pay tax only in the UK? *
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={
              data.applicantsUKResidenceConfirmation === "yes" ? "yes" : "no"
            }
          >
            <FormControlLabel
              className="radio"
              value="yes"
              control={
                <Radio
                  onClick={(el) =>
                    handleChange("applicantsUKResidenceConfirmation", {
                      target: { value: "yes" },
                    })
                  }
                />
              }
              label="Yes"
            />
            <FormControlLabel
              className="radio"
              value="no"
              control={
                <Radio
                  onClick={(el) =>
                    handleChange("applicantsUKResidenceConfirmation", {
                      target: { value: "no" },
                    })
                  }
                />
              }
              label="No"
            />
          </RadioGroup>
          {errors.applicantsUKResidenceConfirmation && (
            <p className="msg">{errors.applicantsUKResidenceConfirmation}</p>
          )}
        </FormControl>
        <Box className={errors.recaptchaResponse ? "error" : ""}>
          <Reaptcha
            className="recaptcha"
            sitekey={import.meta.env.VITE_CAPTCH_SITE_KEY}
            ref={captchaRef}
            onVerify={captchVerify}
          ></Reaptcha>
          {errors.recaptchaResponse && (
            <p className="msg">{errors.recaptchaResponse}</p>
          )}
        </Box>
        <Box className="label">Your privacy matters</Box>
        <Box className="privacy-text">
          We take your privacy seriously. We want to make sure you understand
          how we will use the personal information use provide us. Please read
          our <a onClick={() => setOpenDilog(true)}>Privacy Notice</a>, which is
          available on our website or you can request a copy.
        </Box>
        <Box className="checkbox" sx={{ flexDirection: "column" }}>
          <FormControl className={errors.privacyNotice ? "error" : ""}>
            <FormControlLabel
              control={<Checkbox checked={data.privacyNotice} />}
              label="I confirm that I have read the Privacy Notice"
              onChange={(el) => privacyNoticeClick()}
            />
            {errors.privacyNotice && (
              <p className="msg">{errors.privacyNotice}</p>
            )}
          </FormControl>
        </Box>
        <Box className="checkbox" sx={{ flexDirection: "column" }}>
          <FormControl className={errors.agreementConfirmation ? "error" : ""}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.agreementConfirmation}
                  onChange={(el) =>
                    handleChange("agreementConfirmation", {
                      target: { value: !data.agreementConfirmation },
                    })
                  }
                />
              }
              label="I confirm that I have read the requirements in the “What you should know before you start”"
            />
            {errors.agreementConfirmation && (
              <p className="msg">{errors.agreementConfirmation}</p>
            )}
          </FormControl>
        </Box>
        <Button
          onClick={(e) => handleSubmit(e)}
          sx={{ display: "none" }}
          id="submitButton"
        ></Button>
      </form>
      <CommonNextButton handleSteps={() => handleClick()} />
      <CustomizedDialogsBox
        title={"Privacy Notice Acceptance"}
        subTitle={""}
        open={openDilog}
        handleClose={() => setOpenDilog(false)}
        handleSubmit={policyConfirmation}
      >
        <Box>
          <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
            Privacy Notice
          </Typography>
          <ul>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi. Ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </li>
          </ul>
        </Box>
      </CustomizedDialogsBox>
    </Box>
  )
}
