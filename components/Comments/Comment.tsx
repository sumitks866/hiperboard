/* eslint-disable @next/next/no-img-element */
import { IComment } from "@/utils/types";
import { formatDate } from "@/utils/utilities";
import { AvatarGenerator } from "random-avatar-generator";
import React from "react";

interface ICommentProps {
  comment: IComment;
}

export default function Comment({ comment }: ICommentProps) {
  const avatarGenerator = new AvatarGenerator();
  return (
    <div className="mb-2 px-4 py-2 shadow-sm bg-gray-50">
      <div className="comment-metadata flex items-center mb-2 text-[12px] justify-between">
        <div className="comment-username font-semibold text-gray-800 flex items-center">
          <img
            src={avatarGenerator.generateRandomAvatar(comment.userId)}
            alt={comment.userId}
            className={`h-5 mr-2`}
          />
          <span>@{comment.userId}</span>
        </div>
        <div className="comment-date text-gray-600 text-[11px]">
          {comment.editedAt && "Edited . "}
          {formatDate(comment.createdAt)}
        </div>
      </div>
      <div className="comment-body">{comment.content}</div>
    </div>
  );
}
