import { appResponse } from "src/app/types"

export interface DepositProductsState {
  products: any
  status: "idle" | "loading" | "failed"
  selectedProduct: string | null
}

export interface FixedDepositProduct {
  key: string
  value: string
}

export interface GetProductsResponse extends appResponse {
  data: any
}
