import { IComment } from "@/utils/types";
import React from "react";
import Comment from "./Comment";

interface ICommentsProps {
  comments: IComment[];
}

export default function Comments({ comments }: ICommentsProps) {
  return (
    <div>
      {comments.map((c) => (
        <Comment key={c.id} comment={c} />
      ))}
    </div>
  );
}
