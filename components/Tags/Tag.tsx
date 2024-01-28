import React from "react";

interface IProps {
  value: string;
  isEditing?: boolean;
  onClose?: () => void;
}

export default function Tag({ value, isEditing, onClose }: IProps) {
  return (
    <span className="py-[2px] px-[4px] rounded-sm cursor-pointer bg-gray-100 hover:bg-gray-200">
      <span className=" text-violet-700">{value}</span>
      {isEditing && (
        <button
          className="hover:text-red-600 font-semibold cursor-pointer ml-[4px]"
          onClick={() => {
            onClose && onClose();
          }}
        >
          ×
        </button>
      )}
    </span>
  );
}
