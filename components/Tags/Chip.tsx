import React from "react";

interface IProps {
  value?: string;
  unread?: boolean;
  classname?: string;
}

export default function Chip({ value, unread, classname }: IProps) {
  return (
    <div
      className={`${
        unread ? "bg-blue-500 text-white" : "bg-[#F0F1F1] text-black"
      } px-2 w-fit flex items-center justify-center text-center rounded-lg font-semibold ${classname}`}
    >
      {value || "?"}
    </div>
  );
}
