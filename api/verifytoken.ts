import { baseAPI } from ".";

export const verifyToken = async (token:string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/user/verify`;
  return fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
