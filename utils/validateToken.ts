import { jwtDecode } from "jwt-decode";
import { isUndefined } from "lodash";

export const validateToken = async (token: string): Promise<boolean> => {
  const decodedToken = jwtDecode(token);
  const currentDate = new Date();

  if (
    isUndefined(decodedToken) ||
    isUndefined(decodedToken.exp) ||
    decodedToken.exp * 1000 < currentDate.getTime()
  ) {
    return false;
  }
  return true;

};
