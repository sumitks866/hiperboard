/* eslint-disable @next/next/no-img-element */
import Comments from "@/components/Comments/Comments";
import Select from "@/components/Select/Select";
import HorizontalTabs from "@/components/Tabs/HorizontalTabs";
import Tab from "@/components/Tabs/Tab";
import { TaskPriority, TaskType } from "@/utils/enums";
import { mockComments, mockProjects, mockTasks } from "@/utils/mock";
import {
  IProject,
  ITask,
  TaskPriorityIcons,
  TaskStatusIcons,
  TaskTypeIcons,
} from "@/utils/types";
import { AvatarGenerator } from "random-avatar-generator";
import React, { useState } from "react";

interface IProps {
  taskCode: string;
}

const getTask = (taskCode: string): ITask | undefined => {
  return mockTasks.find((t) => t.taskCode === taskCode);
};

export function UserDetails(userId: string): React.JSX.Element {
  const avatarGenerator = new AvatarGenerator();

  return (
    <div className="flex items-center">
      <img
        src={avatarGenerator.generateRandomAvatar(userId)}
        alt={userId}
        className={`h-8 mr-2`}
      />
      <span>{userId}</span>
    </div>
  );
}

export default function TaskDetails({ taskCode }: IProps) {
  const task = getTask(taskCode);
  const [activeTabKey, setActiveTabKey] = useState<string | number>(0);

  const handleTabSelect = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tabKey: string | number
  ) => {
    setActiveTabKey(tabKey);
  };

  return (
    <div className="w-full overflow-hidden h-full">
      <div className="w-full py-6 px-4">
        <h1 className="text-[22px]">
          <span className="font-semibold mr-2">{task?.taskCode}</span>{" "}
          <span>{task?.title}</span>
        </h1>
      </div>
      <hr />
      <div className="w-full flex h-full">
        <div className="w-[55%] h-[calc(100%-82px)] overflow-y-auto py-4 px-6">
          <div className="task-details-section w-full">
            <h2 className="font-semibold mb-4">Details</h2>
            <div className="w-full grid grid-cols-2 gap-12 text-[13px]">
              <ul className="">
                <li className="w-full flex pb-2">
                  <div className="w-[50%] font-semibold">Type</div>
                  <div className="w-[50%]">
                    <i
                      className={`${
                        TaskTypeIcons[task?.type || TaskType.EPIC].icon
                      } mr-2`}
                      style={{
                        color: TaskTypeIcons[task?.type || TaskType.EPIC].color,
                      }}
                    />
                    <span>{task?.type}</span>
                  </div>
                </li>
                <li className="w-full flex mb-2">
                  <div className="w-[50%] font-semibold">Story Points</div>
                  <div className="w-[50%]">{task?.storyPoints || "None"}</div>
                </li>
                <li className="w-full flex mb-2">
                  <div className="w-[50%] font-semibold">Stars</div>
                  <div className="w-[50%]">{task?.stargazers.length}</div>
                </li>

                <li className="w-full flex mb-2">
                  <div className="w-[50%] font-semibold">Labels</div>
                  <div className="w-[50%]">{task?.labels || "None"}</div>
                </li>

                <li className="w-full flex mb-2">
                  <div className="w-[50%] font-semibold">Status</div>
                  <div className="w-[50%]">
                    <i
                      className={`${TaskStatusIcons[task?.status!].icon} mr-2`}
                      style={{
                        color: TaskStatusIcons[task?.status!].color,
                      }}
                    />
                    <span>{task?.status}</span>
                  </div>
                </li>
              </ul>

              <ul className="">
                <li className="w-full flex mb-2">
                  <div className="w-[50%] font-semibold">Priority</div>
                  <div className="w-[50%]">
                    <i
                      className={`${
                        TaskPriorityIcons[
                          task?.priority || TaskPriority.UNASSIGNED
                        ].icon
                      } mr-2`}
                      style={{
                        color:
                          TaskPriorityIcons[
                            task?.priority || TaskPriority.UNASSIGNED
                          ].background,
                      }}
                    />
                    <span>{task?.priority || "None"}</span>
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
            <h2 className="font-semibold mb-2">Acceptance Criteria</h2>
            <span className="text-[13px]">{task?.acceptanceCriteria}</span>
          </div>
          <div className="acceptance-criteria-section mt-6">
            <h2 className="font-semibold mb-2">Description</h2>
            <span className="text-[13px]">{task?.description}</span>
          </div>
        </div>
        <div className="w-[45%] border-l text-[13px] h-[calc(100%-82px)]">
          <HorizontalTabs activeTab={activeTabKey} onSelect={handleTabSelect}>
            <Tab tabKey={0} title="Comments">
              <div className="p-4">
                <Comments comments={mockComments} />
              </div>
            </Tab>

            <Tab tabKey={1} title="People">
              <div className="py-8 px-8 w-full">
                <ul className="w-full">
                  <li className="w-full flex mb-8 items-center">
                    <div className="w-[50%] font-semibold">Assignee</div>
                    <div className="w-[50%]">
                      {task?.assigneeId
                        ? UserDetails(task?.assigneeId)
                        : "None"}
                    </div>
                  </li>
                  <li className="w-full flex mb-8 items-center">
                    <div className="w-[50%] font-semibold">Reporter</div>
                    <div className="w-[50%]">
                      {UserDetails(task?.reporterId!)}
                    </div>
                  </li>
                  <li className="w-full flex mb-8 items-center">
                    <div className="w-[50%] font-semibold">QA Contact</div>
                    <div className="w-[50%]">
                      {task?.qaContactId
                        ? UserDetails(task?.qaContactId!)
                        : "None"}
                    </div>
                  </li>
                </ul>
              </div>
            </Tab>

            <Tab tabKey={2} title="Timelines">
              <div>Timelines</div>
            </Tab>
          </HorizontalTabs>
        </div>
      </div>
    </div>
  );
}
