/* eslint-disable @next/next/no-img-element */
"use client";
import { ReleaseTypeEnum, TaskStatus } from "@/utils/enums";
import { IReleaseResponse, TaskStatusIcons } from "@/utils/types";
import { formatDate } from "@/utils/utilities";
import React, { useState } from "react";
import ProgressBar from "../Progress/ProgressBar";
import Modal from "../Modal/Modal";
import CreateRelease from "./CreateRelease";

interface IProps {
  release: IReleaseResponse;
  // isExpanded?: boolean;
  showExpandButton?: boolean;
  onExpand?: (taskId: string) => void;
}

export const getReleaseTypeBgColor = (type: string): string => {
  switch (type) {
    case ReleaseTypeEnum.Major: {
      return "#FF5733";
    }
    case ReleaseTypeEnum.Minor: {
      return "#6a5acd";
    }
    case ReleaseTypeEnum.Patch: {
      return "#32cd32";
    }
    default: {
      return "";
    }
  }
};

export default function Release({
  release,
  // isExpanded = true,
  showExpandButton = false,
}: IProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const CaretIcon = () => (
    <div
      className={`hover:bg-gray-200 rounded-full py-1 px-2 cursor-pointer h-fit transform rotate-${
        isExpanded ? "90" : "0"
      }`}
      onClick={() => setIsExpanded((pre) => !pre)}
    >
      <i className="fas fa-chevron-down" />
    </div>
  );

  const allTasks = [...release.completedTasks, ...release.remainingTasks].sort(
    (a, b) => {
      if (a.taskId < b.taskId) return -1;
      return 1;
    }
  );

  if (!isExpanded)
    return (
      <div className="bg-white border rounded-lg px-8 py-4 mb-2 cursor-default flex justify-between items-center">
        <div className=" flex items-center">
          <span className="font-semibold text-lg">{release.version}</span>
          <span
            className={`text-white font-mono font-semibold px-2 rounded-sm ml-4 mr-2`}
            style={{ backgroundColor: getReleaseTypeBgColor(release?.type!) }}
          >
            {release.type}
          </span>
          <span className="bg-gray-300 p-[3px] mx-2 rounded-full" />
          <span className="mx-2">
            <i className="far fa-calendar text-blue-400 mr-2" />
            <span className="font-medium">
              {formatDate(release.dueDate, true)}
            </span>
          </span>

          <span className="mx-2 w-20 font-medium text-center">
            {release.status}
          </span>

          <span className="w-80 mx-2">
            <ProgressBar progress={release.progress} />
          </span>

          <span className="ml-2 mr-4 font-medium">
            {release.remainingTasks.length} left
          </span>
        </div>
        <CaretIcon />
      </div>
    );

  console.log({ release });

  return (
    <>
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <CreateRelease />
      </Modal>
      <div className="bg-white border rounded-lg px-8 py-4 mb-2 cursor-default flex justify-between">
        <div className="w-full">
          <div className="flex items-center">
            <h3 className="font-semibold text-xl">{release.version}</h3>
            <button
              onClick={() => setIsEditing(true)}
              className="ml-4 flex items-center border border-black bg-gray-50 hover:bg-gray-100 rounded-md px-1"
            >
              <span>Edit</span>
              <img
                src="https://img.icons8.com/material-rounded/24/787878/edit--v1.png"
                alt="edit--v1"
                className="h-3 ml-1"
              />
            </button>
          </div>
          <div className="flex items-center mt-2">
            <span
              className={`text-white font-mono font-semibold px-2 rounded-sm w-fit`}
              style={{ backgroundColor: getReleaseTypeBgColor(release?.type!) }}
            >
              {release.type}
            </span>
            <span className="bg-gray-300 p-[3px] mx-2 rounded-full" />
            <span className="text-gray-500 font-medium">
              {formatDate(release.createdOn, true)}
            </span>
          </div>

          <div className="mt-4">
            <span>
              <span className="font-bold">Status: </span>
              <span className="ml-1 font-medium text-gray-500">
                {release.status}
              </span>
            </span>
            <span className="mx-8">
              <i className="far fa-calendar text-blue-500 mr-1" />
              <span className="font-bold">Due Date: </span>
              <span className="ml-1 font-medium text-gray-500">
                {formatDate(release.dueDate, true)}
              </span>
            </span>
            <div className="my-8">
              <div dangerouslySetInnerHTML={{ __html: release.notes || "" }} />
            </div>
          </div>

          <div className="mt-4 w-full">
            <div className="flex items-center font-medium my-2">
              <span className="text-blue-700">
                {release.targetTasks.length} Total
              </span>
              <span className="bg-gray-300 p-[3px] mx-2 rounded-full h-fit" />
              <span className="text-green-600">
                {release.completedTasks.length} Done
              </span>
              <span className="bg-gray-300 p-[3px] mx-2 rounded-full h-fit" />
              <span className="text-red-600">
                {release.remainingTasks.length} Left
              </span>
            </div>

            <table className="mt-4 w-full">
              <thead className="w-full border-y-2">
                <tr>
                  <td className="font-semibold text-[14px]">Issue Code</td>
                  <td className="px-2 py-1 font-semibold text-[14px]">Title</td>
                  <td className="px-2 font-semibold text-[14px]">Status</td>
                </tr>
              </thead>
              <tbody>
                {allTasks.map((t) => (
                  <tr
                    key={t.taskId}
                    className={`${
                      t.status === TaskStatus.DONE ? "bg-green-50" : ""
                    }`}
                  >
                    <td>
                      <strong>{t.code}</strong>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap overflow-ellipsis">
                      {t.title}
                    </td>
                    <td className="px-2">
                      <div>
                        <i
                          className={`${TaskStatusIcons[t.status].icon} mr-2`}
                          style={{
                            color: TaskStatusIcons[t.status].color,
                          }}
                        />
                        <span>{t.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <CaretIcon />
      </div>
    </>
  );
}
