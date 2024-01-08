import React, { ReactNode } from "react";

export interface ITabProps {
  children: ReactNode;
  title: string;
  tabKey: string | number;
}
export default function Tab({ children, title, tabKey }: ITabProps) {
  return <div>{title}</div>;
}
