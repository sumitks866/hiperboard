"use client";
import { mockProjects } from "@/utils/mock";
import { NavigatorOptions } from "@/utils/types";
import React from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

const options: NavigatorOptions[] = [
  { name: "Backlogs", route: "backlogs", icon: "far fa-list-alt" },
  { name: "Active Sprint", route: "board", icon: "fas fa-running" },
  { name: "Reports", route: "reports", icon: "fas fa-chart-bar" },
  { name: "Releases", route: "releases", icon: "fas fa-rocket" },
  { name: "Issues", route: "issues", icon: "fas fa-bug" },
];
export default function BoardNavigator() {
  const params = useParams();
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const project = mockProjects[0];

  return (
    <div className="flex flex-col">
      <Link href={`/projects/${project?.code}`}>
        <button className="font-bold text-md whitespace-no-wrap overflow-hidden overflow-ellipsis py-6 pl-4">
          {project.name}
        </button>
      </Link>
      <ul className="px-2 pt-12">
        {options.map((option) => (
          <Link
            href={`/projects/${params?.projectCode}?view=${option.route}`}
            key={option.name}
          >
            <li
              className={`py-2 my-1 rounded-md px-2 text-sm hover:bg-gray-200 ${
                view === option.route ? "bg-gray-300 hover:bg-gray-300" : ""
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
