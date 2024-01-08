"use client";
import { IUserRole } from "@/utils/types";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import TextInput from "../Input/TextInput";

interface IProps {
  companyRoles: IUserRole[];
}

export default function Workspace({ companyRoles }: IProps) {
  console.log({ companyRoles });

  const [isCreateCompanyModalOpen, setIsCreateCompanyModalOpen] =
    useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>("");
  const [invitees, setInvitees] = useState<string>("");

  if (isEmpty(companyRoles))
    return (
      <>
        <Modal
          isOpen={isCreateCompanyModalOpen}
          onClose={() => setIsCreateCompanyModalOpen(false)}
        >
          <div className="p-4">
            <TextInput
              label="Your company name:"
              value={companyName}
              onChange={(_, val) => setCompanyName(val)}
              classname="w-[400px]"
              placeholder="Enter you company Name"
            />
            <TextInput
              label="Invite people to work with you:"
              value={invitees}
              onChange={(_, val) => setInvitees(val)}
              classname="w-[400px] mt-4"
              placeholder="Enter emails separated by space"
            />
            <button className="bg-gray-700 hover:bg-gray-800 text-white mt-8 w-full rounded-sm py-2">
              Create
            </button>
          </div>
        </Modal>
        <div className="w-full flex flex-col px-6 py-6 items-center text-center justify-center text-gray-700">
          <h1 className="font-semibold text-[28px]">
            Looks like you don&apos;t have any active workspace
            <br />
            Would you like to create one?
          </h1>
          <button
            className="border mt-12 w-fit p-12 rounded-xl border-gray-400 border-dashed"
            onClick={() => setIsCreateCompanyModalOpen(true)}
          >
            <i className="fas fa-plus text-[50px] text-gray-400" />
            <div className="mt-4">Create a company workspace</div>
          </button>
        </div>
      </>
    );

  return <div className="bg-red-200 w-full"></div>;
}
