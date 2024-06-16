"use client";
import { getTasks } from "@/api/task";
import { useAppSelector } from "@/lib/store/store";
import { ReleaseStatusEnum, ReleaseTypeEnum } from "@/utils/enums";
import { IProject, ITask, SelectOption } from "@/utils/types";
import { isNull } from "lodash";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getProjectLabel } from "../CreateTask";
import TextInput from "../Input/TextInput";
import MultiTaskSelector from "../Select/MultiTaskSelector";
import NewMultiTaskSelector from "../Select/NewMultiTaskSelector";
import Select from "../Select/Select";
import { ReleaseTypeOptions } from "../Select/SelectOptions";
import {
  ICreateProjectReleaseRequest,
  createProjectRelease,
} from "@/api/project";

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

interface IProps {
  initialProject?: IProject | null;
  initialStatus?: ReleaseStatusEnum;
  initialVersion?: string;
  initialType?: ReleaseTypeEnum;
  initialTargetTasks?: ITask[];
  initialReleaseNotes?: string;
  initialDueDate?: Date;
  initialLabels?: string[];
  initialTaskList?: ITask[];
}

export default function CreateRelease({
  initialProject = null,
  initialStatus = ReleaseStatusEnum.Planning,
  initialVersion = "1.0.0",
  initialType = ReleaseTypeEnum.Minor,
  initialTargetTasks = [],
  initialReleaseNotes = "",
  initialDueDate = new Date(),
  initialLabels = [],
  initialTaskList = [],
}: IProps) {
  const [project, setProject] = useState<IProject | null>(initialProject);
  const [status, setStatus] = useState(initialStatus);
  const [version, setVersion] = useState(initialVersion);
  const [type, setType] = useState(initialType);
  const [targetTasks, setTargetTasks] = useState(initialTargetTasks);
  const [releaseNotes, setReleaseNotes] = useState(initialReleaseNotes);
  const [dueDate, setDueDate] = useState(initialDueDate);
  const [labels, setLabels] = useState(initialLabels);
  const [taskList, setTaskList] = useState(initialTaskList);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { activeProject } = useAppSelector((state) => state.projectReducer);
  const { user } = useAppSelector((state) => state.globalReducer);

  const loadTasks = async () => {
    if (isNull(activeProject)) return;
    try {
      const res = await getTasks(activeProject?.id);
      setTaskList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onTaskChange = (tasks: ITask[]) => {
    setTargetTasks(tasks);
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProject]);

  useEffect(() => {
    setProject(activeProject);
  }, [activeProject]);

  const handleCreateRelease = async (e: any) => {
    if (isNull(user) || !project) return;
    e.preventDefault();

    const release: ICreateProjectReleaseRequest = {
      projectId: project.id,
      status,
      version,
      type,
      targetTasks: targetTasks.map((t) => t.id),
      notes: releaseNotes,
      dueDate: dueDate.toString(),
      labels,
    };

    console.log({ release });

    try {
      setIsLoading(true);
      await createProjectRelease(release);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-[700px]">
      <div className="border-b-2 px-8 py-2 h-26 flex items-center">
        <h2 className="py-2 text-[20px] font-semibold">New Release</h2>
      </div>
      <form className="mx-auto text-[13px] w-full py-2 px-8 overflow-auto">
        <div className="w-full flex justify-between py-2">
          <TextInput
            id="release-project"
            label="Project"
            value={getProjectLabel(project!)}
            classname="w-[49%]"
            required
            disabled
          />
          <TextInput
            id="release-status"
            label="Status"
            value={status}
            classname="w-[49%]"
            disabled
          />
        </div>

        <div className="w-full flex justify-between py-2">
          <Select
            id="release-type"
            label="Type"
            selected={type}
            onChange={(value) => setType(value.value)}
            options={ReleaseTypeOptions}
            classname="w-[49%]"
            required
          />
          <TextInput
            id="release-version"
            label="Version"
            value={version}
            onChange={(_, v) => setVersion(v)}
            classname="w-[49%]"
            required
          />
        </div>

        <div className="w-full justify-between py-2">
          <label className="block mb-2 font-semibold">
            <span>Target Tasks</span>
            <span className="text-red-600">*</span>
          </label>
          {taskList.length > 0 && (
            <NewMultiTaskSelector
              taskList={taskList}
              label="Target Tasks"
              required
              onChange={onTaskChange}
            />
          )}
        </div>

        <div className="my-2">
          <label
            htmlFor="new-release-notes"
            className="block mb-2 font-semibold"
          >
            <span>Release Notes</span>
          </label>
          <ReactQuill
            theme="snow"
            value={releaseNotes}
            onChange={setReleaseNotes}
            id="new-release-notes"
          />
        </div>

        <div className="my-4 w-full">
          <label
            htmlFor="new-release-due-date"
            className="block mb-2 font-semibold"
          >
            <span>Due Date</span>
          </label>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date!)}
            className="p-2 border w-full"
            minDate={new Date()}
          />
        </div>

        <div className="px-8 py-4 h-26 flex items-center">
          <button
            onClick={handleCreateRelease}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-12 rounded mx-auto disabled:bg-blue-300"
          >
            {/* Create */}
            {isLoading ? "Creating" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
