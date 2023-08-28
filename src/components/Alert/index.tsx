import * as React from "react"
import { Alert, Box, Grow, Stack } from "@mui/material"
import { useAppSelector } from "src/app/hooks"
import { getAlertDetails } from "src/scenes/Savings/OnBoarding/store/selectors"

export default function AlertComponent() {
  const alertDetails = useAppSelector(getAlertDetails)
  const [timeOut, setTimeOut] = React.useState(alertDetails.isAlertShow)

  React.useEffect(() => {
    setTimeOut(alertDetails.isAlertShow)
  }, [alertDetails])

  setTimeout(() => {
    setTimeOut(false)
  }, 10000)

  return timeOut ? (
    <Grow
      style={{ transformOrigin: "0 0 0" }}
      {...(true ? { timeout: 1000 } : {})}
      in={true}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          right: 0,
          zIndex: 100,
        }}
      >
        <Stack sx={{ width: "100%", padding: 1 }} spacing={1}>
          <Alert
            variant={alertDetails.variants}
            severity={alertDetails.severitys}
            color={alertDetails.severitys}
            onClose={() => setTimeOut(false)}
          >
            {alertDetails.message}
          </Alert>
        </Stack>
      </Box>
    </Grow>
  ) : null
}
