import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../interfaces";

export interface ProductState {
  product: Product | undefined;
}

const initialState: ProductState = {
  product: undefined,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productoActual(state, action: PayloadAction<Product>) {
      state.product = action.payload;
    },
    resetProduct(state) {
      state.product = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { productoActual, resetProduct } = productSlice.actions;

export default productSlice.reducer;
