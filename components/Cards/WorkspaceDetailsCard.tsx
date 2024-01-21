import { IWorkspace } from "@/utils/types";
import React from "react";
import { useRouter } from "next/navigation";

interface IProps {
  workspace: IWorkspace;
  classname?: string;
}

export default function WorkspaceDetailsCard({ workspace, classname }: IProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/${workspace.pathname}`);
  };
  return (
    <button
      className="w-full text-left border-gray-400 border-dashed"
      onClick={handleClick}
    >
      {workspace.name}
    </button>
  );
}
