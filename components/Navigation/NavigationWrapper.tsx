import React from "react";

interface IProps {
  children: React.ReactNode;
}

export default function NavigationWrapper({ children }: IProps) {
  return (
    <aside className="bg-[#F5F5F5] w-1/6 p-2 shadow-md border-r border-gray-300">
      {children}
    </aside>
  );
}
