// pages/index.tsx

import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

interface Task {
  id: string;
  content: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialData: Column[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      { id: "task1", content: "Task 1" },
      { id: "task2", content: "Task 2" },
    ],
  },
  {
    id: "inProgress",
    title: "In Progress",
    tasks: [{ id: "task3", content: "Task 3" }],
  },
  {
    id: "done",
    title: "Done",
    tasks: [],
  },
];

const TaskBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>(initialData);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceColumn = columns.find(
      (col) => col.id === result.source.droppableId
    );
    const destinationColumn = columns.find(
      (col) => col.id === result.destination!.droppableId
    );

    if (!sourceColumn || !destinationColumn) return;

    const sourceTask = sourceColumn.tasks[result.source.index];

    const newSourceTasks = sourceColumn.tasks.filter(
      (task) => task.id !== sourceTask.id
    );
    const newDestinationTasks = [...destinationColumn.tasks];
    newDestinationTasks.splice(result.destination.index, 0, sourceTask);

    const newColumns = columns.map((col) => {
      if (col.id === result.source.droppableId) {
        return { ...col, tasks: newSourceTasks };
      }
      if (col.id === result.destination!.droppableId) {
        return { ...col, tasks: newDestinationTasks };
      }
      return col;
    });

    setColumns(newColumns);
  };

  return (
    <div className="container mx-auto mt-8">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex">
          {columns.map((column) => (
            <div key={column.id} className="flex-1 p-4">
              <h2 className="text-lg font-semibold mb-4">{column.title}</h2>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-gray-100 p-4 rounded"
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-2 mb-2 rounded shadow"
                          >
                            {task.content}
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
    </div>
  );
};

export default TaskBoard;
