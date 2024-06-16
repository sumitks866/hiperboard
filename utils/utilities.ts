import { TaskPriority } from "./enums";
import { IEvent, ITask, ITaskActivity } from "./types";

interface IGroupedTasks {
  [key: string]: ITask[];
}

export function generateColorCode(inputString: string): string {
  let hash = 0;
  for (let i = 0; i < inputString.length; i++) {
    hash = inputString.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit integer
  }

  // Convert the hash to a color
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 255;
    color += ("00" + value.toString(16)).substr(-2);
  }

  return color;
}

export const formatDate = (dateString: string, ignoreTime = false) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour12: false,
  };

  if (!ignoreTime) {
    options.hour = "2-digit";
    options.minute = "2-digit";
  }

  const formattedDate = date.toLocaleString("en-IN", options).replace(",", "");
  return formattedDate.split("-").join(" ");
};

export const groupTaskByField = (
  tasks: ITask[],
  field: keyof ITask
): { byArray: IGroupedTasks[]; byObject: Record<string, ITask[]> } => {
  const taskMap: Record<string, ITask[]> = {};

  tasks.forEach((task) => {
    let f = task[field];
    if (Array.isArray(f)) {
      f = f.join(", ");
    }

    f = f || "_";

    if (!taskMap[f]) {
      taskMap[f] = [];
    }

    taskMap[f].push(task);
  });

  const resultArray: IGroupedTasks[] = Object.entries(taskMap).map(
    ([assignee, tasks]) => {
      const resultObject: IGroupedTasks = { [assignee]: tasks };
      return resultObject;
    }
  );

  return { byArray: resultArray, byObject: taskMap };
};

export const sortTasksByPriority = (
  tasks: ITask[],
  direction: "asc" | "desc" = "desc"
): ITask[] => {
  return tasks.sort((a, b) => {
    const priorityOrder = {
      [TaskPriority.UNASSIGNED]: 0,
      [TaskPriority.MINOR]: 1,
      [TaskPriority.MEDIUM]: 2,
      [TaskPriority.MAJOR]: 3,
      [TaskPriority.CRITICAL]: 4,
      [TaskPriority.BLOCKER]: 5,
    };
    const m = direction === "desc" ? -1 : 1;
    return (
      m *
      (priorityOrder[a.priority || TaskPriority.UNASSIGNED] -
        priorityOrder[b.priority || TaskPriority.UNASSIGNED])
    );
  });
};
