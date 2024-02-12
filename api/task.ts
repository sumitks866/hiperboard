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

export const getTasks = (
  projectId: string,
  queries?: { [key: string]: string | string[] }
) => {
  const queryParams = new URLSearchParams();

  for (const [key, value] of Object.entries(queries || {})) {
    if (Array.isArray(value)) {
      value.forEach((item) =>
        queryParams.append(key, encodeURIComponent(item))
      );
    } else {
      queryParams.append(key, value);
    }
  }
  const url = `/task/${projectId}?${queryParams.toString()}`;

  return baseAPI.get(url);
};

export const updateTask = (taskId: string, request: IUpdateTaskRequest) => {
  const url = `/task/${taskId}`;
  return baseAPI.put(url, request, {
    headers: { "Content-Type": "application/json" },
  });
};

export const getCommentsForTask = async (
  taskId: string,
  page: number = 1,
  pageSize: number = 10
) => {
  const url = `task/${taskId}/comments?page=${page}&pageSize=${pageSize}`;
  return baseAPI.get(url);
};

export const getActivityLogs = async (taskId: string) => {
  const url = `task/${taskId}/activity`;
  return baseAPI.get(url);
};
