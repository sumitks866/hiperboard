import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projects/projectSlice";
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: { projectReducer, authReducer, userReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
