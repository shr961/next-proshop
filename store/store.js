import { configureStore } from "@reduxjs/toolkit";

import { api } from "./api";
import userSlice from "./user-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,

    user: userSlice.reducer,
    cart: cartSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(api.middleware),
});

export default store;
