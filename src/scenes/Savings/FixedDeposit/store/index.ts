import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DepositProductsState } from "./types"
import { getDepositProducts } from "./API"
import {incrementAsync} from "../../../../features/counter/counterSlice";
import {postDepositDetails} from "../../OnBoarding/store/index";

const initialState: DepositProductsState = {
  products: {},
  status: "idle",
  selectedProduct: null,
}

export const fetchAsync = createAsyncThunk(
  "fixedDeposit/getProducts",
  async () => {
    const res = await getDepositProducts()
    let resJson = {}
    try {
      resJson = res.data.data.productTypes
    } catch (e) {
      return e
    }

    return resJson
  },
)

export const depositProductSlice = createSlice({
  name: "depositProducts",
  initialState,
  reducers: {
    selectProduct: (
      state: DepositProductsState,
      action: PayloadAction<string>,
    ) => {
      state.selectedProduct = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchAsync.pending, (state) => {
      state.status = "loading"
    })
    .addCase(fetchAsync.fulfilled, (state, action) => {
      state.status = "idle"
      state.products = action.payload
    })
    .addCase(fetchAsync.rejected, (state) => {
      state.status = "failed"
    })
  },
})

export const { selectProduct } = depositProductSlice.actions

export default depositProductSlice.reducer
