import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    AddToCart: (state, action) => {
      const { products } = state;
      products.push(action.payload);
    },
  },
});

export default CartSlice.reducer;
export const { AddToCart } = CartSlice.actions;
