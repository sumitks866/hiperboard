"use client";
/* eslint-disable @next/next/no-img-element */
import Comments from "@/components/Comments/Comments";
import InlineEdit from "@/components/Inline/InlineEdit";
import TextEditor from "@/components/Input/TextEditor";
import TextInput from "@/components/Input/TextInput";
import Select from "@/components/Select/Select";
import {
  TaskPriorityOptions,
  TaskStatusOptions,
  TaskTypeOPtions,
} from "@/components/Select/SelectOptions";
import HorizontalTabs from "@/components/Tabs/HorizontalTabs";
import Tab from "@/components/Tabs/Tab";
import TagGroup from "@/components/Tags/TagGroup";
import { TaskDispatchContext, TaskStateContext } from "@/context/TaskContext";
import {
  ITaskState,
  ITaskStateFields,
  initialTaskState,
  updateTaskDetails,
} from "@/context/TaskReducer";
import { mockComments } from "@/utils/mock";
import {
  ITask,
  TaskPriorityIcons,
  TaskStatusIcons,
  TaskTypeIcons,
} from "@/utils/types";
import { isUndefined } from "lodash";
import React, { useContext, useEffect, useState } from "react";
import TaskTimeline from "./TaskTimeline";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { UserDetails } from "@/components/User/UserDetails";

