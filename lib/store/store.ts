import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projects/projectSlice";
import authReducer from "./auth/authSlice";
import globalReducer from "./user/globalSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: { projectReducer, authReducer, globalReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
