import { combineReducers } from "@reduxjs/toolkit"
import onBoardingSlice from "../scenes/Savings/OnBoarding/store/index"
import depositProductSlice from "../scenes/Savings/FixedDeposit/store"

export const appReducers = combineReducers({
  onBoarding: onBoardingSlice,
  depositProducts: depositProductSlice,
})
