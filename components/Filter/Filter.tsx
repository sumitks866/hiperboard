import { TaskPriority, TaskStatus, TaskType } from "@/utils/enums";
import { ITask } from "@/utils/types";
import React, { useEffect, useMemo, useState } from "react";
import Select from "../Select/Select";
import {
  TaskPriorityOptions,
  TaskStatusOptions,
  TaskTypeOPtions,
} from "../Select/SelectOptions";
import { useLocalStorage } from "@uidotdev/usehooks";

export interface IFilterOptions {
  priority?: TaskPriority;
  type?: TaskType;
  status?: TaskStatus;
  assignee?: { name: string; email: string };
}

interface IProps {
  originalTaskList: ITask[];
  onChange: (filteredTasks: ITask[]) => void;
}

const filterOptions = ["Priority", "Type", "Status", "Assignee"];
const defaultFilterValues: IFilterOptions = {
  priority: TaskPriority.BLOCKER,
  type: TaskType.BUG,
  status: TaskStatus.IN_PROGRESS,
};

export default function Filter({ originalTaskList, onChange }: IProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<IFilterOptions>({});

  const selectedOptions = Object.keys(filters).map((o) =>
    o.charAt(0).toUpperCase().concat(o.slice(1))
  );

  const availableOptions = useMemo(
    () => filterOptions.filter((o1) => !selectedOptions.includes(o1)),
    [selectedOptions]
  );

  const toggleOpen = () => {
    setIsOpen((p) => !p);
  };

  const onFilterChange = (option: string) => {
    const newFilters = { ...filters };
    if (newFilters[option.toLowerCase()]) {
      delete newFilters[option.toLowerCase()];
    } else {
      newFilters[option.toLowerCase()] =
        defaultFilterValues[option.toLowerCase()];
    }
    setFilters(newFilters);
  };

  const onFilterValueChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  useEffect(() => {
    console.log("tasklist changed");
  }, [originalTaskList]);

  useEffect(() => {
    const filteredTasks = originalTaskList.filter((task) =>
      Object.entries(filters).every(
        ([key, val]) => task[key] === val || val === ""
      )
    );
    onChange(filteredTasks);
    console.log("here");
  }, [originalTaskList, onChange, filters]);

  const getFilterComponentByOption = (option: string) => {
    switch (option) {
      case "Type": {
        return (
          <Select
            onChange={(v) => onFilterValueChange("type", v.value)}
            options={TaskTypeOPtions}
            selected={filters.type}
            isInline
            classname="w-full"
            open
          />
        );
      }
      case "Priority": {
        return (
          <Select
            onChange={(v) => onFilterValueChange("priority", v.value)}
            options={TaskPriorityOptions}
            selected={filters.priority}
            isInline
            classname="w-full"
            open
          />
        );
      }
      case "Status": {
        return (
          <Select
            onChange={(v) => onFilterValueChange("status", v.value)}
            options={TaskStatusOptions}
            selected={filters.status}
            isInline
            classname="w-full"
            open
          />
        );
      }
      default: {
        return <div>{option}</div>;
      }
    }
  };

  return (
    <div className="flex items-center gap-2 cursor-default">
      {selectedOptions.map((opt) => (
        <div
          key={`selected-${opt}`}
          className="border-[2px] border-gray-300 rounded-md pl-2 flex gap-2"
        >
          <span className="font-semibold text-gray-500">{opt}:</span>
          <span className="w-fit">{getFilterComponentByOption(opt)}</span>
          <span
            role="button"
            className="px-2 hover:bg-gray-100 text-gray-500 rounded-r-md text-md"
            onClick={() => {
              onFilterChange(opt);
            }}
          >
            <i className="fas fa-times" />
          </span>
        </div>
      ))}
      {availableOptions.length > 0 && (
        <button
          className="hover:bg-gray-100 px-1 py-1 rounded-md text-gray-500 font-semibold relative"
          onClick={toggleOpen}
        >
          <i className="fas fa-filter" /> <span>Filter</span>
          {isOpen && (
            <div className="absolute bg-white z-[999] border rounded-lg text-left w-[200px] py-2 px-2 mt-1 shadow-md left-0 right-0 top-full font-medium">
              {availableOptions.map((option) => (
                <div
                  key={option}
                  role="option"
                  aria-selected={false}
                  className="px-2 py-2 hover:bg-gray-100 rounded-md"
                  onClick={() => onFilterChange(option)}
                >
                  <i className="fas fa-ellipsis"></i>
                  {option}
                </div>
              ))}
            </div>
          )}
        </button>
      )}
    </div>
  );
}
