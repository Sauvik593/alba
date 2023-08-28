import { RootState } from "src/app/store"

export const getActiveStep = (state: RootState) => state.onBoarding.activeStep

export const getSelectedProduct = (state: RootState) =>
  state.onBoarding.selectedProduct

export const getAlertDetails = (state: RootState) =>
  state.onBoarding.alertDetails

export const getDepositSuccess = (state: RootState) =>
  state.onBoarding.depositDetails && state.onBoarding.depositDetails.success
    ? state.onBoarding.depositDetails.success
    : false

export const getSessionToken = (state: RootState) =>
  state.onBoarding.session.sessionId ? state.onBoarding.session.sessionId : null

export const getDepositDetails = (state: RootState) =>
  state.onBoarding.depositDetails

export const getPersonalDetails = (state: RootState) => {
  return state.onBoarding.personalDetails
}

export const getAccountDetails = (state: RootState) =>
  state.onBoarding.accountDetails

export const getConsentDetails = (state: RootState) => {
  return state.onBoarding.consentDetails
}

export const getLookupAddresses = (state: RootState) => {
  return state.onBoarding.addressLookup
}

export const getPersonalDetailsSuccess = (state: RootState) =>
  state.onBoarding.personalDetails && state.onBoarding.personalDetails.success
    ? state.onBoarding.personalDetails.success
    : false

export const getSecurityVerficationSuccess = (state: RootState) =>
  state.onBoarding.personalDetails &&
  state.onBoarding.personalDetails.securityVerficationSuccess

export const getAddressFormDetails = (state: RootState) => {
  return state.onBoarding.addressFormDetails
}

export const getUserInfo = (state: RootState) => {
  return state.onBoarding.user
}

export const getAccountDetailsSuccess = (state: RootState) =>
  state.onBoarding.accountDetails && state.onBoarding.accountDetails.success
    ? state.onBoarding.accountDetails.success
    : false

export const getConsentDetailsSuccess = (state: RootState) =>
  state.onBoarding.consentDetails && state.onBoarding.consentDetails.success
    ? state.onBoarding.consentDetails.success
    : false
