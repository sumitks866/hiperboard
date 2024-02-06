import { getActivityLogs } from "@/api/task";
import Timeline from "@/components/Timeline/Timeline";
import {
  renderEventContent,
  renderEventIcon,
} from "@/components/Timeline/TimelineUtils";
import { IEvent, ITask, ITaskActivity } from "@/utils/types";
import { formatDate } from "@/utils/utilities";
import React, { useMemo } from "react";
import { useQuery } from "react-query";

interface IProps {
  taskId: string;
}

export const getEventObj = (activity: ITaskActivity): IEvent => {
  return {
    id: activity._id,
    content: renderEventContent(activity),
    eventIcon: renderEventIcon(activity),
    time: formatDate(activity.timestamp),
  };
};

export default function TaskTimeline({ taskId }: IProps) {
  const { isLoading, error, data } = useQuery(
    ["task-activity", taskId],
    () => getActivityLogs(taskId),
    { staleTime: 150000 }
  );

  const events = useMemo(
    () => (data?.data || []).map((a: ITaskActivity) => getEventObj(a)),
    [data, data?.data]
  );

  console.log({ events });

  return (
    <div className="w-full h-full p-4 bg-gray-50 flex flex-col">
      {/* <h1 className="mb-6 text-[18px] px-12 font-semibold">Activity Log</h1> */}
      <div className="mt-8 px-12 mx-auto overflow-y-auto">
        <Timeline events={events} />
      </div>
    </div>
  );
}
