import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function Table({ children }: IProps) {
  return <table className="w-full">{children}</table>;
}
