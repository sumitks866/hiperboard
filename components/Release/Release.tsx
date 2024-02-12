import { IRelease } from "@/utils/types";
import React from "react";

interface IProps {
  release: IRelease;
  isExpanded?: boolean;
  showExpandButton?: boolean;
}

export default function Release({
  release,
  isExpanded = true,
  showExpandButton = false,
}: IProps) {
  return <div className="bg-white border rounded-lg p-4 mb-2">Release</div>;
}
