import * as React from "react"
import Box from "@mui/material/Box"
import { Outlet } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { getActiveStep, getUserInfo } from "./OnBoarding/store/selectors"
import { useEffect, useState } from "react"
import {
  Button,
  Dialog,
  Step,
  StepConnector,
  StepIconProps,
  StepLabel,
  Stepper,
  Typography,
  stepConnectorClasses,
  styled,
} from "@mui/material"
import mailIcon from "src/resources/images/mail.svg"
import customerCareIcon from "src/resources/images/customer-care.svg"
import errorIcon from "src/resources/images/oops-error.svg"

const steps = [
  "Start",
  "Personal Details",
  "Nominated Account",
  "Summary",
  "Your Application",
]
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 7.5,
    left: "calc(-50% + 5px)",
    right: "calc(50% + 5px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#211D33",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#211D33",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#00E2D6",
    borderTopWidth: 2,
    borderRadius: 1,
  },
}))
const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#00E2D6",
    display: "flex",
    height: 16,

    alignItems: "center",
    ...(ownerState.active && {
      color: "#00E2D6",
      border: "2px solid #221C35",
      height: 16,
      zIndex: 1,
      borderRadius: "50%",
    }),
    "& .QontoStepIcon-circle": {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: "currentColor",
    },
    "& .completed": {
      backgroundColor: "#221C35",
      borderRadius: "50%",
    },
  }),
)

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      <div className={`QontoStepIcon-circle ${completed ? "completed" : ""}`} />
    </QontoStepIconRoot>
  )
}

export const Savings = function () {
  const currentStep = useAppSelector(getActiveStep)
  const [openDialog, setOpenDialog] = useState(false)
  const userInfo = useAppSelector(getUserInfo)
  const [isExistingUser, setIsExistingUser] = useState(
    userInfo.canBeDuplicateCustomer,
  )
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentStep])

  useEffect(() => {
    setIsExistingUser(userInfo.canBeDuplicateCustomer)
  }, [userInfo])

  return (
    <Box id="savings">
      <Box
        className="container"
        sx={{
          padding: 0,
          paddingBottom: "30px",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            fontFamily: "Merriweather",
            fontSize: "28px",
            lineHeight: "35px",
            fontWeight: 700,
            marginTop: "32px",
            marginBottom: "22px",
          }}
        >
          Savings online Application
        </Box>
        <Box sx={{ textAlign: "center", fontFamily: "Work Sans" }}>
          <Stepper
            activeStep={currentStep}
            className={currentStep === -1 ? "expired" : ""}
            alternativeLabel
            connector={<QontoConnector />}
          >
            {steps.map((label: any, index) => (
              <Step key={index}>
                <StepLabel StepIconComponent={QontoStepIcon}>
                  {index + 1}. {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Box>
      <Box className="savings-content">
        <Box sx={{ padding: "0", background: "#fff" }} className="container">
          <Box className="application-header">
            {currentStep < 0 ? (
              <Typography>Session timeout</Typography>
            ) : (
              <Typography>
                {currentStep + 1}.
                {isExistingUser && currentStep === 2
                  ? "Validate Your Identity"
                  : steps[currentStep]}
                {currentStep === 0 ? " Your Application" : ""}
              </Typography>
            )}
            <Box className="icons">
              <img src={customerCareIcon} alt="Customer Care " />
              <img src={mailIcon} alt="mail" />
            </Box>
          </Box>
          <Box className="savings-details">
            <Outlet />
          </Box>
        </Box>
      </Box>
      {/* <Button variant="outlined" onClick={() => setOpenDialog(true)}>
        Open Error dialog
      </Button> */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <Box className="error-dialog">
          <img src={errorIcon} />
          <Typography className="oops">Oops!</Typography>
          <Typography>Something went wrong</Typography>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </Box>
      </Dialog>
    </Box>
  )
}
