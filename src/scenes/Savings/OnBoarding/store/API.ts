import axios from "axios"
import { API_URIS, API_URL } from "src/resources/constants"

export const initiateSession = (params: any) => {
  params.applicantsUKResidenceConfirmation =
    params.applicantsUKResidenceConfirmation === "yes"
  return axios.post(`${API_URL}${API_URIS.INIT_SESSION}`, params)
}

export const callPersonalDetails = (params: any, sessionToken: string) => {
  return axios.post(`${API_URL}${API_URIS.PERSONAL_DETAILS}`, params, {
    headers: { "session-id": sessionToken },
  })
}

export const callAccountDetails = (params: any, sessionToken: string) => {
  return axios.post(`${API_URL}${API_URIS.ACCOUNT_DETAILS}`, params, {
    headers: { "session-id": sessionToken },
  })
}

export const submitApplication = (params: any, sessionToken: string) => {
  return axios.post(`${API_URL}${API_URIS.SUBMIT_APPLICATION}`, params, {
    headers: { "session-id": sessionToken },
  })
}

export const submitAddressLookup = (postcode: string, sessionToken: string) => {
  const config = {
    method: "get",
    url: `${API_URL}${API_URIS.ADDRESS_LOOKUP}${postcode}`,
    headers: {
      "session-id": sessionToken,
    },
  }

  return axios(config)
}
