"use client";
import { AppDispatch } from "@/lib/store/store";
import { createCompanyWorkspace } from "@/lib/store/user/globalSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TextInput from "../Input/TextInput";

interface IProps {
  onCreateSuccess?: () => void;
}

export default function CreateWorkspace({ onCreateSuccess }: IProps) {
  const [companyName, setCompanyName] = useState<string>("");
  const [workspacePathname, setWorkspacePathname] = useState("");
  const [invitees, setInvitees] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleCreate = async () => {
    try {
      setIsLoading(true);
      await dispatch(
        createCompanyWorkspace({
          name: companyName,
          pathname: workspacePathname,
          invitees: invitees.split(" "),
        })
      );
      onCreateSuccess && onCreateSuccess();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-8 px-12 max-w-[600px]">
      <h2 className="font-semibold text-[20px]">Create New workspace</h2>
      <div className="mb-4 mt-2">
        Create a shared space with your team members to collaborate on various
        projects. Invite your peers to work with you in your workspace. Projects
        in one workspace cannot be accessed in others.
      </div>
      <div className="text-[12px]">
        <TextInput
          label="Workspace name:"
          value={companyName}
          onChange={(_, val) => setCompanyName(val)}
          placeholder="Enter your workspace name"
          required
        />

        <TextInput
          classname="mt-4"
          label="Workspace URL"
          value={workspacePathname}
          onChange={(_, val) => setWorkspacePathname(val)}
          fixedValue={`${window.location.host}/`}
          required
        />

        <TextInput
          label="Invite people to work with you:"
          value={invitees}
          onChange={(_, val) => setInvitees(val)}
          classname="mt-4"
          placeholder="Enter emails separated by space"
        />
        <div className="mt-2 text-[11px]">
          Your team members will receive an invitation email for this workspace.
        </div>
        <button
          className="bg-gray-700 hover:bg-gray-800 text-white mt-8 w-full rounded-sm py-2"
          onClick={handleCreate}
        >
          {isLoading ? "Creating" : "Create"}
        </button>
      </div>
    </div>
  );
}
