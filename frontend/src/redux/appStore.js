import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productsReducer from "./productsSlice";

export const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});
