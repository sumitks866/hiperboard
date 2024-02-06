import { AxiosRequestConfig } from "axios";

import { baseAPI } from ".";

export interface PostCommentRequest {
  taskId: string;
  content: string;
}

export const postComment = async (request: PostCommentRequest) => {
  const url = "/comment/";
  return baseAPI.post(url, request, {
    headers: { "Content-Type": "application/json" },
  });
};
