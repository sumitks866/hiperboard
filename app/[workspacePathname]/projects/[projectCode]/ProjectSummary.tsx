import { IProject, IProjectSummary } from "@/utils/types";
import React, { useState } from "react";
import Activities from "./Activities";
import TextEditor from "@/components/Input/TextEditor";
import { updateProject } from "@/api/project";
import { UserDetails } from "@/components/User/UserDetails";
import Link from "next/link";

interface IProps {
  project: IProjectSummary;
}

export default function ProjectSummary({ project }: IProps) {
  const [localProjectDetails, setLocalProjectDetails] =
    useState<IProjectSummary>(project);

  const onUpdate = async (p: Partial<IProject>) => {
    try {
      await updateProject(project.id, p);
      setLocalProjectDetails((prev) => ({ ...prev, ...p }));
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <div className="w-full overflow-hidden h-full bg-white cursor-default">
      <div className="w-full py-6 px-4">
        <h1 className="text-[22px]">
          <span className="font-semibold mr-2">{localProjectDetails.code}</span>{" "}
          <span>{localProjectDetails.name}</span>
        </h1>
      </div>
      <hr />
      <div className="w-full flex h-full">
        <div className="w-[50%] h-[calc(100%-82px)] overflow-y-auto py-4 px-6 text-[13px]">
          <ul className="w-full">
            <li className="w-full flex mb-8 items-center">
              <div className="w-[30%] font-semibold">Name</div>
              <div className="w-[70%]">{localProjectDetails.name}</div>
            </li>

            <li className="w-full flex mb-8 items-center">
              <div className="w-[30%] font-semibold">Description</div>
              <div className="w-[70%]">
                <TextEditor
                  value={localProjectDetails.description || ""}
                  placeholder="Add project description"
                  onSave={(v) => onUpdate({ description: v })}
                />
              </div>
            </li>

            <li className="w-full flex mb-8 items-center">
              <div className="w-[30%] font-semibold">Code</div>
              <div className="w-[70%]">{localProjectDetails.code}</div>
            </li>

            <li className="w-full flex mb-8 items-center">
              <div className="w-[30%] font-semibold">Project Lead</div>
              <div className="w-[70%]">
                {<UserDetails userId={localProjectDetails.manager} />}
              </div>
            </li>

            <li className="w-full flex mb-8 items-center">
              <div className="w-[30%] font-semibold">Active Contributers</div>
              <div className="w-[70%]">
                {localProjectDetails?.manager || ""}
              </div>
            </li>

            <li className="w-full flex mb-8 items-center">
              <div className="w-[30%] font-semibold">Issues</div>
              <div className="w-[70%]">
                <Link
                  href={`/${localProjectDetails.companyPathname}/projects/${project.code}?view=issues`}
                  className="text-blue-600 hover:underline"
                >
                  {localProjectDetails.issues ?? ""} issues
                </Link>
              </div>
            </li>

            <li className="w-full flex mb-8 items-center">
              <div className="w-[30%] font-semibold">Releases</div>
              <div className="w-[70%]">
                <Link
                  href={`/${localProjectDetails.companyPathname}/projects/${project.code}?view=releases`}
                  className="text-blue-600 hover:underline"
                >
                  {localProjectDetails?.releases ?? ""} releases
                </Link>
              </div>
            </li>
          </ul>
        </div>
        <div className="w-[50%] h-[calc(100%-82px)] overflow-y-auto border-l">
          <Activities projectId={localProjectDetails.id} />
        </div>
      </div>
    </div>
  );
}
