/* eslint-disable @next/next/no-img-element */
"use client";
import { TaskPriority, TaskStatus } from "@/utils/enums";
import { ITask, TaskPriorityIcons, TaskStatusIcons } from "@/utils/types";
import { AvatarGenerator } from "random-avatar-generator";
import Link from "next/link";
import React from "react";
import Chip from "../Tags/Chip";
import { useParams, useSearchParams } from "next/navigation";
import { isNull } from "lodash";

interface IProps {
  task: ITask;
}

export default function BacklogIssueCard({ task }: IProps) {
  const params = useParams();
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const avatarGenerator = new AvatarGenerator();

  return (
    <Link
      href={`/${params.workspacePathname}/projects/${
        params.projectCode
      }/tasks/${task.taskCode}${!isNull(view) && `?view=${view}`}`}
    >
      <div className="flex justify-between w-full h-12 items-center px-4 py-2 shadow-xs hover:shadow-sm my-1 bg-white hover:bg-gray-50 text-xs cursor-pointer">
        <div className="">
          <span className="">
            <i
              className={`${
                TaskPriorityIcons[task.priority || TaskPriority.UNASSIGNED].icon
              } `}
              style={{
                color:
                  TaskPriorityIcons[task.priority || TaskPriority.UNASSIGNED]
                    .background,
              }}
            />
          </span>
          <span className="mx-4 text-blue-700 font-u">
            <span>{task.taskCode}</span>
          </span>
          <span className="">{task.title}</span>
        </div>

        <div className="flex items-center w-fit">
          <div
            className={`mx-2 px-2 py-[2px] rounded-2xl`}
            style={{
              backgroundColor:
                TaskStatusIcons[task.status || TaskStatus.NEW].background,
            }}
          >
            <i
              className={`${
                TaskStatusIcons[task.status || TaskStatus.NEW].icon
              } mr-2`}
            />
            <span>{task.status}</span>
          </div>
          <Chip classname="mx-2" value={task.storyPoints} />
          {task.assigneeEmail ? (
            <img
              src={avatarGenerator.generateRandomAvatar(task.assigneeEmail!)}
              alt={task.assigneeEmail!}
              className={`h-7`}
            />
          ) : (
            <i className="fa fa-user bg-gray-300 text-white rounded-full p-2" />
          )}
        </div>
      </div>
    </Link>
  );
}
