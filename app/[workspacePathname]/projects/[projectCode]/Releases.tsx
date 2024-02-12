"use client";
import Modal from "@/components/Modal/Modal";
import CreateRelease from "@/components/Release/CreateRelease";
import Release from "@/components/Release/Release";
import { ReleaseStatusEnum, ReleaseTypeEnum } from "@/utils/enums";
import { IRelease } from "@/utils/types";
import React, { useState } from "react";

const mockRelease: IRelease = {
  version: "1.0.0",
  notes: "this is some sample note",
  targetTasks: [],
  dueDate: "8343 93 402",
  labels: ["first release"],
  status: ReleaseStatusEnum.Planning,
  type: ReleaseTypeEnum.Major,
  projectId: "3u4oi",
};

const releases = [mockRelease, mockRelease, mockRelease, mockRelease];

export default function Releases() {
  const [createReleaseModalOpen, setCreateReleaseModalOpen] =
    useState<boolean>(false);

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
            <Release key={r.version} release={r} />
          ))}
        </div>
      </div>
    </>
  );
}
