"use client";
import { getTasks, updateTask } from "@/api/task";
import TaskCard from "@/components/Cards/TaskCard";
import { useAppSelector } from "@/lib/store/store";
import { TaskStatus } from "@/utils/enums";
import { IProject, ITask, TaskStatusIcons, TaskTypeIcons } from "@/utils/types";
import { groupTaskByField, sortTasksByPriority } from "@/utils/utilities";
import React, { useEffect, useMemo, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";

const taskStatus = [
  TaskStatus.NEW,
  TaskStatus.IN_PROGRESS,
  // TaskStatus.MR_CREATED,
  // TaskStatus.MERGED,
  TaskStatus.ON_QA,
  TaskStatus.DONE,
  TaskStatus.REJECTED,
];

interface IProps {
  taskList: ITask[];
}

export default function AgileBoard({ taskList = [] }: IProps) {
  const [groupedTask, setGroupedTask] = useState<Record<string, ITask[]>>({});

  useEffect(() => {
    const t = groupTaskByField(taskList, "status").byObject;
    const newGroupedTask: Record<string, ITask[]> = {};
    taskStatus.forEach((s) => {
      newGroupedTask[s] = sortTasksByPriority(t[s] || []);
    });
    setGroupedTask(newGroupedTask);
  }, [taskList]);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    if (result.source.droppableId === result.destination!.droppableId) return;

    const sourceColumn = groupedTask[result.source.droppableId];
    const destinationColumn = groupedTask[result.destination!.droppableId];

    if (!sourceColumn || !destinationColumn) return;

    const sourceTask = sourceColumn[result.source.index];
    sourceTask.status = result.destination!.droppableId as TaskStatus;

    const newSourceColumn = sourceColumn.filter(
      (task) => task.id !== sourceTask.id
    );
    const newDestinationColumn = sortTasksByPriority([
      ...destinationColumn,
      sourceTask,
    ]);

    setGroupedTask((pre) => ({
      ...pre,
      [result.source.droppableId]: newSourceColumn,
      [result.destination!.droppableId]: newDestinationColumn,
    }));
    updateTask(sourceTask.id, {
      ...sourceTask,
      status: result.destination!.droppableId as TaskStatus,
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="w-full h-full flex overflow-x-auto">
        {taskStatus.map((status, id) => (
          <div
            key={status}
            className="mx-4 w-[300px] flex-shrink-0 flex flex-col bg-gray-100"
          >
            <div className="w-full py-2 font-semibold text-[13px] border-b bg-white">
              <i
                className={`${TaskStatusIcons[status].icon} mt-1 mr-2 font-medium`}
                style={{
                  color: TaskStatusIcons[status].color,
                }}
              />
              <span>{status}</span>
              <span className="text-gray-600 ml-4 text-[11px]">
                {(groupedTask[status] || []).length}
              </span>
            </div>
            <Droppable
              droppableId={status}
              type="status"
              ignoreContainerClipping
            >
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`w-full px-2 rounded-md relative flex-1 overflow-auto`}
                >
                  {snapshot.isDraggingOver && (
                    <div className="absolute top-0 left-0 w-full h-full rounded-md bg-gray-300 bg-opacity-25 z-20"></div>
                  )}
                  {(groupedTask[status] || []).map((task, id) => (
                    <Draggable key={task.id} draggableId={task.id} index={id}>
                      {(provided: DraggableProvided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="my-2"
                        >
                          <TaskCard task={task} key={task.id} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
