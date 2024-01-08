"use client";
import AppLayout from "@/components/Wrappers/AppLayout";
import React from "react";
import TaskDetails from "./TaskDetails";
import { useParams } from "next/navigation";

export default function Task() {
  const params = useParams();
  return (
    <AppLayout>
      <div className="w-full mx-auto h-full flex bg-white">
        <TaskDetails taskCode={params.taskCode as string} />
      </div>
    </AppLayout>
  );
}
