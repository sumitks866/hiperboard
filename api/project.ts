import { AxiosRequestConfig } from "axios";

import { baseAPI } from ".";

interface CreateProjectRequest {
  name: string;
  manager: string; // username
  companyId: string;
  code: string;
  config?: AxiosRequestConfig;
}

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
