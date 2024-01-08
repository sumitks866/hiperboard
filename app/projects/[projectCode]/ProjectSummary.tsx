import { UserDetails } from "@/app/tasks/[taskCode]/TaskDetails";
import { mockProjects } from "@/utils/mock";
import { IProject } from "@/utils/types";
import { isUndefined } from "lodash";
import React from "react";

interface IProps {
  projectCode: string;
}

const getProject = (projectCode: string): IProject | undefined => {
  return mockProjects.find((p) => p.code === projectCode);
};

export default function ProjectSummary({ projectCode }: IProps) {
  const project = getProject(projectCode);

  if (isUndefined(project)) return <div>Cannot find Project</div>;

  return (
    <div className="w-full overflow-hidden h-full bg-white">
      {" "}
      <div className="w-full py-6 px-4">
        <h1 className="text-[22px]">
          <span className="font-semibold mr-2">{projectCode}</span>{" "}
          <span>{project?.name}</span>
        </h1>
      </div>
      <hr />
      <div className="w-full flex h-full">
        <div className="w-[30%] h-[calc(100%-82px)] overflow-y-auto py-4 px-6 text-[13px]">
          <ul className="w-full">
            <li className="w-full flex mb-8 items-center">
              <div className="w-[50%] font-semibold">Name</div>
              <div className="w-[50%]">{project.name}</div>
            </li>

            <li className="w-full flex mb-8 items-center">
              <div className="w-[50%] font-semibold">Code</div>
              <div className="w-[50%]">{project.code}</div>
            </li>

            <li className="w-full flex mb-8 items-center">
              <div className="w-[50%] font-semibold">Project Lead</div>
              <div className="w-[50%]">{project.manager}</div>
            </li>

            <li className="w-full flex mb-8 items-center">
              <div className="w-[50%] font-semibold">Active Contributers</div>
              <div className="w-[50%]">{project?.manager || ""}</div>
            </li>
          </ul>
        </div>
        <div className="w-[70%] h-[calc(100%-82px)] overflow-y-auto py-4 px-6 border-l"></div>
      </div>
    </div>
  );
}
