import React from "react";

interface IProps {
  children: React.ReactNode;
}

export default function Tbody({ children }: IProps) {
  return <tbody>{children}</tbody>;
}
