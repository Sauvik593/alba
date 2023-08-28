import axios from "axios"
import { API_URIS, API_URL } from "src/resources/constants"

export const getDepositProducts = () => {
  return axios.get(`${API_URL}${API_URIS.DEPOSIT_PRODUCTS}`)
}
