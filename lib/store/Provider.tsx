"use client";
import { ReactNode } from "react";
import { store } from "./store";
import { Provider } from "react-redux";

interface IAppStoreProvider {
  children: ReactNode;
}

export function AppStoreProvider({ children }: IAppStoreProvider) {
  return <Provider store={store}>{children}</Provider>;
}
