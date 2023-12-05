import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    AddToCart: (state, action) => {
      state.products = action;
    },
  },
});

export default CartSlice.reducer;
export const { AddToCart } = CartSlice.actions;
