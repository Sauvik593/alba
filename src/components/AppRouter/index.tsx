import * as React from "react"
import { useAppDispatch, useAppSelector } from "src/app/hooks"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from "src/scenes"
import { FixedDeposit } from "src/scenes/Savings/FixedDeposit/index"
import { fetchAsync } from "src/scenes/Savings/FixedDeposit/store/index"
import {
  DepositDetails,
  PersonalDetails,
  AccountDetails,
  Consent,
  YourApplication,
} from "src/scenes/Savings/OnBoarding"
import { Savings } from "src/scenes/Savings"
import { SessionExpiry } from "../SessionExpiry"
import { RequireSession } from "./authenticateSession"

export const AppRouter: React.FC = () => {
  const dispatch = useAppDispatch()
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      index: true,
    },
    {
      path: "savings/fixed-deposit",
      element: <FixedDeposit />,
      loader: async () => {
        dispatch(fetchAsync())
        return true
      },
    },
    {
      path: "savings",
      element: <Savings />,
      children: [
        {
          path: "deposit-details",
          index: true,
          element: <DepositDetails />,
        },
        {
          path: "personal-details",
          element: (
            <RequireSession>
              <PersonalDetails />
            </RequireSession>
          ),
        },
        {
          path: "account-details",
          element: (
            <RequireSession>
              <AccountDetails />
            </RequireSession>
          ),
        },
        {
          path: "consent",
          element: (
            <RequireSession>
              <Consent />
            </RequireSession>
          ),
        },
        {
          path: "your-application",
          element: (
            <RequireSession>
              <YourApplication />
            </RequireSession>
          ),
        },
        {
          path: "session-expired",
          element: <SessionExpiry />,
        },
      ],
    },
  ])
  return <RouterProvider router={router} />
}
