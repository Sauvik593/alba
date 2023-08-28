import React, { useEffect, useState } from "react"
import { CommonNextButton } from "./components/common-next-button"
import { useAppDispatch, useAppSelector } from "src/app/hooks"
import { useNavigate } from "react-router-dom"
import { postApplication, selectStep } from "../OnBoarding/store"
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material"
import infoIcon from "src/resources/images/warning.svg"
import pdfIcon from "src/resources/images/pdf.svg"
import CustomizedDialogsBox from "src/components/CustomizedDialogsBox"
import { useForm } from "./components/helpers/formValidation"
import {
  getAccountDetails,
  getConsentDetails,
  getConsentDetailsSuccess,
  getDepositDetails,
  getPersonalDetails,
} from "./store/selectors"
import { formatDate } from "./components/helpers/common"

export const Consent: React.FC = () => {
  const depositDetails = useAppSelector(getDepositDetails)
  const personalDetails = useAppSelector(getPersonalDetails)
  const accountDetails = useAppSelector(getAccountDetails)
  const consentDetails = useAppSelector(getConsentDetails)
  const consentSuccess = useAppSelector(getConsentDetailsSuccess)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [dialogTitle, setDialogTitle] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  useEffect(() => {
    dispatch(selectStep(3))
  }, [])

  useEffect(() => {
    if (consentSuccess) navigate("/savings/your-application")
  }, [consentSuccess])

  const openPdf = (pdfType: string) => {
    setDialogTitle(
      {
        product: "Product Summary Acceptance",
        tnc: "Personal Terms and Conditions Acceptance",
        fscs: "FSCS Information Sheet and Exclusions List Acceptance",
      }[pdfType] as string,
    )
    setOpenDialog(true)
  }

  const { handleSubmit, handleChange, data, errors } = useForm({
    validations: {
      productConfirmation: {
        required: {
          value: true,
          message:
            "In order to proceed you must certify the statement below is true",
        },
      },
      tncConfirmation: {
        required: {
          value: true,
          message:
            "In order to proceed you must certify the statement below is true",
        },
      },
      fscsConfirmation: {
        required: {
          value: true,
          message:
            "In order to proceed you must certify the statement below is true",
        },
      },
      saveDetailsConfirmation: {
        required: {
          value: true,
          message:
            "In order to proceed you must certify the statement below is true",
        },
      },
    },
    onSubmit: () => handleSubmitClick(),
    initialValues: {
      contactByPhone: consentDetails.contactByPhone,
      contactByEmail: consentDetails.contactByEmail,
      contactByPost: consentDetails.contactByPost,
      productConfirmation: consentDetails.productConfirmation,
      tncConfirmation: consentDetails.tncConfirmation,
      fscsConfirmation: consentDetails.fscsConfirmation,
      saveDetailsConfirmation: consentDetails.saveDetailsConfirmation,
    },
  })

  const handleClick = (isNextClick: boolean) => {
    if (isNextClick) {
      handleSubmit()
    } else navigate("/savings/account-details")
  }

  const handleSubmitClick = () => {
    console.log("submited ")
    dispatch(postApplication(data))
  }

  return (
    <Box id="summary">
      <Grid container columnSpacing={2.5} rowSpacing={4}>
        <Grid item xs={12} lg={6}>
          <Box className="summary-card">
            <Box className="title">Product Details</Box>
            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={7}>
                <Typography className="field-name">Name</Typography>
                <Typography className="field-value">
                  {depositDetails.depositProduct}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography className="field-name">
                  Opening Deposit Amount
                </Typography>
                <Typography className="field-value">
                  £{depositDetails.intendedDepositAmount}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box className="summary-card">
            <Box className="title">Your Application Details</Box>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Typography className="field-name">Name</Typography>
                <Typography className="field-value">
                  {personalDetails.title +
                    " " +
                    personalDetails.firstName +
                    " " +
                    personalDetails.lastName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography className="field-name">Date Of Birth</Typography>
                <Typography className="field-value">
                  {formatDate(personalDetails.dob, "dd/mm/yyyy")}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box className="summary-card">
            <Box className="title">Your Address Details</Box>
            {personalDetails.addresses.map((address, index) => (
              <Grid container key={index}>
                <Grid item xs={12} sm={6}>
                  <Typography className="field-name">
                    Current Postcode
                  </Typography>
                  <Typography className="field-value">
                    {address.postCode}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography className="field-name">
                    Current Address
                  </Typography>
                  <Typography className="field-value">
                    {address.addressLine1 +
                      ", " +
                      (address.addressLine2
                        ? address.addressLine2 + ", "
                        : "") +
                      address.town +
                      ", " +
                      address.county}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box className="summary-card">
            <Box className="title">Contact Information</Box>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Typography className="field-name">Phone</Typography>
                <Typography className="field-value">
                  {personalDetails.phoneNumber}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography className="field-name">Email Address</Typography>
                <Typography className="field-value">
                  {personalDetails.email}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box className="summary-card">
            <Box className="title">Nominated Account Information</Box>
            <Typography className="subtitle">
              The bank details you're funding your account from
            </Typography>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Typography className="field-name">Sort Code</Typography>
                <Typography className="field-value">
                  {accountDetails.sortCode}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography className="field-name">Account Number</Typography>
                <Typography className="field-value">
                  {accountDetails.accountNumber}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Typography className="label">Your Marketing Perference</Typography>
      <Box className="info">
        <img src={infoIcon} alt="info icon" />
        Please note – you may withdraw your consent at any time by changing your
        preferences by contacting our Customer Services Team.
      </Box>
      <Typography className="description">
        We aim to keep you informed about our products and services that we
        believe might capture your interest. Rest assured, these communications
        will exclusively originate from Alba Bank and will not involve any third
        parties. To ensure that you receive such valuable information, kindly
        indicate your preferences by selecting the appropriate checkboxes below.
      </Typography>
      <Box sx={{ display: "flex" }} className="marketing-preference">
        <FormControlLabel
          className="checkbox"
          control={
            <Checkbox
              checked={data.contactByPost}
              onChange={(el) =>
                handleChange("contactByPost", {
                  target: { value: !data.contactByPost },
                })
              }
            />
          }
          label="Contact me by post"
        />
        <FormControlLabel
          className="checkbox"
          control={
            <Checkbox
              checked={data.contactByEmail}
              onChange={(el) =>
                handleChange("contactByEmail", {
                  target: { value: !data.contactByEmail },
                })
              }
            />
          }
          label="Contact me by email"
        />
        <FormControlLabel
          className="checkbox"
          control={
            <Checkbox
              checked={data.contactByPhone}
              onChange={(el) =>
                handleChange("contactByPhone", {
                  target: { value: !data.contactByPhone },
                })
              }
            />
          }
          label="Contact me by phone"
        />
      </Box>
      <Box className="divider"></Box>
      <Typography className="label">Terms and Conditions</Typography>
      <Typography className="description">
        These documents contain important information that should be read
        carefully before completing your application. It is important that you
        download, read and retain copies for your records. Should you have any
        questions or require further information, please contact our Customer
        Services Team.
      </Typography>
      <Box className="pdf-box" onClick={() => openPdf("product")}>
        <img src={pdfIcon} alt="pdf icon" />
        <Typography sx={{ marginLeft: "10px" }}>Product Summary</Typography>
      </Box>
      <Box className="pdf-box" onClick={() => openPdf("tnc")}>
        <img src={pdfIcon} alt="pdf icon" />
        <Typography sx={{ marginLeft: "10px" }}>
          Personal Terms and Conditions
        </Typography>
      </Box>
      <Box className="checkbox">
        <FormControl className={errors.productConfirmation ? "error" : ""}>
          <FormControlLabel
            control={
              <Checkbox
                checked={data.productConfirmation}
                onChange={(el) =>
                  handleChange("productConfirmation", {
                    target: { value: !data.productConfirmation },
                  })
                }
              />
            }
            label="I confirm that I have downloaded, read and agree to the Product Summary"
          />
          {errors.productConfirmation && (
            <p className="msg">{errors.productConfirmation}</p>
          )}
        </FormControl>
      </Box>
      <Box className="checkbox">
        <FormControl className={errors.tncConfirmation ? "error" : ""}>
          <FormControlLabel
            control={
              <Checkbox
                checked={data.tncConfirmation}
                onChange={(el) =>
                  handleChange("tncConfirmation", {
                    target: { value: !data.tncConfirmation },
                  })
                }
              />
            }
            label="I confirm that I have downloaded, read and agree to the Personal Terms and Conditions"
          />
          {errors.tncConfirmation && (
            <p className="msg">{errors.tncConfirmation}</p>
          )}
        </FormControl>
      </Box>
      <Box className="divider"></Box>
      <Typography className="label">Depositor Guarantee Scheme</Typography>
      <Typography className="description">
        Your deposits are protected by the Financial Services Guarantee Scheme
        (FSCS). It is important that you download, read and retain a copy of the
        FSCS Information Sheet and Exclusions List.
      </Typography>
      <Box className="pdf-box" onClick={() => openPdf("fscs")}>
        <img src={pdfIcon} alt="pdf icon" />
        <Typography sx={{ marginLeft: "10px" }}>
          FSCS Information Sheet and Exclusions List
        </Typography>
      </Box>
      <Box className="checkbox">
        <FormControl className={errors.fscsConfirmation ? "error" : ""}>
          <FormControlLabel
            control={
              <Checkbox
                checked={data.fscsConfirmation}
                onChange={(el) =>
                  handleChange("fscsConfirmation", {
                    target: { value: !data.fscsConfirmation },
                  })
                }
              />
            }
            label="I confirm that I have downloaded and read the FSCS Information Sheet and Exclusions List."
          />
          {errors.fscsConfirmation && (
            <p className="msg">{errors.fscsConfirmation}</p>
          )}
        </FormControl>
      </Box>
      <Box className="checkbox">
        <FormControl className={errors.saveDetailsConfirmation ? "error" : ""}>
          <FormControlLabel
            control={
              <Checkbox
                checked={data.saveDetailsConfirmation}
                onChange={(el) =>
                  handleChange("saveDetailsConfirmation", {
                    target: { value: !data.saveDetailsConfirmation },
                  })
                }
              />
            }
            label="I certify that the above information is correct and give my consent for Alba Bank to use and store my personal details."
          />
          {errors.saveDetailsConfirmation && (
            <p className="msg">{errors.saveDetailsConfirmation}</p>
          )}
        </FormControl>
      </Box>
      <CommonNextButton handleSteps={(e: boolean) => handleClick(e)} />
      <CustomizedDialogsBox
        title={dialogTitle}
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleSubmit={() => {}}
      >
        <h1>Pdf file here</h1>
      </CustomizedDialogsBox>
    </Box>
  )
}
