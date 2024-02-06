/* eslint-disable @next/next/no-img-element */
import { IComment } from "@/utils/types";
import { formatDate } from "@/utils/utilities";
import { AvatarGenerator } from "random-avatar-generator";
import React, { useState } from "react";

interface ICommentProps {
  comment: IComment;
}

const avatarGenerator = new AvatarGenerator();

export default function Comment({ comment }: ICommentProps) {
  const truncateLength = 300;
  const truncComment = comment.content.slice(0, truncateLength);
  const [showFullComment, setShowFullComment] = useState(
    truncComment.length === comment.content.length
  );

  const toggleShowMore = () => {
    setShowFullComment(!showFullComment);
  };

  return (
    <div className="mb-2 px-4 py-2 shadow-sm bg-[#f7f9fa] rounded-md">
      <div className="comment-metadata flex items-center mb-2 text-[12px] justify-between">
        <div className="comment-username font-semibold text-gray-800 flex items-center">
          <img
            src={avatarGenerator.generateRandomAvatar(comment.userEmail)}
            alt={comment.userEmail}
            className={`h-5 mr-2`}
          />
          <span>{comment.userEmail}</span>
        </div>
        <div className="comment-date text-gray-600 text-[11px]">
          {comment.editedAt && "Edited . "}
          {formatDate(comment.createdAt)}
        </div>
      </div>
      <div className="comment-body">
        {showFullComment ? comment.content : `${truncComment}... `}
        {comment.content.length > truncateLength && (
          <button
            onClick={toggleShowMore}
            className="text-blue-600 hover:underline focus:outline-none font-medium"
          >
            {showFullComment ? " Show Less" : " Show More"}
          </button>
        )}
      </div>
    </div>
  );
}
