"use client";
import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import CreateProject from "./CreateProject";
import { AppDispatch, useAppSelector } from "@/lib/store/store";
import { getProjectsByCompanyId } from "@/api/project";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { updateProjectList } from "@/lib/store/projects/projectSlice";
import { isUndefined } from "lodash";
import Table from "../Table/Table";
import Thead from "../Table/Thead";
import Trow from "../Table/Trow";
import Tdata from "../Table/Tdata";
import Tbody from "../Table/Tbody";
import { IProject, IWorkspace } from "@/utils/types";
import Link from "next/link";
import { useParams } from "next/navigation";

interface IProps {}

export default function ProjectList({}: IProps) {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const [createProjectModalOpen, setCreateProjectModalOpen] =
    useState<boolean>(false);
  const { projectList } = useAppSelector((state) => state.projectReducer);
  const { activeCompany } = useAppSelector((state) => state.globalReducer);
  const { isLoading, data, error, refetch } = useQuery(
    ["projects", activeCompany?.id],
    () => getProjectsByCompanyId(activeCompany?.id!)
  );

  useEffect(() => {
    if (isUndefined(data)) return;
    dispatch(updateProjectList(data?.data));
  }, [data, data?.data, dispatch]);

  const handleSuccess = () => {
    setCreateProjectModalOpen(false);
    refetch();
  };

  return (
    <>
      <Modal
        isOpen={createProjectModalOpen}
        onClose={() => setCreateProjectModalOpen(false)}
      >
        <CreateProject onSuccess={handleSuccess} />
      </Modal>
      <div className="w-full text-[12px]">
        <div className="w-full px-2 flex items-center justify-between">
          <div>
            <h2 className="mb-4 font-semibold text-[20px]">Projects</h2>
          </div>
          <div>
            <button
              className="bg-gray-700 px-4 text-[14px] hover:bg-gray-800 text-white mt-2 rounded-sm py-2"
              onClick={() => setCreateProjectModalOpen(true)}
            >
              Create Project
            </button>
          </div>
        </div>
        <div className="w-full my-6">
          <Table>
            <Thead>
              <Trow>
                <Tdata>Code</Tdata>
                <Tdata>Project Name</Tdata>
                <Tdata>Manager</Tdata>
                <Tdata>Actions</Tdata>
              </Trow>
            </Thead>
            <Tbody>
              {projectList.map((p) => (
                <Trow key={p.id}>
                  <Tdata>{p.code}</Tdata>
                  <Tdata>
                    <Link
                      href={`/${params.workspacePathname}/projects/${p.code}`}
                      className="text-blue-600 hover:underline"
                    >
                      {p.name}
                    </Link>
                  </Tdata>
                  <Tdata>{p.manager}</Tdata>
                  <Tdata>
                    <div className="flex">
                      <button>
                        <i className="fa fa-trash hover:text-red-600" />
                      </button>
                      <button>
                        <i className="fa fa-cog ml-2 hover:text-blue-600" />
                      </button>
                    </div>
                  </Tdata>
                </Trow>
              ))}
            </Tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
