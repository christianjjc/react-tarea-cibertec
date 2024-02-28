import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../interfaces";
import { ProductService } from "../../services";

export interface ProductState {
  product: Product | undefined;
}

const initialState: ProductState = {
  product: undefined,
};

export const getProducts = createAsyncThunk("products/getProducts", async () => {
  const response = await ProductService.getProducts();
  return response;
});

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
    getProducts(state) {},
  },
});

// Action creators are generated for each case reducer function
export const { productoActual, resetProduct } = productSlice.actions;

export default productSlice.reducer;
