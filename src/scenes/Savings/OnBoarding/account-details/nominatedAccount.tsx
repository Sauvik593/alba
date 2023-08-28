import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  Typography,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { Form } from "react-router-dom"
import SortCode from "src/components/SortCode"
import { useForm } from "../components/helpers"
import { postAccountDetails } from "../store"
import { useAppDispatch, useAppSelector } from "src/app/hooks"
import { CommonNextButton } from "../components/common-next-button"
import { useNavigate } from "react-router-dom"
import { selectStep } from "../store"
import { getAccountDetails, getAccountDetailsSuccess } from "../store/selectors"

type NominatedAccountProps = {
  setNavigationStatus: any
}

export const NominatedAccount = ({
  setNavigationStatus,
}: NominatedAccountProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const accountDetails = useAppSelector(getAccountDetails)
  const accountDetailsSuccess = useAppSelector(getAccountDetailsSuccess)
  const [isSubmit, setIsSubmit] = useState(false)

  const { handleSubmit, handleChange, data, errors } = useForm({
    validations: {
      accountNumber: {
        required: {
          value: true,
          message: "This field is required",
        },
        pattern: {
          value: /^[0-9]+$/,
          message: "Please enter a valid account number",
        },
        custom: {
          isValid: (value: string) => value.length === 8,
          message: "Please enter a valid account number",
        },
      },
      sortCode: {
        required: {
          value: true,
          message: "This field is required",
        },
        pattern: {
          value: /^[0-9]+$/,
          message: "Please enter a valid sort code",
        },
        custom: {
          isValid: (value: string) => value.length === 6,
          message: "Please enter a valid sort code",
        },
      },
      accountHolderOfNominatedAccount: {
        required: {
          value: true,
          message: "You need to tick the box below to proceed",
        },
      },
    },
    onSubmit: () => handleSubmitClick(),
    initialValues: {
      sortCode: accountDetails.sortCode,
      accountNumber: accountDetails.accountNumber,
      accountHolderOfNominatedAccount:
        accountDetails.accountHolderOfNominatedAccount,
    },
  })
  const handleSubmitClick = () => {
    dispatch(postAccountDetails(data))
    setIsSubmit(true)
  }
  useEffect(() => {
    if (accountDetailsSuccess && isSubmit) {
      dispatch(selectStep(3))
      navigate("/savings/consent")
    }
  }, [accountDetailsSuccess, dispatch, isSubmit, navigate])
  const handleClick = (e: boolean) => {
    setNavigationStatus(e)
    if (e) {
      var pagebutton = document.getElementById("submitButton")
      pagebutton?.click()
      console.log("submit click")
    } else {
      dispatch(selectStep(1))
      navigate("../personal-details")
    }
  }
  return (
    <Box>
      <Box sx={{ paddingTop: 5 }}>
        <ul>
          <li>
            In order to perform deposits and withdrawals from your Alba Bank
            account, it is necessary for you to provide us with a "Nominated
            Account." This account should be held with a bank or building
            society in the United Kingdom and must be under your name, capable
            of receiving electronic transfers.
          </li>
          <li>
            Our primary objective is to ensure the security of your funds and
            protect against fraudulent activities. Therefore, we can only accept
            funds originating from this designated account, and any received
            funds from alternative bank accounts will be declined and promptly
            returned to the original sender.
          </li>
          <li>
            Please proceed by entering the relevant details of your nominated
            account below.
          </li>
        </ul>
      </Box>
      <Box className="nominated-account">
        <Box className="title" sx={{ margin: "43px 0px 0px !important" }}>
          Account Details
        </Box>
        <Form onSubmit={handleSubmit} noValidate>
          <Box sx={{ direction: "flex", flexDirection: "column" }}>
            <FormGroup>
              <FormControl
                fullWidth
                variant="standard"
                required
                className={`otpInput ${errors.sortCode ? "inputErrorOTP" : ""}`}
              >
                <FormLabel
                  className={`label ${errors.sortCode && "inputError"}`}
                  sx={{ paddingBottom: 2 }}
                >
                  Sort Code
                </FormLabel>
                <SortCode
                  value={data.sortCode}
                  valueLength={3}
                  onChange={(el) =>
                    handleChange("sortCode", { target: { value: el } })
                  }
                />
                {errors.sortCode && (
                  <Typography className="error">{errors.sortCode}</Typography>
                )}{" "}
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormControl
                fullWidth
                variant="standard"
                required
                className={errors.accountNumber ? "error" : ""}
              >
                <FormLabel className="label">Account number</FormLabel>
                <Input
                  value={data.accountNumber}
                  disableUnderline
                  className="input"
                  name="accountNumber"
                  onChange={(el) => handleChange("accountNumber", el)}
                />
                {errors.accountNumber && (
                  <p className="msg">{errors.accountNumber}</p>
                )}{" "}
              </FormControl>
            </FormGroup>
            <Box
              className="checkbox"
              sx={{ flexDirection: "column", paddingTop: 1 }}
            >
              <FormGroup>
                <FormControl
                  className={
                    errors.accountHolderOfNominatedAccount ? "error" : ""
                  }
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={data.accountHolderOfNominatedAccount}
                      />
                    }
                    label="I am an account holder of the nominated account above"
                    onChange={() =>
                      handleChange("accountHolderOfNominatedAccount", {
                        target: {
                          value: !data.accountHolderOfNominatedAccount,
                        },
                      })
                    }
                  />
                  {errors.accountHolderOfNominatedAccount && (
                    <p className="msg">
                      {errors.accountHolderOfNominatedAccount}
                    </p>
                  )}
                </FormControl>
              </FormGroup>
            </Box>
          </Box>
          <Button type="submit" id="submitButton" sx={{ display: "none" }}>
            Submit
          </Button>
        </Form>
      </Box>
      <CommonNextButton handleSteps={(e: boolean) => handleClick(e)} />
    </Box>
  )
}
