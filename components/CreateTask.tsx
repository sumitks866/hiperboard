"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from "react";
import TextInput from "./Input/TextInput";
import { TaskPriority, TaskStatus, TaskType } from "@/utils/enums";
import TextArea from "./Input/TextArea";
import Select from "./Select/Select";
import {
  IProject,
  IUser,
  SelectOption,
  TaskTypeIcons,
  TaskPriorityIcons,
  ITask,
} from "@/utils/types";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import isUndefined from "lodash/isUndefined";
import { isValidString } from "@/utils/validation";
import { useAppSelector } from "@/lib/store/store";
import { isEmpty, isNull } from "lodash";
import { AvatarGenerator } from "random-avatar-generator";
import { createTask } from "@/api/task";
import { TaskPriorityOptions, TaskTypeOPtions } from "./Select/SelectOptions";
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

interface IProps {
  onCreateSuccess?: () => void;
}

export const getProjectLabel = (project: IProject | undefined) => {
  return !project ? "" : `${project.name} (${project.code})`;
};

const UserSelectCard = (user: IUser): React.ReactNode => {
  const avatarGenerator = new AvatarGenerator();
  return (
    <div className="w-full flex items-center">
      <img
        src={avatarGenerator.generateRandomAvatar(user.email)}
        alt={user.email}
        className={`h-7 mr-2`}
      />
      <div className="whitespace-nowrap">{user.name}</div>
      <div className="text-[11px] text-gray-600 ml-2">{user.email}</div>
    </div>
  );
};

export default function CreateTask({ onCreateSuccess }: IProps) {
  const [project, setProject] = useState<IProject>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<TaskPriority>(
    TaskPriority.UNASSIGNED
  );
  const [type, setType] = useState<TaskType>(TaskTypeOPtions[0].value);
  const [assignee, setAssignee] = useState<IUser>();
  const [submitBtnClicked, setSubmitBtnClicked] = useState<boolean>(false);
  const [reporter, setReporter] = useState<IUser>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [relatedIssues, setRelatedIssues] = useState<string[]>([]);

  const { projectList, activeProject } = useAppSelector(
    (state) => state.projectReducer
  );

  const { user } = useAppSelector((state) => state.globalReducer);

  const relatedIssuesOptions: SelectOption<string> = [];

  const assigneeOptions: SelectOption<IUser>[] = (
    !isNull(user) ? [user] : []
  ).map((u: IUser) => {
    return {
      value: u,
      label: u?.name,
      keyNode: UserSelectCard(u),
    } as SelectOption<IUser>;
  });

  const projectOptions: SelectOption<IProject>[] = useMemo(
    () =>
      (projectList || []).map((project) => ({
        value: project,
        label: getProjectLabel(project),
      })),
    [projectList]
  );

  const handleCreateTask = async (e: any) => {
    if (isNull(user) || !project) return;

    e.preventDefault();
    setSubmitBtnClicked(true);
    setIsLoading(true);

    const task: Partial<ITask> = {
      projectId: project?.id,
      type: type!,
      title,
      description,
      priority,
      assigneeEmail: assignee?.email,
      reporterEmail: user?.email,
      relatedIssuesCode: relatedIssues,
      // status: TaskStatus.NEW,
    };

    try {
      await createTask(task);
      onCreateSuccess && onCreateSuccess();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProjectSelect = (value: any) => {
    setProject(value.value);
  };

  useEffect(() => {
    if (!isNull(user)) setReporter(user);
  }, [user]);

  useEffect(() => {
    if (!isNull(activeProject)) {
      setProject(activeProject);
    } else if (!isEmpty(projectList)) {
      setProject(projectList[0]);
    }
  }, [activeProject, projectList]);

  return (
    <div className="flex flex-col w-[700px]">
      <div className="border-b-2 px-8 py-2 h-26 flex items-center">
        <h2 className="py-2 text-[20px] font-semibold">Create Task</h2>
      </div>
      <form className="mx-auto text-[13px] w-full py-4 px-8 overflow-auto">
        <div className="w-full flex justify-between py-2">
          <Select
            id="task-project"
            label="Project"
            selected={project}
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
            selected={type}
            onChange={(val) => setType(val.value)}
            options={TaskTypeOPtions}
            classname="w-[49%]"
            required
            validated={
              submitBtnClicked && !isValidString(type) ? "error" : "default"
            }
            errorMsg="Select an issue type"
            placeholder="Issue type"
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
          autoFocus
        />

        <div className="my-2">
          <label htmlFor={"description"} className="block mb-2 font-semibold">
            <span>Description</span>
          </label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
          />
        </div>

        <div className="flex w-full justify-between">
          <Select
            label="Priority"
            id="task-priority"
            selected={priority}
            onChange={(val) => setPriority(val.value)}
            options={TaskPriorityOptions}
            classname="w-[49%]"
            placeholder="Select Priority"
          />

          <Select
            label="Assignee"
            id="task-assignee"
            selected={assignee}
            onChange={(val) => setAssignee(val.value)}
            options={assigneeOptions}
            classname="w-[49%]"
            placeholder="Select an Assignee"
          />
        </div>

        <div className="flex w-full justify-between py-2 mt-2">
          <Select
            label="Reporter"
            id="task-reporter"
            selected={reporter}
            onChange={(val) => setReporter(val.value)}
            options={assigneeOptions}
            classname="w-[49%]"
          />
          <Select
            label="Related Issue(s)"
            id="task-assignee"
            selected={relatedIssues}
            onChange={(val) => setRelatedIssues(val.value)}
            options={relatedIssuesOptions}
            classname="w-[49%]"
          />
        </div>
      </form>
      <div className="border-t-2 px-8 py-4 h-26 flex items-center">
        <button
          onClick={handleCreateTask}
          disabled={
            submitBtnClicked &&
            (!isValidString(type) ||
              !isValidString(title) ||
              isUndefined(project))
          }
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-12 rounded mx-auto disabled:bg-blue-300"
        >
          {isLoading ? "Creating" : "Create"}
        </button>
      </div>
    </div>
  );
}
