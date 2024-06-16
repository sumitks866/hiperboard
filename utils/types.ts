import {
  ActivityType,
  ReleaseStatusEnum,
  ReleaseTypeEnum,
  TaskPriority,
  TaskStatus,
  TaskType,
} from "./enums";

export interface SelectOption<T> {
  value: T;
  label: string;
  keyNode?: React.ReactNode;
}

export interface IAction<T, P> {
  type: T;
  payload?: Partial<P>;
}

export interface NavigatorOptions {
  name: string;
  icon?: any;
  route: string;
}

export interface IWorkspace {
  id: string;
  name: string;
  pathname: string;
  adminEmails?: string[];
  employeeEmails?: string[];
  projects?: string[];
}

export interface IUserRole {
  companyName?: string;
  companyId: string;
  role: "admin" | "employee";
}

export interface IUser {
  name: string;
  email: string;
  username: string;
  companyRoles: IUserRole[];
}

export interface IProject {
  id: string;
  name: string;
  code: string;
  manager: string; //username
  companyId?: string;
  description?: string;
}

export interface IProjectSummary extends IProject {
  issues: number;
  releases: number;
  companyPathname: string;
}

export interface IComment {
  id: string;
  taskId: string;
  content: string;
  userEmail: string;
  createdAt: string;
  editedAt?: string;
}

export interface ITaskActivity {
  _id: string;
  taskId: string;
  type: ActivityType;
  actorEmail: string;
  timestamp: string;
  data: any;
}

export interface IEvent {
  id: string;
  content: React.ReactNode;
  eventIcon?: React.ReactNode;
  time?: string;
}

export interface ITask {
  id: string;
  projectId: string;
  taskCode: string;
  status: TaskStatus;
  type: TaskType;
  title: string;
  description?: string;
  storyPoints?: "1" | "3" | "5" | "8" | "13" | "21";
  assigneeEmail?: string;
  reporterEmail: string;
  qaContactEmail?: string;
  priority?: TaskPriority;
  fixVersion?: string;
  labels?: string[];
  acceptanceCriteria?: string;
  stargazers: string[]; // usernames[]
  createdAt: string;
  updatedAt: string;
  relatedIssuesCode: string[];
}

export interface IRelease {
  version: string;
  notes?: string;
  targetTasks: string[];
  dueDate: string;
  labels?: string[];
  status: ReleaseStatusEnum;
  type?: ReleaseTypeEnum;
  projectId: string;
}

export interface IReleaseResponse extends IRelease {
  id: string;
  progress: number;
  completedTasks: {
    taskId: string;
    code: string;
    status: TaskStatus;
    title: string;
  }[];
  remainingTasks: {
    taskId: string;
    code: string;
    status: TaskStatus;
    title: string;
  }[];
  createdOn: string;
}

type TaskPriorityWithIcon = {
  [key in TaskPriority]: {
    icon: string;
    background: string;
  };
};

export const TaskPriorityIcons: TaskPriorityWithIcon = {
  [TaskPriority.BLOCKER]: {
    icon: "fas fa-minus-circle",
    background: "#FF6347",
  },
  [TaskPriority.CRITICAL]: {
    icon: "fas fa-exclamation-triangle",
    background: "#FFA500",
  },
  [TaskPriority.MAJOR]: {
    icon: "fas fa-angle-double-up",
    background: "red",
  },
  [TaskPriority.MEDIUM]: {
    icon: "fa fa-bars",
    background: "#4682B4",
  },
  [TaskPriority.MINOR]: {
    icon: "fas fa-angle-double-down",
    background: "#32CD32",
  },
  [TaskPriority.UNASSIGNED]: {
    icon: "fas fa-question-circle",
    background: "#808080",
  },
};

type TaskStatusWithIcon = {
  [key in TaskStatus]: {
    icon: string;
    background: string;
    color: string;
  };
};

export const TaskStatusIcons: TaskStatusWithIcon = {
  [TaskStatus.NEW]: {
    icon: "fas fa-plus-circle",
    background: "#FFE8C1",
    color: "#D7B580",
  },
  [TaskStatus.ACCEPTED]: {
    icon: "fas fa-check-circle",
    background: "#DFFFBF",
    color: "#9FCB74",
  },
  [TaskStatus.IN_PROGRESS]: {
    icon: "fas fa-spinner",
    background: "#D4F2FF",
    color: "#6096C3",
  },
  [TaskStatus.ON_QA]: {
    icon: "fas fa-eye",
    background: "#FFD1C4",
    color: "#E06E5B",
  },
  [TaskStatus.DONE]: {
    icon: "fas fa-check-square",
    background: "#D4FFD9",
    color: "#7CD485",
  },
  [TaskStatus.DEFERRED]: {
    icon: "fas fa-pause-circle",
    background: "#FFC2D1",
    color: "#E0576E",
  },
  // [TaskStatus.DEVELOPMENT_COMPLETE]: {
  //   icon: "fas fa-code-branch",
  //   background: "#F3E5F5",
  //   color: "#C4A5D3",
  // },
  [TaskStatus.REJECTED]: {
    icon: "fas fa-times-circle",
    background: "#FFB3B3",
    color: "#FF6C6C",
  },
  // [TaskStatus.VERIFIED]: {
  //   icon: "fas fa-flag-checkered",
  //   background: "#C9DAF8",
  //   color: "#829CE8",
  // },
  // [TaskStatus.MR_CREATED]: {
  //   icon: "fas fa-random",
  //   background: "#F0E68C",
  //   color: "#DAA520",
  // },
  // [TaskStatus.MERGED]: {
  //   icon: "fas fa-code-branch",
  //   background: "#B5EAD7",
  //   color: "#35836F",
  // },
};

export type TaskTypeWithIcon = {
  [key in TaskType]: {
    icon: string;
    color: string;
  };
};

export const TaskTypeIcons: TaskTypeWithIcon = {
  [TaskType.BUG]: {
    icon: "fa fa-bug",
    color: "#FF6347", // Tomato
  },
  [TaskType.IMPROVEMENT]: {
    icon: "fas fa-tools",
    color: "#1f5eff", // Gold
  },
  [TaskType.TASK]: {
    icon: "fas fa-tasks",
    color: "#7c9ef7", // Light Blue
  },
  [TaskType.FEATURE]: {
    icon: "fas fa-star",
    color: "#FFA500", // Orange
  },
  [TaskType.EPIC]: {
    icon: "fas fa-dragon",
    color: "#9932CC", // Dark Orchid
  },
  [TaskType.STORY]: {
    icon: "fas fa-book",
    color: "#4169E1", // Royal Blue
  },
  [TaskType.REQUEST]: {
    icon: "fas fa-comment",
    color: "#9AC1E1", // Gray
  },
  [TaskType.DOC]: {
    icon: "far fa-file-alt", // Example icon for documentation
    color: "#2E8B57", // Sea Green
  },
  [TaskType.REPORT]: {
    icon: "fas fa-chart-bar", // Example icon for report
    color: "#800080", // Purple
  },
};
