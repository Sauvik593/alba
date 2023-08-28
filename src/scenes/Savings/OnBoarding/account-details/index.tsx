import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "src/app/hooks"
import { useNavigate } from "react-router-dom"
import { selectStep } from "../store"
import { Box } from "@mui/material"
import "../Onboarding.scss"
import {
  acountDetailsErrorProps,
  acountDetailsErrorPropsNonUser,
} from "../components/errorMessage"
import { formValidate } from "../components/helpers/formValidation"
import { getAccountDetailsSuccess, getUserInfo } from "../store/selectors"
import {
  postAccountDetails,
  postPersonalDetailsWithSecurityAnswers,
} from "../store/index"
import { ValidateYourIdentity } from "./validateYourIdentity"
import { NominatedAccount } from "./nominatedAccount"

type intialValuesUserProp = {
  securityAnswer1: string
  securityAnswer0: string
}
type intialValuesNonUser = { sortCode: string; accountNumber: number }
export const AccountDetails: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const intialValuesUser = { securityAnswer1: "", securityAnswer0: "" }
  const intialValuesNonUser = { sortCode: "", accountNumber: "" }
  const [formValues, setFormValues] = useState<
    intialValuesUserProp | intialValuesNonUser
  >(intialValuesUser)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const userInfo = useAppSelector(getUserInfo)
  const [isExistingUser, setIsExistingUser] = useState(
    userInfo.canBeDuplicateCustomer,
  )
  const [navigationStatus, setNavigationStatus] = useState(false)
  const accountDetailsSuccess = useAppSelector(getAccountDetailsSuccess)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  useEffect(() => {
    dispatch(selectStep(2))
  }, [dispatch])

  useEffect(() => {
    setIsExistingUser(userInfo.canBeDuplicateCustomer)
  }, [userInfo])

  useEffect(() => {
    //dispatch(selectStep(e ? 2 : 0));
    //navigate(e ? "../account-details" : "/savings/deposit-details")
    if (accountDetailsSuccess && isSubmit) {
      dispatch(selectStep(3))
      navigate("/savings/consent")
    }
  }, [accountDetailsSuccess])

  useEffect(() => {
    setFormValues(isExistingUser ? intialValuesUser : intialValuesNonUser)
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // nevigateToNext(navigationStatus)
    }
  }, [formErrors])

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    validateForm()
    setIsSubmit(true)
  }
  const validateForm = () => {
    setFormErrors(
      formValidate(
        formValues,
        isExistingUser
          ? acountDetailsErrorProps
          : acountDetailsErrorPropsNonUser,
      ),
    )
  }

  const nevigateToNext = (e: boolean) => {
    // console.log(e)
    // dispatch(selectStep(e ? 3 : 1))
    // navigate(e ? "../consent" : "../personal-details")
    if (e) {
      if (isExistingUser && userInfo.canBeDuplicateCustomer) {
        let params = {
          securityAnswers: [],
        }
        userInfo.authenticationQuestions.map((each, index) => {
          params.securityAnswers.push({
            questionKey: each.securityQuestionKey,
            answer: formValues[`securityAnswer${index}`],
          })
        })
        dispatch(
          postPersonalDetailsWithSecurityAnswers({
            ...params,
            flowState: "authenticate",
          }),
        )
      }
    } else {
      dispatch(selectStep(1))
      navigate("../personal-details")
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: ["column"],
        justifyContent: "flex-start",
        width: "100%",
      }}
      className="nominated-account"
    >
      {userInfo.canBeDuplicateCustomer ? (
        <ValidateYourIdentity userInfo={userInfo} />
      ) : (
        <NominatedAccount
          setNavigationStatus={(
            e: boolean | ((prevState: boolean) => boolean),
          ) => setNavigationStatus(e)}
        />
      )}
    </Box>
  )
}
