import { getProjectActivities } from "@/api/project";
import { ITask, ITaskActivity } from "@/utils/types";
import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { getEventObj } from "./tasks/[taskCode]/TaskTimeline";
import Timeline from "@/components/Timeline/Timeline";

interface IProps {
  projectId: string;
}

interface IProjectActivities extends ITaskActivity {
  task: Partial<ITask>;
}

export default function Activities({ projectId }: IProps) {
  const { data } = useQuery(["get-project-acitvities", projectId], () =>
    getProjectActivities(projectId)
  );

  const events = useMemo(
    () => (data?.data || []).map((a: IProjectActivities) => getEventObj(a)),
    [data, data?.data]
  );

  return (
    <div className="py-4 px-32 bg-gray-50 flex flex-col">
      <h1 className="mb-6 text-[20px] font-semibold h-fit">Activity Log</h1>
      <div className="mt-8 mx-auto flex-1 w-full overflow-y-auto">
        <Timeline events={events} />
      </div>
    </div>
  );
}
