import React, { useReducer } from "react";
import {
  ITaskState,
  TaskReducerDispatchType,
  initialTaskState,
  taskReducer,
} from "./TaskReducer";

export interface ITaskContext {
  taskState: ITaskState;
}

const initialStateContext: ITaskContext = {
  taskState: initialTaskState,
};

const initialDispatchContext: TaskReducerDispatchType = null;

export const TaskStateContext = React.createContext(initialStateContext);
export const TaskDispatchContext = React.createContext(initialDispatchContext);

export function TaskContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [taskState, dispatch] = useReducer(taskReducer, initialTaskState);
  return (
    <TaskStateContext.Provider value={{ taskState }}>
      <TaskDispatchContext.Provider value={dispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskStateContext.Provider>
  );
}
