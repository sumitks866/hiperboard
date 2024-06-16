import { ITask } from "@/utils/types";
import React, { useMemo, useState } from "react";
import Select, { MultiValue } from "react-select";

interface IProps {
  taskList: ITask[];
  onChange?: (tasks: ITask[]) => void;
  label?: string;
  required?: boolean;
}

interface TaskOptions {
  readonly value: ITask;
  readonly label: string;
}

export default function NewMultiTaskSelector({
  taskList,
  onChange,
  label,
  required,
}: IProps) {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const taskOptions: TaskOptions[] = useMemo(() => {
    return taskList.map((task) => ({
      value: task,
      label: task.taskCode,
    }));
  }, [taskList]);

  const handleChange = (selected: MultiValue<TaskOptions>) => {
    setSelectedTasks(selected.map((option) => option.value.id));

    if (onChange) {
      onChange(selected.map((option) => option.value));
    }
  };

  const getOptionLabel = (option: any) => {
    return selectedTasks.includes(option.value.id)
      ? option.value.taskCode
      : `${option.value.taskCode} ${option.value.title}`;
  };

  return (
    <Select
      isMulti
      name="tasks"
      options={taskOptions}
      onChange={handleChange}
      isSearchable
      getOptionLabel={getOptionLabel}
      className="w-full"
    />
  );
}
