/* eslint-disable @next/next/no-img-element */
"use client";
import { getWorkspaceDetailByPathname } from "@/api/company/getDetails";
import { AppDispatch, useAppSelector } from "@/lib/store/store";
import { setActiveCompany } from "@/lib/store/user/globalSlice";
import { NavigatorOptions } from "@/utils/types";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const options: NavigatorOptions[] = [
  { name: "Projects", route: "projects", icon: "far fa-folder" },
  { name: "Assigned to Me", route: "assigned-to-me", icon: "far fa-user" },
  { name: "Mentions", route: "mentions", icon: "fas fa-at" },
  { name: "Activities", route: "activities", icon: "far fa-chart-bar" },
  { name: "Starred", route: "starred", icon: "far fa-star" },
];

export default function WorkspaceNavigator() {
  const params = useParams();
  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "projects";

  const { activeCompany } = useAppSelector((state) => state.globalReducer);

  return (
    <div className="px-2 flex flex-col">
      <div className="font-bold px-4 flex items-center text-lg whitespace-no-wrap overflow-hidden overflow-ellipsis py-6">
        <span>{activeCompany?.name}</span>
      </div>
      <ul className="pt-8">
        {options.map((option) => (
          <Link
            href={`${params.workspacePathname}/?view=${option.route}`}
            key={option.name}
          >
            <li
              className={`py-2 my-1 rounded-md px-2 text-[13px] hover:bg-gray-200 ${
                view === option.route ? "bg-gray-300 hover:bg-gray-300 font-semibold" : ""
              }`}
            >
              <i className={`mr-2 ${option.icon}`}></i>
              {option.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
