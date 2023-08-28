import React, { useEffect } from "react"
import { Box } from "@mui/material"
import { useAppDispatch } from "src/app/hooks"
import { selectStep } from "../OnBoarding/store"

export const YourApplication: React.FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(selectStep(4))
  }, [dispatch])

  return (
    <Box id="your-application">
      <Box className="title">
        Thank you for applying for a Alba Bank savings account
      </Box>
      <ul>
        <li>
          In order to complete your application, we need you to send some
          additional documentation to verify your identity and address. This is
          to prevent the fraudulent use of your identity by someone else and to
          comply with money laundering regulations.
        </li>
        <li>
          Please can you send a scanned copy or electronic photo of your
          passport and your UK photocard driving licence to{" "}
          <a href="mailto:savings@albabank.co.uk">savings@albabank.co.uk</a>.
          The name and address shown on your documents must match exactly with
          those stated in your application. Unfortunately, we are not able to
          accept any other forms of identification at this time.
        </li>
        <li>
          Upon receipt of the required documents and your identity being
          verified, our Savings team will open your account and write to you
          confirming your account number and provide you with details of how to
          make a deposit from your nominated account.
        </li>
        <li>
          Documents must be received within 14 days of your application to
          ensure you receive the interest rate you applied for.
        </li>
        <li>
          If you have any questions, please call us on{" "}
          <a href="tel:03300940162"> 0330 094 0162</a> or email us at{" "}
          <a href="mailto:savings@albabank.co.uk">savings@albabank.co.uk</a> .
          Please note that our operating hours are Monday to Friday 8am to 6pm,
          excluding Bank Holidays.
        </li>
      </ul>
    </Box>
  )
}
