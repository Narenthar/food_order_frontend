// import files
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";

// configureStore
export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
