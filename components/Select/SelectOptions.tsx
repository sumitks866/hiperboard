import {
  ReleaseTypeEnum,
  TaskPriority,
  TaskStatus,
  TaskType,
} from "@/utils/enums";
import {
  SelectOption,
  TaskPriorityIcons,
  TaskStatusIcons,
  TaskTypeIcons,
} from "@/utils/types";

export const TaskTypeOPtions: SelectOption<TaskType>[] = Object.values(
  TaskType
).map((value) => {
  return {
    value,
    label: value,
    keyNode: (
      <div>
        <i
          className={`${TaskTypeIcons[value].icon} mr-2`}
          style={{
            color: TaskTypeIcons[value].color,
          }}
        />
        <span>{value}</span>
      </div>
    ),
  } as SelectOption<TaskType>;
});

export const TaskPriorityOptions: SelectOption<TaskPriority>[] = Object.values(
  TaskPriority
).map((value) => {
  return {
    value,
    label: value,
    keyNode: (
      <div>
        <i
          className={`${TaskPriorityIcons[value].icon} mr-2`}
          style={{
            color: TaskPriorityIcons[value].background,
          }}
        />
        <span>{value}</span>
      </div>
    ),
  } as SelectOption<TaskPriority>;
});

export const TaskStatusOptions: SelectOption<TaskStatus>[] = Object.values(
  TaskStatus
).map((value) => {
  return {
    value,
    label: value,
    keyNode: (
      <div>
        <i
          className={`${TaskStatusIcons[value].icon} mr-2`}
          style={{
            color: TaskStatusIcons[value].color,
          }}
        />
        <span>{value}</span>
      </div>
    ),
  } as SelectOption<TaskStatus>;
});

export const ReleaseTypeOptions: SelectOption<ReleaseTypeEnum>[] =
  Object.values(ReleaseTypeEnum).map((value) => {
    return {
      value,
      label: value,
    } as SelectOption<ReleaseTypeEnum>;
  });
