import { AxiosRequestConfig } from "axios";

import { baseAPI } from ".";
import { IRelease } from "@/utils/types";

interface CreateProjectRequest {
  name: string;
  manager: string; // username
  companyId: string;
  code: string;
  config?: AxiosRequestConfig;
}

export interface ICreateProjectReleaseRequest extends IRelease {}

export const createProject = async (request: CreateProjectRequest) => {
  const url = "/project/create";
  return baseAPI.post(
    url,
    {
      name: request.name,
      manager: request.manager,
      companyId: request.companyId,
      code: request.code,
    },
    { headers: { "Content-Type": "application/json" } }
  );
};

export const updateProject = async (
  code: string,
  body: Partial<CreateProjectRequest>
) => {
  const url = `/project/${code}`;
  return baseAPI.put(url, body, {
    headers: { "Content-Type": "application/json" },
  });
};

export const getProjectByCode = async (code: string) => {
  const url = `/project/${code}`;
  return baseAPI.get(url);
};

export const getProjectsByCompanyId = async (companyID: string) => {
  const url = `/project/byCompany/${companyID}`;
  return baseAPI.get(url);
};

export const getProjectsByWorkspacePathname = async (pathname: string) => {
  const url = `/project/pathname/${pathname}`;
  return baseAPI.get(url);
};

export const getProjectActivities = async (projectId: string) => {
  const url = `/project/${projectId}/activity`;
  return baseAPI.get(url);
};

export const getProjectReleases = async (projectId: string) => {
  const url = `/project/${projectId}/release`;
  return baseAPI.get(url);
};

export const createProjectRelease = async (
  request: ICreateProjectReleaseRequest
) => {
  const url = `/project/${request.projectId}/release`;
  return baseAPI.post(url, request, {
    headers: { "Content-Type": "application/json" },
  });
};
