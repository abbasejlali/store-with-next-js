import { configureStore } from "@reduxjs/toolkit";

// Reducers
import CartReducer from "./features/CartSlice";

const store = configureStore({
  reducer: {
    cartHandeler: CartReducer,
  },
});

export default store;