export default function TaskDetails() {
  // const router = useRouter();
  const params = useParams();
  const [activeTabKey, setActiveTabKey] = useState<string | number>(0);
  const [task, setTask] = useState<Partial<ITaskState>>(initialTaskState);

  const handleTabSelect = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tabKey: string | number
  ) => {
    setActiveTabKey(tabKey);
  };

  const { taskState } = useContext(TaskStateContext);
  const dispatch = useContext(TaskDispatchContext);

  useEffect(() => {
    setTask(taskState);
  }, [taskState]);

  if (taskState.isLoading) return <div>Loading...</div>;
  if (isUndefined(taskState)) return <div>Task not found </div>;

  const handleTaskStateUpdate = (_task?: Partial<ITask>) => {
    if (isUndefined(_task)) {
      updateTaskDetails(dispatch, taskState.id!, task);
    } else {
      if (!_task.id) return;
      updateTaskDetails(dispatch, taskState.id!, _task);
      setTask(_task);
    }
  };

  const updateTaskField = (field: ITaskStateFields, value: any) => {
    setTask((pre) => ({ ...pre, [field]: value }));
  };

  return (
    <div className="w-full overflow-hidden h-full">
      <div className="w-full py-6 px-4">
        <div className="text-[22px] flex">
          <div className="font-semibold mr-2 w-fit">{task?.taskCode}</div>
          <div className="flex-1">
            <InlineEdit
              handleChange={handleTaskStateUpdate}
              editComponent={
                <TextInput
                  value={task?.title}
                  onChange={(_, v) => updateTaskField("title", v)}
                  isInline
                  autoFocus
                  classname="w-full"
                />
              }
            >
              <h1>{task?.title}</h1>
            </InlineEdit>
          </div>
        </div>
      </div>
      <hr />
      <div className="w-full flex h-full">
        <div className="w-[55%] h-[calc(100%-82px)] text-[13px] overflow-y-auto py-4 px-6">
          <div className="task-details-section w-full">
            <h2 className="font-semibold mb-4">Details</h2>
            <div className="w-full grid grid-cols-2 gap-12">
              <ul className="">
                <li className="w-full flex pb-2">
                  <div className="w-[50%] font-semibold">Type</div>
                  <div className="w-[50%]">
                    <InlineEdit
                      handleChange={handleTaskStateUpdate}
                      editComponent={
                        <Select
                          onChange={(v) => updateTaskField("type", v.value)}
                          options={TaskTypeOPtions}
                          selected={task.type}
                          isInline
                          classname="w-full"
                        />
                      }
                    >
                      <>
                        <i
                          className={`${TaskTypeIcons[task?.type!].icon} mr-2`}
                          style={{
                            color: TaskTypeIcons[task?.type!].color,
                          }}
                        />
                        <span>{task?.type}</span>
                      </>
                    </InlineEdit>
                  </div>
                </li>
                <li className="w-full flex mb-2">
                  <div className="w-[50%] font-semibold">Story Points</div>
                  <div className="w-[50%]">
                    <InlineEdit
                      editComponent={
                        <TextInput
                          value={task?.storyPoints || ""}
                          onChange={(_, v) => updateTaskField("storyPoints", v)}
                          isInline
                          autoFocus
                        />
                      }
                      handleChange={handleTaskStateUpdate}
                    >
                      <span>{task?.storyPoints || "None"}</span>
                    </InlineEdit>
                  </div>
                </li>
                <li className="w-full flex mb-2">
                  <div className="w-[50%] font-semibold">Stars</div>
                  <div className="w-[50%]">{task?.stargazers?.length}</div>
                </li>

                <li className="w-full flex mb-2">
                  <div className="w-[50%] font-semibold">Labels</div>
                  <div className="w-[50%]">
                    <TagGroup
                      tagsList={task.labels || []}
                      onChange={(tags) =>
                        handleTaskStateUpdate({ ...task, labels: tags })
                      }
                      onTagClick={(val) => {
                        window.open(
                          `${window.location.origin}/${params.workspacePathname}/projects/${params.projectCode}?view=issues&label=${val}`,
                          "_blank"
                        );
                      }}
                    />
                  </div>
                </li>

                <li className="w-full flex mb-2">
                  <div className="w-[50%] font-semibold">Status</div>
                  <div className="w-[50%]">
                    <InlineEdit
                      handleChange={handleTaskStateUpdate}
                      editComponent={
                        <Select
                          selected={task.status}
                          options={TaskStatusOptions}
                          onChange={(v) => updateTaskField("status", v.value)}
                          isInline
                          classname="w-full"
                        />
                      }
                    >
                      <div
                        style={{
                          backgroundColor:
                            TaskStatusIcons[task?.status!].background,
                        }}
                        className="rounded-full px-2 w-fit"
                      >
                        <i
                          className={`${
                            TaskStatusIcons[task?.status!].icon
                          } mr-2`}
                          style={{
                            color: TaskStatusIcons[task?.status!].color,
                          }}
                        />
                        <span>{task?.status}</span>
                      </div>
                    </InlineEdit>
                  </div>
                </li>
              </ul>

              <ul className="">
                <li className="w-full flex mb-2">
                  <div className="w-[50%] font-semibold">Priority</div>
                  <div className="w-[50%]">
                    <InlineEdit
                      handleChange={handleTaskStateUpdate}
                      editComponent={
                        <Select
                          selected={task.priority}
                          options={TaskPriorityOptions}
                          onChange={(v) => updateTaskField("priority", v.value)}
                          isInline
                          classname="w-full"
                        />
                      }
                    >
                      <>
                        <i
                          className={`${
                            TaskPriorityIcons[task?.priority!].icon
                          } mr-2`}
                          style={{
                            color:
                              TaskPriorityIcons[task?.priority!].background,
                          }}
                        />
                        <span>{task?.priority || "None"}</span>
                      </>
                    </InlineEdit>
                  </div>
                </li>
                <li className="w-full flex mb-2">
                  <div className="w-[50%] font-semibold">Fix version</div>
                  <div className="w-[50%]">{task?.fixVersion || "None"}</div>
                </li>
              </ul>
            </div>
          </div>
          <div className="acceptance-criteria-section mt-6">
            <h2 className="font-semibold mb-1">Acceptance Criteria</h2>
            <div className="w-full">
              <TextEditor
                value={task?.acceptanceCriteria}
                placeholder=" Add acceptance criteria..."
                onSave={(val) =>
                  updateTaskDetails(dispatch, taskState.id!, {
                    ...task,
                    acceptanceCriteria: val,
                  })
                }
              />
            </div>
          </div>
          <div className="acceptance-criteria-section mt-6 w-full ">
            <h2 className="font-semibold mb-1">Description</h2>
            <div className="w-full">
              <TextEditor
                value={task?.description}
                placeholder=" Add a description..."
                onSave={(val) =>
                  updateTaskDetails(dispatch, taskState.id!, {
                    ...task,
                    description: val,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="w-[45%] bor text-[13px] h-[calc(100%-82px)] border-l border-gray-300">
          <HorizontalTabs activeTab={activeTabKey} onSelect={handleTabSelect}>
            <Tab tabKey={0} title="Comments">
              <div className="p-4 w-full h-full">
                {task && task.id && <Comments taskId={task.id} />}
              </div>
            </Tab>

            <Tab tabKey={1} title="People">
              <div className="py-8 px-8 w-full">
                <ul className="w-full">
                  <li className="w-full flex mb-8 items-center">
                    <div className="w-[50%] font-semibold">Assignee</div>
                    <div className="w-[50%]">
                      {task?.assigneeEmail ? (
                        <UserDetails userId={task.assigneeEmail} />
                      ) : (
                        "None"
                      )}
                    </div>
                  </li>
                  <li className="w-full flex mb-8 items-center">
                    <div className="w-[50%] font-semibold">Reporter</div>
                    <div className="w-[50%]">
                      <UserDetails userId={task.reporterEmail!} />
                    </div>
                  </li>
                  <li className="w-full flex mb-8 items-center">
                    <div className="w-[50%] font-semibold">QA Contact</div>
                    <div className="w-[50%]">
                      {task?.qaContactEmail ? (
                        <UserDetails userId={task.qaContactEmail} />
                      ) : (
                        "None"
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </Tab>

            <Tab tabKey={2} title="Timelines">
              {task && <TaskTimeline taskId={task.id!} />}
            </Tab>
          </HorizontalTabs>
        </div>
      </div>
    </div>
  );
}
