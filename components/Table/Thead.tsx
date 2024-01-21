import React from "react";

interface IProps {
  children: React.ReactNode;
}

export default function Thead({ children }: IProps) {
  return <thead className="font-semibold">{children}</thead>;
}
