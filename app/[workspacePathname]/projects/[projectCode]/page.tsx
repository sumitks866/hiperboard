"use client";

import AppLayout from "@/components/Wrappers/AppLayout";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProjectSummary from "./ProjectSummary";
import Backlogs from "./Backlogs";
import { useQuery } from "react-query";
import { getProjectByCode } from "@/api/project";
import { isNull, isUndefined } from "lodash";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/lib/store/store";
import { setActiveProject } from "@/lib/store/projects/projectSlice";

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
      case "board":
        return <div>AgileBoard</div>;
      case "backlogs":
        return <Backlogs />;
      default:
        return <ProjectSummary project={activeProject!} />;
    }
  }

  return (
    <AppLayout>
      {isNull(activeProject) ? <div>Loading...</div> : getRenderComponent()}
    </AppLayout>
  );
}
