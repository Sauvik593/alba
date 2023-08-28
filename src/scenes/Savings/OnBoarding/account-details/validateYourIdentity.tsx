import {
  Box,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  Input,
  Typography,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { Form, useNavigate } from "react-router-dom"
import { CommonNextButton } from "../components/common-next-button"
import { useAppDispatch, useAppSelector } from "src/app/hooks"
import { securityQuestionsList } from "src/resources/form/data/staticList"
import { postPersonalDetailsWithSecurityAnswers, selectStep } from "../store"
import { useForm } from "../components/helpers"
import {
  getPersonalDetails,
  getSecurityVerficationSuccess,
} from "../store/selectors"

type ValidateYourIdentityProps = {
  userInfo: any
}
export const ValidateYourIdentity = ({
  userInfo,
}: ValidateYourIdentityProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const personalDetails = useAppSelector(getPersonalDetails)

  const securityVerficationSuccess = useAppSelector(
    getSecurityVerficationSuccess,
  )
  const { handleSubmit, handleChange, data, errors } = useForm({
    validations: {
      securityAnswer1: {
        required: {
          value: true,
          message: "This field is required",
        },
      },
      securityAnswer2: {
        required: {
          value: true,
          message: "This field is required",
        },
      },
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
    },
    onSubmit: () => handleSubmitClick(),
    initialValues: {
      securityAnswer1: "",
      securityAnswer2: "",
      accountNumber: "",
    },
  })

  useEffect(() => {
    if (securityVerficationSuccess) {
      navigate("/savings/consent")
    }
  }, [securityVerficationSuccess])

  const handleSubmitClick = () => {
    let params = {
      securityAnswers: [],
    }
    userInfo.authenticationQuestions.map((each, index) => {
      params.securityAnswers.push({
        questionKey: each.securityQuestionKey,
        answer: data[`securityAnswer${index + 1}`],
      })
    })
    dispatch(
      postPersonalDetailsWithSecurityAnswers({
        ...params,
        accountNumber: data.accountNumber,
        flowState: "authenticate",
      }),
    )
  }
  const handleClick = (e: boolean) => {
    if (e) {
      handleSubmit()
    } else {
      dispatch(selectStep(1))
      navigate("../personal-details")
    }
  }
  const [securityQuestionsArray, setSecurityQuestionsArray] = useState<any>([])
  useEffect(() => {
    let tmpArrayList: any = []
    userInfo.authenticationQuestions.forEach((info: any) => {
      securityQuestionsList.forEach((securityQuestion) => {
        if (info.key === securityQuestion.key) {
          tmpArrayList.push(securityQuestion.name)
        }
      })
    })
    setSecurityQuestionsArray([...tmpArrayList])
  }, [securityQuestionsArray, userInfo])
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography className="title">
        Hello {personalDetails.firstName} {personalDetails.middleName}{" "}
        {personalDetails.lastName}
      </Typography>
      <Typography
        variant="inherit"
        sx={{
          fontStyle: "normal",
          fontWeight: 300,
          fontSize: 24,
        }}
      >
        It appears you may already have an account with us, if so please provide
        the answer to your Alba Bank security questions and your nominated
        account number.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Form onSubmit={handleSubmit} noValidate>
          {userInfo.authenticationQuestions.map(
            (eachQuestion: any, index: any) => (
              <Box key={index}>
                <Grid item xs={6} sm={4}>
                  <FormGroup>
                    <FormControl
                      fullWidth
                      variant="standard"
                      required
                      className={
                        errors[`securityAnswer${index + 1}`] && "inputError"
                      }
                    >
                      <FormLabel className="label">
                        {eachQuestion.securityQuestionDisplay}
                      </FormLabel>
                      <Input
                        value={data[`securityAnswer${index + 1}`]}
                        disableUnderline
                        name={`securityAnswer${index + 1}`}
                        className="input"
                        onChange={(el) =>
                          handleChange(`securityAnswer${index + 1}`, el)
                        }
                      />
                    </FormControl>
                    {Object.keys(errors).length !== 0 &&
                      errors[`securityAnswer${index + 1}`] && (
                        <Typography className="error">
                          {errors[`securityAnswer${index + 1}`]}
                        </Typography>
                      )}
                  </FormGroup>
                </Grid>
              </Box>
            ),
          )}
          <Grid item xs={6} sm={4}>
            <FormGroup>
              <FormControl
                fullWidth
                variant="standard"
                required
                className={errors[`accountNumber`] && "inputError"}
              >
                <FormLabel className="label">
                  Your nominated bank account number
                </FormLabel>
                <Input
                  value={data.accountNumber}
                  disableUnderline
                  name="accountNumber"
                  className="input"
                  onChange={(el) => handleChange("accountNumber", el)}
                />
              </FormControl>
              {Object.keys(errors).length !== 0 && errors[`accountNumber`] && (
                <Typography className="error">
                  {errors[`accountNumber`]}
                </Typography>
              )}
            </FormGroup>
          </Grid>
          <Button type="submit" id="submitButton" sx={{ display: "none" }}>
            Submit
          </Button>
        </Form>
      </Box>
      <CommonNextButton handleSteps={(e: boolean) => handleClick(e)} />
    </Box>
  )
}
