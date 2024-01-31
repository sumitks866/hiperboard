"use client";
import { ITask, TaskPriorityIcons, TaskTypeIcons } from "@/utils/types";
import React from "react";
import Chip from "../Tags/Chip";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

interface IProps {
  task: ITask;
}

export default function TaskCard({ task }: IProps) {
  const params = useParams();
  const searchParams = useSearchParams();
  return (
    <Link
      href={`/${params.workspacePathname}/projects/${params.projectCode}/tasks/${task.taskCode}`}
    >
      <div className="bg-white p-4 text-[12px] rounded-md w-full border hover:bg-gray-50 hover:shadow-sm">
        <div className="text-gray-700">{task.taskCode}</div>
        <div className="font-medium mt-1 mb-2 text-[13px] flex items-start">
          <i
            className={`${TaskTypeIcons[task?.type!].icon} mt-1 mr-2`}
            style={{
              color: TaskTypeIcons[task?.type!].color,
            }}
          />
          <span className="m-0">{task.title}</span>
        </div>

        <div className="flex items-center">
          <div className={`flex w-fit rounded-lg px-2 text-[11px] relative`}>
            <div
              className="absolute h-full w-full left-0 top-0 rounded-lg"
              style={{
                backgroundColor: TaskPriorityIcons[task?.priority!].background,
                opacity: 0.11,
              }}
            />
            <i
              className={`${
                TaskPriorityIcons[task?.priority!].icon
              } mt-1 mr-2 font-medium`}
              style={{
                color: TaskPriorityIcons[task?.priority!].background,
              }}
            />
            <p className="font-semibold">{task.priority}</p>
          </div>
          <div className="ml-4">
            <Chip
              value={task?.storyPoints}
              classname="bg-gray-100 text-[10px] font-medium"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
