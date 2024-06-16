import React from "react";

interface IProps {
  progress: number;
}

export default function ProgressBar({ progress }: IProps) {
  return (
    <div className="w-full bg-gray-300 rounded-full overflow-hidden flex h-2">
      <div className="bg-[#32cd32] rounded-full" style={{ width: `${progress}%` }}></div>

      <div className="" style={{ width: `${100 - progress}%` }}></div>
    </div>
  );
}
