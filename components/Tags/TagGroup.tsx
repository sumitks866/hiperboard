import React from "react";
import Tag from "./Tag";

interface IProps {
  tagsList: string[];
  classname?: string;
  readonly?: boolean;
}

export default function TagGroup({
  tagsList,
  classname,
  readonly = false,
}: IProps) {
  
  const defaultClassname = `w-full flex py-1 ${!readonly && "hover:bg-gray-50"}`;
  return (
    <div className={classname || defaultClassname}>
      {tagsList.map((tag, id) => (
        <span
          key={id}
          className={id !== 0 && id !== tagsList.length - 1 ? "mx-[4px]" : ""}
        >
          <Tag value={tag} />
        </span>
      ))}
    </div>
  );
}
