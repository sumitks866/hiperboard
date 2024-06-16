"use client";
import { getTasks } from "@/api/task";
import BacklogIssueCard from "@/components/Cards/BacklogIssueCard";
import Display from "@/components/Filter/Display";
import Filter, { IFilterOptions } from "@/components/Filter/Filter";
import { useAppSelector } from "@/lib/store/store";
import { ITask } from "@/utils/types";
import { useLocalStorage } from "@uidotdev/usehooks";
import { isNull } from "lodash";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import AgileBoard from "./AgileBoard";

function TasksListView({ taskList }: { taskList: ITask[] }) {
  return (
    <>
      {taskList.map((task) => (
        <BacklogIssueCard key={task.taskCode} task={task} />
      ))}
    </>
  );
}

export default function Issues() {
  const searchParams = useSearchParams();
  const labels = searchParams.getAll("label");
  const { activeProject } = useAppSelector((state) => state.projectReducer);
  const {
    isLoading,
    error,
    data: tasks,
  } = useQuery(["project-task-list", activeProject?.id], () =>
    getTasks(activeProject?.id!)
  );
  const taskList: ITask[] = useMemo(() => tasks?.data || [], [tasks?.data]);

  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);
  const [view, setView] = useLocalStorage<"list" | "grid">(
    "issues-view-type",
    "list"
  );

  if (isLoading) return <>Loading...</>;

  return (
    <div className="w-full mx-auto flex flex-col">
      <h3 className="py-2 text-lg font-semibold px-6">Issues</h3>
      <div className="py-1 border-y px-8 flex justify-between items-center">
        <Filter originalTaskList={taskList} onChange={setFilteredTasks} />
        <Display display={view} onChange={setView} />
      </div>
      <section className="w-full flex-1 overflow-auto">
        {view === "list" ? (
          <TasksListView taskList={filteredTasks} />
        ) : (
          <AgileBoard taskList={filteredTasks} />
        )}
      </section>
    </div>
  );
}
