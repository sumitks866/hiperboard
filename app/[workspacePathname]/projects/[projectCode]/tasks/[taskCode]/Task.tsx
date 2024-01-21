"use client";
import { useAppSelector } from "@/lib/store/store";
import { useParams } from "next/navigation";
import React, { useContext, useEffect } from "react";
import TaskDetails from "./TaskDetails";
import { TaskDispatchContext } from "@/context/TaskContext";
import { fetchTask } from "@/context/TaskReducer";
import { isNull } from "lodash";

export default function Task() {
  const params = useParams();
  const { activeProject } = useAppSelector((state) => state.projectReducer);
  const dispatch = useContext(TaskDispatchContext);

  useEffect(() => {
    if (!isNull(activeProject))
      fetchTask(dispatch, activeProject.id, params.taskCode as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.taskCode, activeProject]);

  if (isNull(activeProject)) return <></>;

  return (
    <>
      <TaskDetails />
    </>
  );
}
