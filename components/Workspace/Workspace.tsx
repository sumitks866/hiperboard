"use client";
import { IWorkspace, IUserRole } from "@/utils/types";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import WorkspaceDetailsCard from "../Cards/WorkspaceDetailsCard";
import Table from "../Table/Table";
import Thead from "../Table/Thead";
import Trow from "../Table/Trow";
import Tbody from "../Table/Tbody";
import Tdata from "../Table/Tdata";
import CreateWorkspace from "./CreateWorkspace";

interface IProps {
  companyRoles: IUserRole[];
  companyIDMap: { [key: string]: IWorkspace };
}

export default function Workspace({ companyRoles, companyIDMap }: IProps) {
  const [isCreateCompanyModalOpen, setIsCreateCompanyModalOpen] =
    useState<boolean>(false);

  const createCompanyModal = (
    <Modal
      isOpen={isCreateCompanyModalOpen}
      onClose={() => setIsCreateCompanyModalOpen(false)}
    >
      <CreateWorkspace
        onCreateSuccess={() => setIsCreateCompanyModalOpen(false)}
      />
    </Modal>
  );

  const createWorkspaceBtn = (
    <button
      className="border w-64 h-44 m-4 p-12 rounded-xl border-gray-400 border-dashed"
      onClick={() => setIsCreateCompanyModalOpen(true)}
    >
      <i className="fas fa-plus text-[45px] text-gray-400" />
      <div className="mt-2">Create a company workspace</div>
    </button>
  );

  if (isEmpty(companyRoles))
    return (
      <>
        {createCompanyModal}
        <div className="w-full flex flex-col px-6 py-6 items-center text-center justify-center text-gray-700">
          <h1 className="font-semibold text-[28px]">
            Looks like you don&apos;t have any active workspace
            <br />
            Would you like to create one?
          </h1>
          {createWorkspaceBtn}
        </div>
      </>
    );

  return (
    <div className="w-full">
      {createCompanyModal}
      <div className="w-full px-2 flex items-center justify-between">
        <div>
          <h2 className="mb-4 font-semibold text-[20px]">Workspaces</h2>
        </div>
        <div>
          <button
            className="bg-gray-700 px-4 text-[14px] hover:bg-gray-800 text-white mt-2 rounded-sm py-2"
            onClick={() => setIsCreateCompanyModalOpen(true)}
          >
            Create New Workspace
          </button>
        </div>
      </div>
      <div className="mt-8">
        <Table>
          <Thead>
            <Trow>
              <Tdata>Workspaces</Tdata>
            </Trow>
          </Thead>
          <Tbody>
            {companyRoles.map((c) => (
              <Trow key={c.companyId}>
                <Tdata>
                  <WorkspaceDetailsCard
                    workspace={companyIDMap[c.companyId] || {}}
                  />
                </Tdata>
              </Trow>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
}
