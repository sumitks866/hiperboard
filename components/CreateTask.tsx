"use client";
import React, { useMemo, useState } from "react";
import TextInput from "./Input/TextInput";
import { TaskPriority, TaskType } from "@/utils/enums";
import TextArea from "./Input/TextArea";
import Select from "./Select/Select";
import { IProject, IUser, SelectOption } from "@/utils/types";
import { mockProjects, mockUsers } from "@/utils/mock";
import isUndefined from "lodash/isUndefined";
import UserSelector from "./UserSelector";
import { isValidString } from "@/utils/validation";

const getProjectLabel = (project: IProject | undefined) => {
  return isUndefined(project) ? "" : `${project.name} (${project.code})`;
};

export default function CreateTask() {
  const [project, setProject] = useState<IProject>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<TaskPriority>();
  const [type, setType] = useState<TaskType>();
  const [assignee, setAssignee] = useState<IUser>();
  const [submitBtnClicked, setSubmitBtnClicked] = useState<boolean>(false);

  const projectOptions: SelectOption<IProject>[] = useMemo(
    () =>
      mockProjects.map((project) => ({
        value: project,
        label: getProjectLabel(project),
      })),
    []
  );

  const handleCreateTask = (e: any) => {
    e.preventDefault();
    setSubmitBtnClicked(true);
  };

  const handleProjectSelect = (value: any) => {
    setProject(value.value);
  };

  return (
    <form className="flex flex-col px-12 pt-4 w-[70%] mx-auto bg-[#F5F5F5]">
      <h2 className="py-2 text-xl font-semibold">Create Task</h2>
      <hr className="py-2 border-gray-400" />
      <div className="text-sm">
        <div className="w-full flex justify-between py-2">
          <Select
            id="task-project"
            label="Project"
            value={getProjectLabel(project)}
            onChange={handleProjectSelect}
            options={projectOptions}
            classname="w-[49%]"
            required
            validated={
              submitBtnClicked && isUndefined(project) ? "error" : "default"
            }
            errorMsg="Please select a project"
          />

          <Select
            label="Type"
            id="task-type"
            value={type}
            onChange={(val) => setType(val)}
            options={Object.values(TaskType).map(
              (value) =>
                value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
            )}
            classname="w-[49%]"
            required
            validated={
              submitBtnClicked && !isValidString(type) ? "error" : "default"
            }
            errorMsg="Select an issue type"
            // placeholder="Issue type"
          />
        </div>

        <TextInput
          id="task-title"
          label="Title"
          value={title}
          onChange={(_, val) => setTitle(val)}
          classname="py-2"
          required
          validated={
            submitBtnClicked && !isValidString(title) ? "error" : "default"
          }
          errorMsg="Issue should have a title"
        />

        <TextArea
          id="task-description"
          label="Description"
          value={description}
          onChange={(_, val) => setDescription(val)}
          classname="py-2"
        />

        <div className="flex w-full justify-between">
          <Select
            label="Priority"
            id="task-priority"
            value={priority}
            onChange={(val) => setPriority(val)}
            options={Object.values(TaskPriority).map(
              (value) =>
                value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
            )}
            classname="w-[49%]"
            // placeholder="Select Priority"
          />

          <UserSelector
            label="Assignee"
            id="task-assignee"
            selectedUser={assignee}
            setSelectedUser={setAssignee}
            usersList={mockUsers}
            classname="w-[49%]"
          />
        </div>
      </div>
      <button
        onClick={handleCreateTask}
        disabled={
          submitBtnClicked &&
          (!isValidString(type) ||
            !isValidString(title) ||
            isUndefined(project))
        }
        className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-12 rounded my-8 mx-auto disabled:bg-blue-300"
      >
        Create
      </button>
    </form>
  );
}
