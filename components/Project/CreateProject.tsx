"use client";
import React, { useMemo, useState } from "react";
import TextInput from "../Input/TextInput";
import Select from "../Select/Select";
import { AppDispatch, useAppSelector } from "@/lib/store/store";
import { IWorkspace, SelectOption } from "@/utils/types";
import { isEmpty, isNull, isUndefined } from "lodash";
import { createProject } from "@/api/project";
import { useDispatch } from "react-redux";
import { updateProjectList } from "@/lib/store/projects/projectSlice";

interface IProps {
  onSuccess?: () => void;
}

export default function CreateProject({ onSuccess }: IProps) {
  const { companyWorkspaces, user } = useAppSelector(
    (state) => state.globalReducer
  );

  const [projectName, setProjectName] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<IWorkspace>();

  const workspaceOptions: SelectOption<IWorkspace>[] = useMemo(
    () =>
      companyWorkspaces.map((c) => ({
        value: c,
        label: c.name,
      })),
    [companyWorkspaces]
  );

  const handleWorkspaceSelected = (value: any) => {
    setSelectedWorkspace(value.value);
  };

  const handleCreateProject = async () => {
    setIsLoading(true);
    try {
      await createProject({
        name: projectName,
        code,
        manager: user?.email!,
        companyId: selectedWorkspace?.id!,
      });
      onSuccess && onSuccess();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-[12px] py-4 px-8 max-w-[600px]">
      <h2 className="font-semibold text-[20px]">Project Details</h2>
      <div className="mb-4">
        Enter your project details including project name and code. You will be
        the project lead and can monitor and administer the project. Invite your
        team members to collaborate.
      </div>
      <Select
        label="Workspace"
        required
        placeholder="Select workspace under which this project lies"
        options={workspaceOptions}
        selected={selectedWorkspace}
        onChange={handleWorkspaceSelected}
      />
      <TextInput
        label="Name"
        required
        placeholder="Try a project name"
        value={projectName}
        onChange={(_, val) => setProjectName(val)}
        classname="mt-4"
      />
      <div className="mt-2">
        <b>Note:</b> Project name can later be edited in project settings.
      </div>
      <TextInput
        label="Code"
        required
        value={code}
        onChange={(_, val) => setCode(val)}
        classname="mt-4"
      />
      <div className="mt-2">
        <b>Note:</b> Project code gives a prefix to ticket codes to recogize
        issues from this project.
      </div>
      <button
        className="bg-gray-700 hover:bg-gray-800 text-white mt-4 w-full rounded-sm py-2"
        onClick={handleCreateProject}
        disabled={
          isEmpty(projectName) ||
          isEmpty(code) ||
          isUndefined(selectedWorkspace) ||
          isNull(selectedWorkspace) ||
          isNull(user)
        }
      >
        {isLoading ? "Creating..." : "Create Project"}
      </button>
    </div>
  );
}
