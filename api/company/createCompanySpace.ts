import { baseAPI } from "..";

export interface CreateCompanySpaceRequest {
  name: string;
  pathname: string;
  invitees: string[];
}

export const createCompanySpace = async (
  request: CreateCompanySpaceRequest
) => {
  const url = "/company/";
  return baseAPI.post(url, request, {
    headers: { "Content-Type": "application/json" },
  });
};
