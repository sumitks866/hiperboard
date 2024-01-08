import { isUndefined } from "lodash";

export const isValidStoryPoint = (point: string) => {
  return ["1", "3", "5", "8", "13", "21"].includes(point);
};

export const isValidString = (str: string | undefined) => {
  if (isUndefined(str)) return 0;
  return str.length > 0;
};
