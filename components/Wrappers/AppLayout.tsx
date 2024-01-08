import React, { ReactNode } from "react";
import Header from "../Headers/Header";
import NavigationWrapper from "../Navigation/NavigationWrapper";

interface IProps {
  children: ReactNode;
}

export default function AppLayout({ children }: IProps) {
  return (
    <div className="flex h-screen pt-16">
      <Header />
      <NavigationWrapper />
      <main className="flex flex-1 overflow-y-auto">
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
}
