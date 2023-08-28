import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  AccountDetailsState,
  ConsentDetailsState,
  DepositDetailsState,
  OnBoardingState,
  PersonalDetailsState,
  alertProps,
} from "./types"
import {
  callAccountDetails,
  callPersonalDetails,
  initiateSession,
  submitApplication,
  submitAddressLookup,
} from "./API"
import { incrementAsync } from "../../../../features/counter/counterSlice"

const initialState: OnBoardingState = {
  activeStep: 0,
  status: "idle",
  selectedProduct: null,
  depositDetails: {
    depositProduct: 0,
    agreementConfirmation: false,
    intendedDepositAmount: 0,
    applicantsUKResidenceConfirmation: false,
    privacyNotice: false,
    success: false,
  },
  personalDetails: {
    flowState: "initial_post",
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    nationality: "",
    employmentStatus: "",
    phoneNumber: "",
    email: "",
    securityQuestion1: "",
    securityAnswer1: "",
    securityQuestion2: "",
    securityAnswer2: "",
    addresses: [],
    success: false,
    securityVerficationSuccess: false,
  },
  addressFormDetails: [],
  accountDetails: {
    sortCode: "",
    accountNumber: "",
    success: false,
    accountHolderOfNominatedAccount: false,
  },
  consentDetails: {
    contactByPhone: false,
    contactByEmail: false,
    contactByPost: false,
    productConfirmation: false,
    tncConfirmation: false,
    fscsConfirmation: false,
    saveDetailsConfirmation: false,
    success: false,
  },
  session: {},
  addressLookup: [],
  user: {},
  error: undefined,
  alertDetails: {
    variants: "standard",
    severitys: "success",
    message: "Welcome to ALBA Bank",
    isAlertShow: false,
  },
}

const responseHandler = (res: any, rejectWithValue?: any) => {
  let resJson = {}
  try {
    resJson = res.data.data
  } catch (e) {
    return e
  }
  if (resJson) return resJson
  else return rejectWithValue(res.data.message)
}

export const postDepositDetails = createAsyncThunk(
  "onBoarding/postDepositDetails",
  async (params: DepositDetailsState, { dispatch }) => {
    const res = await initiateSession(params)
    dispatch(saveDepositDetails(params))
    if (res.data.code !== 0) {
      dispatch(
        updateAlertDetails({
          variants: "filled",
          severitys: "error",
          message: res.data.message,
          isAlertShow: true,
        }),
      )
    }
    return responseHandler(res)
  },
)

export const postPersonalDetails = createAsyncThunk<
  string,
  any,
  { rejectValue: string }
>(
  "onBoarding/postPersonalDetails",
  async (
    params: PersonalDetailsState,
    { dispatch, getState, rejectWithValue },
  ) => {
    const state = getState()
    const sessionId = state.onBoarding.session.sessionId
    dispatch(savePersonalDetails(params))
    const res = await callPersonalDetails(params, sessionId)
    if (res.data.code !== 0) {
      dispatch(
        updateAlertDetails({
          variants: "filled",
          severitys: "error",
          message: res.data.message,
          isAlertShow: true,
        }),
      )
    }
    return responseHandler(res, rejectWithValue)
  },
)

export const postPersonalDetailsWithSecurityAnswers = createAsyncThunk(
  "onBoarding/postPersonalDetails",
  async (params, { dispatch, getState }) => {
    const state = getState()
    const personalDetails = state.onBoarding.personalDetails
    const sessionId = state.onBoarding.session.sessionId
    const combinedParams = { ...personalDetails, ...params }
    const res = await callPersonalDetails(combinedParams, sessionId)
    if (res.data.code !== 0) {
      dispatch(
        updateAlertDetails({
          variants: "filled",
          severitys: "error",
          message: res.data.message,
          isAlertShow: true,
        }),
      )
    }
    return responseHandler(res)
  },
)

export const postAccountDetails = createAsyncThunk(
  "onBoarding/postAccountDetails",
  async (params, { dispatch, getState }) => {
    const state = getState()
    const sessionId = state.onBoarding.session.sessionId
    dispatch(saveAccountDetails(params))
    const res = await callAccountDetails(params, sessionId)
    if (res.data.code !== 0) {
      dispatch(
        updateAlertDetails({
          variants: "filled",
          severitys: "error",
          message: res.data.message,
          isAlertShow: true,
        }),
      )
    }
    return responseHandler(res)
  },
)

