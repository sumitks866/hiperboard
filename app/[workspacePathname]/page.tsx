import ProjectList from "@/components/Project/ProjectList";
import AppLayout from "@/components/Wrappers/AppLayout";
import React from "react";

export default function page() {
  return (
    <AppLayout>
      <div className="w-full mx-auto min-h-full flex p-4 bg-white text-[12px]">
        <ProjectList />
      </div>
    </AppLayout>
  );
}
