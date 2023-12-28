import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/authSlice";
import { alertSlice } from "./features/alertSlice";

export default configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    auth: authSlice.reducer,
  },
}); 