import { AxiosRequestConfig } from "axios";

import { baseAPI } from ".";

interface CreateProjectRequest {
  name: string;
  manager: string; // username
  companyId?: string;
  config?: AxiosRequestConfig;
}

export const createProject = async (request: CreateProjectRequest) => {
  const url = "/project/create";
  return baseAPI.post(
    url,
    {
      name: request.name,
      manager: request.manager,
      companyId: request.manager,
    },
    { headers: { "Content-Type": "application/json" } }
  );
};

export const getProjectById = async (projectID: string) => {
  const url = `/project/${projectID}`;
  return baseAPI.get(url);
};

export const getProjectsByCompanyId = async (companyID: string) => {
  const url = `/project/byCompany/${companyID}`;
  return baseAPI.get(url);
};
