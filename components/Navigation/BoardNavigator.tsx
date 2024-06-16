"use client";
import { NavigatorOptions } from "@/utils/types";
import React, { useEffect } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { AppDispatch, useAppSelector } from "@/lib/store/store";
import { useQuery } from "react-query";
import { getProjectByCode } from "@/api/project";
import { isUndefined } from "lodash";
import { setActiveProject } from "@/lib/store/projects/projectSlice";
import { useDispatch } from "react-redux";
import NameLogo from "../Logos/NameLogo";

const options: NavigatorOptions[] = [
  { name: "Issues", route: "issues", icon: "fas fa-bug" },
  { name: "Backlogs", route: "backlogs", icon: "far fa-list-alt" },
  { name: "Active Sprint", route: "board", icon: "fas fa-running" },
  { name: "Reports", route: "reports", icon: "fas fa-chart-bar" },
  { name: "Releases", route: "releases", icon: "fas fa-rocket" },
];
export default function BoardNavigator() {
  const params = useParams();
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const dispatch = useDispatch<AppDispatch>();
  const { activeProject } = useAppSelector((state) => state.projectReducer);
  const project = activeProject;

  const { data } = useQuery(["project-by-code", params.projectCode], () =>
    getProjectByCode(params.projectCode as string)
  );
  useEffect(() => {
    if (isUndefined(data)) return;
    dispatch(setActiveProject(data?.data));
  }, [data, data?.data, dispatch]);

  return (
    <div className="flex flex-col">
      <Link
        href={`/${params.workspacePathname}/projects/${project?.code}`}
        className="flex items-center px-2 pt-4"
      >
        <NameLogo name={project?.name!} height={40} width={40} />
        <button className="font-bold text-[24px] whitespace-no-wrap overflow-hidden overflow-ellipsis px-2">
          {project?.name}
        </button>
      </Link>
      <ul className="px-2 pt-8">
        {options.map((option) => (
          <Link
            href={`/${params.workspacePathname}/projects/${params?.projectCode}?view=${option.route}`}
            key={option.name}
          >
            <li
              className={`py-2 my-1 rounded-md px-2 text-[13px] hover:bg-gray-100 ${
                view === option.route
                  ? "bg-gray-200 hover:bg-gray-200 font-semibold"
                  : ""
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
