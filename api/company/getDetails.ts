import { baseAPI } from "..";

export const getCompanyDetails = async (companyId: string | string[]) => {
  const url = "/company/";
  return baseAPI.get(url, {
    params: { id: companyId },
  });
};

export const getWorkspaceDetailByPathname = async (pathname: string) => {
  const url = `/company/${pathname}`;
  return baseAPI.get(url);
};
