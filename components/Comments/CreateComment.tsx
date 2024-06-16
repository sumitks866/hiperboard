/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import TextArea from "../Input/TextArea";
import TextareaAutosize from "react-textarea-autosize";
import { AvatarGenerator } from "random-avatar-generator";
import { useAppSelector } from "@/lib/store/store";
import { postComment } from "@/api/comment";
import { IComment } from "@/utils/types";
import { isEmpty } from "lodash";

const avatarGenerator = new AvatarGenerator();

interface IProps {
  taskId: string;
  onSuccess?: (comment: IComment) => void;
}

export default function CreateComment({ taskId, onSuccess }: IProps) {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.globalReducer);

  const onPostComment = async () => {
    setIsLoading(true);
    try {
      const res = await postComment({ taskId, content });
      onSuccess && onSuccess(res.data.comment);
      setContent("");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const isPostBtnDisabled = isLoading || isEmpty(content);

  return (
    <div className="w-full flex">
      <img
        src={avatarGenerator.generateRandomAvatar(user?.email)}
        alt={user?.name}
        className={`h-8 mr-2`}
      />
      <TextareaAutosize
        className="flex-1 focus:outline-none p-2 border-2 border-gray-500 rounded-md"
        placeholder="Add a comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isLoading}
        maxRows={8}
      />
      <button
        className="bg-gray-700 hover:bg-black px-3 py-2 rounded-md h-fit ml-3"
        onClick={onPostComment}
        disabled={isPostBtnDisabled}
      >
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className="transform rotate-90 text-white"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4.75 19.25L12 4.75L19.25 19.25L12 15.75L4.75 19.25Z"
          />
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 15.5V12.75"
          />
        </svg>
      </button>
    </div>
  );
}
