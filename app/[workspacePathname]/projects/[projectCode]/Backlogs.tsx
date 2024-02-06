"use client";
import { getTasks } from "@/api/task";
import BacklogIssueCard from "@/components/Cards/BacklogIssueCard";
import { useAppSelector } from "@/lib/store/store";
import { ITask } from "@/utils/types";
import { isNull } from "lodash";
import React, { useEffect, useState } from "react";

export default function Backlogs() {
  const { activeProject } = useAppSelector((state) => state.projectReducer);
  const [taskList, setTaskList] = useState<ITask[]>([]);

  const loadTasks = async () => {
    if (isNull(activeProject)) return;
    try {
      const res = await getTasks(activeProject?.id);
      setTaskList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProject]);

  return (
    <div className="w-full mx-auto h-full flex flex-col px-8">
      <h2 className="py-6 text-xl font-semibold">Backlogs</h2>
      {/* <hr className="border-gray-400" /> */}
      <div className="w-full flex-1 px-24 py-12 bg-gray-100 overflow-auto ">
        {taskList.map((task) => (
          <BacklogIssueCard key={task.taskCode} task={task} />
        ))}
      </div>
    </div>
  );
}
