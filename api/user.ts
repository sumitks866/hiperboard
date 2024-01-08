import { baseAPI } from ".";

// export const getCompanyRoles = async () => {
//   const url = "/user/companies";
//   return baseAPI.get(url);
// };

export const getUserDetails = async () => {
  const url = "/user";
  return baseAPI.get(url);
};
