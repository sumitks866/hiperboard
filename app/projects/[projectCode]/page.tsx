"use client";

import AppLayout from "@/components/Wrappers/AppLayout";
import React from "react";
import { useSearchParams } from "next/navigation";
import ProjectSummary from "./ProjectSummary";
import Backlogs from "./Backlogs";

export default function Project({
  params,
}: {
  params: { projectCode: string };
}) {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  function getRenderComponent() {
    switch (view?.toLowerCase()) {
      case "summary":
        return <ProjectSummary projectCode={params.projectCode} />;
      case "board":
        return <div>AgileBoard</div>;
      case "backlogs":
        return <Backlogs />;
      default:
        return <ProjectSummary projectCode={params.projectCode} />;
    }
  }

  return <AppLayout>{getRenderComponent()}</AppLayout>;
}
