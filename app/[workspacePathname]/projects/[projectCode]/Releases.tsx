"use client";
import { getProjectReleases } from "@/api/project";
import Modal from "@/components/Modal/Modal";
import CreateRelease from "@/components/Release/CreateRelease";
import Release from "@/components/Release/Release";
import { ReleaseStatusEnum, ReleaseTypeEnum } from "@/utils/enums";
import { IProject, IRelease, IReleaseResponse } from "@/utils/types";
import React, { useState } from "react";
import { useQuery } from "react-query";

interface IProps {
  project: IProject;
}

export default function Releases({ project }: IProps) {
  const [createReleaseModalOpen, setCreateReleaseModalOpen] =
    useState<boolean>(false);

  const { isLoading, error, data } = useQuery(
    ["project-releases", project?.id],
    () => getProjectReleases(project?.id),
    { staleTime: 150000 }
  );

  const releases: IReleaseResponse[] = data?.data || [];

  return (
    <>
      <Modal
        isOpen={createReleaseModalOpen}
        onClose={() => setCreateReleaseModalOpen(false)}
      >
        <CreateRelease />
      </Modal>
      <div className="w-full mx-auto h-full flex flex-col">
        <div className="w-full flex items-center justify-between px-12 py-6">
          <div>
            <h2 className="text-xl font-semibold">Releases</h2>
          </div>
          <div>
            <button
              className="bg-gray-700 px-4 text-[14px] hover:bg-gray-800 text-white rounded-md py-2"
              onClick={() => setCreateReleaseModalOpen(true)}
            >
              <span>New Release</span>
              <i className="ml-2 fas fa-rocket text-[13px]" />
            </button>
          </div>
        </div>

        <div className="w-full flex-1 p-8 bg-gray-100 overflow-auto">
          {releases.map((r) => (
            <Release key={r.id} release={r} />
          ))}
        </div>
      </div>
    </>
  );
}
