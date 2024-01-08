import { AxiosRequestConfig } from "axios";

import { baseAPI } from ".";

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  companyId?: string;
  config?: AxiosRequestConfig;
}

export const userSignup = async (request: SignupRequest) => {
  const url = "/user/create";
  return baseAPI.post(
    url,
    {
      name: request.name,
      email: request.email,
      companyId: request.companyId,
      password: request.password,
    },
    { headers: { "Content-Type": "application/json" } }
  );
};
