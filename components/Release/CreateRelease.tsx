"use client";
import { useAppSelector } from "@/lib/store/store";
import { ReleaseStatusEnum, ReleaseTypeEnum } from "@/utils/enums";
import { IProject, ITask, SelectOption } from "@/utils/types";
import { isNull } from "lodash";
import React, { useEffect, useState } from "react";
import { getProjectLabel } from "../CreateTask";
import Select from "../Select/Select";
import TextInput from "../Input/TextInput";
import { ReleaseTypeOptions } from "../Select/SelectOptions";
import { getTasks } from "@/api/task";
import MultiTaskSelector from "../Select/MultiTaskSelector";

export default function CreateRelease() {
  const [project, setProject] = useState<IProject | null>(null);
  const status = ReleaseStatusEnum.Planning;
  const [version, setVersion] = useState<string>("1.0.0");
  const [type, setType] = useState<ReleaseTypeEnum>(ReleaseTypeEnum.Minor);
  const [targetTasks, setTargetTasks] = useState<string[]>([]);
  const [releaseNotes, setReleaseNotes] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [labels, setLabels] = useState<string[]>([]);
  const [taskList, setTaskList] = useState<ITask[]>([]);

  const { activeProject } = useAppSelector((state) => state.projectReducer);

  const loadTasks = async () => {
    if (isNull(activeProject)) return;
    try {
      const res = await getTasks(activeProject?.id);
      setTaskList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProject]);

  useEffect(() => {
    setProject(activeProject);
  }, [activeProject]);

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

        <div className="w-full flex justify-between py-2">
          {taskList.length > 0 && (
            <MultiTaskSelector
              taskList={taskList}
              label="Target Tasks"
              required
            />
          )}
        </div>
      </form>
    </div>
  );
}
