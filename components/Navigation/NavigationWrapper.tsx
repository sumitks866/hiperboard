"use client";
import React from "react";
import BoardNavigator from "./BoardNavigator";
import UserNavigator from "./UserNavigator";
import { usePathname } from "next/navigation";

export default function NavigationWrapper() {
  const pathname = usePathname();
  const isProject =
    pathname.startsWith("/projects") || pathname.startsWith("/tasks");

  return (
    <aside className="bg-[#F5F5F5] w-1/6 p-2 shadow-md border-r border-gray-300">
      {(pathname == "/home" || pathname == "/user") && <UserNavigator />}
      {isProject && <BoardNavigator />}
    </aside>
  );
}
