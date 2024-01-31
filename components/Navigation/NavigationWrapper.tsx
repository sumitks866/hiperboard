import React from "react";

interface IProps {
  children: React.ReactNode;
}

export default function NavigationWrapper({ children }: IProps) {
  return (
    <aside className="bg-gray-50 w-[15%] p-2 shadow-md">
      {children}
    </aside>
  );
}
