import { Box, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { useAppDispatch } from "src/app/hooks"
import { selectStep } from "src/scenes/Savings/OnBoarding/store"
import timerIcon from "src/resources/images/sand-timer.svg"

export const SessionExpiry: React.FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(selectStep(-1))
  }, [dispatch])
  return (
    <Box id="session-expiry">
      <Typography className="title">Your Session Has Expired</Typography>
      <img src={timerIcon} alt="timer icon" />
      <Typography className="description">
        We've noticed you haven't updated your details for the last 10 minutes,
        so to make sure your information is safe, we've closed this application.
        To start a new application, please <a href="/">click here</a>.
      </Typography>
    </Box>
  )
}
