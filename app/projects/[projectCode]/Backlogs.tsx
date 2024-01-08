import BacklogIssueCard from "@/components/Cards/BacklogIssueCard";
import { mockTasks } from "@/utils/mock";
import React from "react";

export default function Backlogs() {
  const tasks = mockTasks;
  return (
    <div className="w-full mx-auto bg-[#F5F5F5] min-h-full px-8 py-2">
      <h2 className="py-6 text-xl font-semibold">Backlogs</h2>
      <hr className="border-gray-400" />
      <div className="w-full mt-4">
        {tasks.map((task) => (
          <BacklogIssueCard key={task.taskCode} task={task} />
        ))}
      </div>
    </div>
  );
}
