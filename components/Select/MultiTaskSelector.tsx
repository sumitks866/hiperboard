"use client";
import { ITask, SelectOption } from "@/utils/types";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";

interface IProps {
  taskList: ITask[];
  onChange?: (tasks: ITask[]) => void;
  label?: string;
  required?: boolean;
}

export default function MultiTaskSelector({
  taskList,
  onChange,
  label,
  required,
}: IProps) {
  const [selected, setSelected] = useState<ITask[]>([]);
  const [filtered, setfiltered] = useState(taskList);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    if (isEmpty(q)) {
      setfiltered(taskList);
      return;
    }

    const filterRegex = new RegExp(q, "i");
    const filteredTasks = taskList.filter(
      (task) => filterRegex.test(task.title) || filterRegex.test(task.taskCode)
    );
    setfiltered(filteredTasks);
  };

  const handleSelection = (task: ITask) => {
    console.log({ task });
    setSelected((pre) => [...pre, task]);
  };

  useEffect(() => {
    onChange && onChange(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  console.log({ selected });

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 font-semibold">
          <span>{label}</span>
          {required && <span className="text-red-600">*</span>}
        </label>
      )}

      {!isEmpty(selected) && (
        <div>
          {selected.map((t) => (
            <div key={t.id} className="border rounded-md">
              <span>{t.taskCode}</span>
            </div>
          ))}
        </div>
      )}

      <div className="relative border border-gray-300 flex rounded-md w-full">
        <input
          type="text"
          className="p-2 flex-1 rounded-md"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          placeholder="Search or select a task"
        />
        <button
          className="border-l px-3 bg-gray-50 hover:bg-gray-100 rounded-md"
          onClick={(e) => e.preventDefault()}
        >
          Add
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-0 w-full bg-white border-t border-gray-300 rounded-b-sm shadow-md z-10 p-2 max-h-[300px] overflow-y-auto">
            {filtered.map((task) => (
              <button
                key={task.id}
                className="cursor-pointer hover:bg-gray-100 focus:bg-gray-200 p-2 block"
                onClick={() => handleSelection(task)}
              >
                <span>
                  <b>{task.taskCode}</b> {task.title}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
