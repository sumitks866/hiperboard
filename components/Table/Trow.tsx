import React from "react";

interface IProps {
  children: React.ReactNode;
}

export default function Trow({ children }: IProps) {
  return <tr className="border-y">{children}</tr>;
}
