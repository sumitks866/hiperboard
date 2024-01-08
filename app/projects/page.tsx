"use client";
import { getProjectsByCompanyId } from "@/api/project";
import CreateTask from "@/components/CreateTask";
import AppLayout from "@/components/Wrappers/AppLayout";
import React from "react";
import { useQuery } from "react-query";

export default function Projects() {
  const id = "567";
  const { isLoading, data, error } = useQuery(["projects", id], () =>
    getProjectsByCompanyId(id)
  );
  return <div>Project List</div>;
}
