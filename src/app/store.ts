import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import menuReducer from "../features/menu/menuSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
