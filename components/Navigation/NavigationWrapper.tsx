import React from "react";

interface IProps {
  children: React.ReactNode;
}

export default function NavigationWrapper({ children }: IProps) {
  return (
    <aside className="bg-white w-[15%] p-2 shadow-md border-r-2 border-gray-300">
      {children}
    </aside>
  );
}
