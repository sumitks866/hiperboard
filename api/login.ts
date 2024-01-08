import { AxiosRequestConfig } from "axios";

import { baseAPI } from ".";

export interface LoginRequest {
  email: string;
  password: string;
  config?: AxiosRequestConfig;
}

export const userLogin = async (request: LoginRequest) => {
  const url = "/user/";
  return baseAPI.post(
    url,
    {
      email: request.email,
      password: request.password,
    },
    { headers: { "Content-Type": "application/json" } }
  );
};
