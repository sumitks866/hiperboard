"use client";

import AppLayout from "@/components/Wrappers/AppLayout";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProjectSummary from "./ProjectSummary";
import Backlogs from "./Backlogs";
import { isNull, isUndefined } from "lodash";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/lib/store/store";
import { setActiveProject } from "@/lib/store/projects/projectSlice";
import AgileBoard from "./AgileBoard";
import { TaskContextProvider } from "@/context/TaskContext";
import Issues from "./Issues";
import Releases from "./Releases";

export default function Project({
  params,
}: {
  params: { projectCode: string };
}) {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const { activeProject } = useAppSelector((state) => state.projectReducer);

  function getRenderComponent() {
    switch (view?.toLowerCase()) {
      case "summary":
        return <ProjectSummary project={activeProject!} />;
      case "backlogs":
        return <Backlogs />;
      case "issues":
        return <Issues />;
      case "releases":
        return <Releases project={activeProject!} />;
      default:
        return <ProjectSummary project={activeProject!} />;
    }
  }

  return (
    <AppLayout>
      <div className="w-full mx-auto h-full flex bg-white">
        {isNull(activeProject) ? <div>Loading...</div> : getRenderComponent()}
      </div>
    </AppLayout>
  );
}
