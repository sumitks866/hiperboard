import React from "react";

interface IProps {
  children: React.ReactNode;
}

export default function Tdata({ children }: IProps) {
  return <td className="py-3">{children}</td>;
}
