"use client";
import AppLayout from "@/components/Wrappers/AppLayout";
import React from "react";
import TaskDetails from "./TaskDetails";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/lib/store/store";
import Task from "./Task";
import { TaskContextProvider } from "@/context/TaskContext";

export default function Page() {
  
  return (
    <AppLayout>
      <TaskContextProvider>
        <div className="w-full mx-auto h-full flex bg-white">
          <Task />
        </div>
      </TaskContextProvider>
    </AppLayout>
  );
}
