import React from "react";

interface IProps {
  value: string;
  isEditing?: boolean;
  isHighlighted?: boolean;
  onClose?: (value: string) => void;
}

export default function Tag({
  value,
  isEditing,
  onClose,
  isHighlighted,
}: IProps) {
  return (
    <div
      className={`py-[2px] px-[6px] rounded-md cursor-pointer flex ${
        isHighlighted ? "bg-gray-200" : "bg-gray-100"
      } hover:bg-gray-200`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className=" text-violet-700">{value}</div>
      {isEditing && (
        <button
          className="hover:text-red-600 font-semibold cursor-pointer ml-[4px]"
          onClick={() => {
            onClose && onClose(value);
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}
