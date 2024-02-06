"use client";
import { getProjectsByCompanyId } from "@/api/project";
import CreateTask from "@/components/CreateTask";
import AppLayout from "@/components/Wrappers/AppLayout";
import { useAppSelector } from "@/lib/store/store";
import React from "react";

export default function Projects() {
 
  return (
    <AppLayout>
      <div className="w-full mx-auto min-h-full flex p-4 bg-white text-[12px]">
        hello
      </div>
    </AppLayout>
  );
}
