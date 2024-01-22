import React from "react";

interface IProps {
  tagsList: string[];
  classname?: string;
}

export default function TagGroup({ tagsList, classname }: IProps) {
  return (
    <div className={classname || ''}>
      {tagsList.map((tag, id) => (
        <span key={id}>{tag}</span>
      ))}
    </div>
  );
}
