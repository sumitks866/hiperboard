import { IProject } from "@/utils/types";
import React from "react";
import Activities from "./Activities";

interface IProps {
  project: IProject;
}

export default function ProjectSummary({ project }: IProps) {
  return (
    <div className="w-full overflow-hidden h-full bg-white">
      <div className="w-full py-6 px-4">
        <h1 className="text-[22px]">
          <span className="font-semibold mr-2">{project.code}</span>{" "}
          <span>{project?.name}</span>
        </h1>
      </div>
      <hr />
      <div className="w-full flex h-full">
        <div className="w-[50%] h-[calc(100%-82px)] overflow-y-auto py-4 px-6 text-[13px]">
          <ul className="w-full">
            <li className="w-full flex mb-8 items-center">
              <div className="w-[50%] font-semibold">Name</div>
              <div className="w-[50%]">{project.name}</div>
            </li>

            <li className="w-full flex mb-8 items-center">
              <div className="w-[50%] font-semibold">Description</div>
              <div className="w-[50%]">{project.code}</div>
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

            <li className="w-full flex mb-8 items-center">
              <div className="w-[50%] font-semibold">Issues</div>
              <div className="w-[50%]">{project?.manager || ""}</div>
            </li>

            <li className="w-full flex mb-8 items-center">
              <div className="w-[50%] font-semibold">Releases</div>
              <div className="w-[50%]">{project?.manager || ""}</div>
            </li>
          </ul>
        </div>
        <div className="w-[50%] h-[calc(100%-82px)] overflow-y-auto border-l">
          <Activities projectId={project.id} />
        </div>
      </div>
    </div>
  );
}
