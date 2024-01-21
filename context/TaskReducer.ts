import { getTaskByCode, updateTask } from "@/api/task";
import { TaskPriority, TaskStatus, TaskType } from "@/utils/enums";
import { IAction, ITask } from "@/utils/types";

export enum TaskReducerConstants {
  getTask = "getTask",
  updateTask = "updateTask",
}

export interface ITaskState extends Partial<ITask> {
  isLoading: boolean;
  error: string | null;
}

type IActionType = IAction<TaskReducerConstants, ITaskState>;
export type TaskReducerDispatchType = (value: IActionType) => void;
export type ITaskStateFields = keyof ITaskState;

export const initialTaskState: ITaskState = {
  id: "",
  projectId: "",
  taskCode: "",
  status: TaskStatus.NEW,
  type: TaskType.TASK,
  title: "",
  description: "",
  storyPoints: undefined,
  assigneeEmail: "",
  reporterEmail: "",
  qaContactEmail: "",
  priority: TaskPriority.UNASSIGNED,
  fixVersion: "",
  labels: [],
  acceptanceCriteria: "",
  stargazers: [],
  createdAt: "",
  updatedAt: "",
  relatedIssuesCode: [],
  isLoading: false,
  error: null,
};

export const taskReducer = (
  state: ITaskState,
  action: IActionType
): ITaskState => {
  switch (action.type) {
    case TaskReducerConstants.getTask: {
      return { ...state, ...action.payload };
    }
    case TaskReducerConstants.updateTask: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};

export const fetchTask = async (
  dispatch: TaskReducerDispatchType,
  projectId: string,
  taskCode: string
) => {
  dispatch({
    type: TaskReducerConstants.getTask,
    payload: { ...initialTaskState, isLoading: true },
  });

  try {
    const res = await getTaskByCode(projectId, taskCode);
    const task = res.data;
    dispatch({
      type: TaskReducerConstants.getTask,
      payload: { ...task, isLoading: false },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: TaskReducerConstants.getTask,
      payload: { ...initialTaskState, isLoading: false },
    });
  }
};

export const updateTaskDetails = async (
  dispatch: TaskReducerDispatchType,
  taskid: string,
  updateDetails: Partial<ITask>
) => {
  try {
    await updateTask(taskid, updateDetails);
    dispatch({ type: TaskReducerConstants.updateTask, payload: updateDetails });
  } catch (err) {
    console.log(err);
  }
};
