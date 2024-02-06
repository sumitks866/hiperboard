/* eslint-disable @next/next/no-img-element */
import { IComment } from "@/utils/types";
import React, { useEffect, useRef, useState } from "react";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import { useQuery } from "react-query";
import { getCommentsForTask } from "@/api/task";
import useScrollPosition from "@/hooks/useScrollPosition";
import { isEmpty } from "lodash";

interface ICommentsProps {
  taskId: string;
}

export default function Comments({ taskId }: ICommentsProps) {
  const [comments, setComments] = useState<IComment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const ref = useRef<HTMLDivElement>(null);
  const { atTop, atBottom, scrollTop } = useScrollPosition(ref);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const res = await getCommentsForTask(taskId, page, 10);
      setComments((pre) => [...pre, ...res.data]);
      setPage((p) => p + 1);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onPostCommentSuccess = (comment: IComment) => {
    setComments((pre) => [comment, ...pre]);
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 mt-2">
        <CreateComment taskId={taskId} onSuccess={onPostCommentSuccess} />
      </div>
      {!isLoading && comments.length > 0 && (
        <div className="flex-1 overflow-auto flex flex-col" ref={ref}>
          {comments.map((c: IComment) => (
            <Comment key={c.id} comment={c} />
          ))}
          {comments.length % 10 === 0 && (
            <button
              onClick={fetchComments}
              disabled={isLoading}
              className="border-2 border-black w-fit mx-auto px-4 py-1 my-4 font-medium rounded-sm disabled:bg-gray-200"
            >
              <i className="fa fa-angle-double-down mr-2" />
              <span>{isLoading ? "Loadi ng" : "Load More"}</span>
            </button>
          )}
        </div>
      )}
      {/* {!isLoading && isEmpty(comments) && (
        <img
          width="64"
          height="64"
          src="https://img.icons8.com/external-flat-andi-nur-abdillah/64/external-Empty-empty-state-(flat)-flat-andi-nur-abdillah.png"
          alt="external-Empty-empty-state-(flat)-flat-andi-nur-abdillah"
        />
      )} */}
    </div>
  );
}