export const postApplication = createAsyncThunk(
  "onBoarding/postApplication",
  async (params: ConsentDetailsState, { dispatch, getState }) => {
    const state = getState()
    const sessionId = state.onBoarding.session.sessionId
    const res = await submitApplication(params, sessionId)
    if (res.data.code !== 0) {
      dispatch(
        updateAlertDetails({
          variants: "filled",
          severitys: "error",
          message: res.data.message,
          isAlertShow: true,
        }),
      )
    }
    return responseHandler(res)
  },
)

export const getAddressLookup = createAsyncThunk(
  "onBoarding/getAddressLookup",
  async (postcode: string, { dispatch, getState }) => {
    const state = getState()
    const sessionId = state.onBoarding.session.sessionId
    const res = await submitAddressLookup(postcode, sessionId)
    if (res.data.code !== 0) {
      dispatch(
        updateAlertDetails({
          variants: "filled",
          severitys: "error",
          message: res.data.message,
          isAlertShow: true,
        }),
      )
    }
    if (res.data.code === 0 && res.data.data.length === 0) {
      dispatch(
        updateAlertDetails({
          variants: "filled",
          severitys: "warning",
          message: "No Record found",
          isAlertShow: true,
        }),
      )
    }
    return responseHandler(res)
  },
)

export const onBoardingSlice = createSlice({
  name: "onBoarding",
  initialState,
  reducers: {
    selectStep: (state: OnBoardingState, action: PayloadAction<number>) => {
      state.activeStep = action.payload
    },
    selectProduct: (state: OnBoardingState, action: PayloadAction<string>) => {
      state.selectedProduct = action.payload
    },
    saveDepositDetails: (
      state: OnBoardingState,
      action: PayloadAction<DepositDetailsState>,
    ) => {
      state.depositDetails = action.payload
    },
    updateAlertDetails: (
      state: OnBoardingState,
      action: PayloadAction<alertProps>,
    ) => {
      console.log(action.payload, action.payload)
      state.alertDetails = action.payload
    },
    savePersonalDetails: (
      state: OnBoardingState,
      action: PayloadAction<PersonalDetailsState>,
    ) => {
      state.personalDetails = action.payload
    },
    saveAddressFormDetails: (
      state: OnBoardingState,
      action: PayloadAction<string>,
    ) => {
      state.addressFormDetails = action.payload
    },
    saveAccountDetails: (
      state: OnBoardingState,
      action: PayloadAction<AccountDetailsState>,
    ) => {
      state.accountDetails = action.payload
      state.accountDetails.success = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postDepositDetails.pending, (state) => {
        state.status = "loading"
      })
      .addCase(postDepositDetails.fulfilled, (state, action) => {
        state.status = "idle"
        state.session.sessionId = action.payload.sessionId
        state.depositDetails.success = true
      })
      .addCase(postDepositDetails.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(getAddressLookup.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getAddressLookup.fulfilled, (state, action) => {
        state.status = "idle"
        state.addressLookup = action.payload
      })
      .addCase(getAddressLookup.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(postPersonalDetails.pending, (state) => {
        state.status = "loading"
      })
      .addCase(postPersonalDetails.fulfilled, (state, action) => {
        state.status = "idle"
        if (state.personalDetails.flowState === "authenticate")
          state.personalDetails.securityVerficationSuccess = true
        else state.personalDetails.success = true
        state.user = action.payload
        if (action.payload.canBeDuplicateCustomer) {
          state.personalDetails.flowState = "authenticate"
        }
      })
      .addCase(postPersonalDetails.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
      .addCase(postAccountDetails.pending, (state) => {
        state.status = "loading"
      })
      .addCase(postAccountDetails.fulfilled, (state, action) => {
        state.status = "idle"
        state.accountDetails.success = true
      })
      .addCase(postAccountDetails.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(postApplication.pending, (state) => {
        state.status = "loading"
      })
      .addCase(postApplication.fulfilled, (state, action) => {
        state.status = "idle"
        state.consentDetails.success = true
      })
      .addCase(postApplication.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const {
  selectStep,
  selectProduct,
  savePersonalDetails,
  updateAlertDetails,
  saveDepositDetails,
  saveAccountDetails,
  saveAddressFormDetails,
} = onBoardingSlice.actions

export default onBoardingSlice.reducer
