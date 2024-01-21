import { baseAPI } from ".";
import { ITask } from "@/utils/types";

type ICreateTaskRequest = Partial<ITask>;
type IUpdateTaskRequest = Partial<ITask>;

export const createTask = (request: ICreateTaskRequest) => {
  const url = "/task";
  return baseAPI.post(url, request, {
    headers: { "Content-Type": "application/json" },
  });
};

export const getTaskByCode = (projectId: string, taskCode: string) => {
  const url = `/task/${projectId}/${taskCode}`;
  return baseAPI.get(url);
};

export const getTasks = (projectId: string) => {
  const url = `/task/${projectId}`;
  return baseAPI.get(url);
};

export const updateTask = (taskId: string, request: IUpdateTaskRequest) => {
  const url = `/task/${taskId}`; // Assuming your API endpoint for updating a task includes the taskId in the URL
  return baseAPI.put(url, request, {
    headers: { "Content-Type": "application/json" },
  });
};
