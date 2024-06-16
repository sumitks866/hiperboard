import React from "react";

interface IProps {
  display: "list" | "grid";
  onChange: (display: "list" | "grid") => void;
}

export default function Display({ display, onChange }: IProps) {
  return (
    <fieldset className="flex gap-1">
      <button
        onClick={() => onChange("list")}
        className={`hover:bg-gray-300 ${
          display === "list" && "bg-gray-300"
        } rounded-sm px-4 py-1`}
      >
        <i className="fas fa-list" />
      </button>
      <button
        onClick={() => onChange("grid")}
        className={`hover:bg-gray-300 ${
          display === "grid" && "bg-gray-300"
        } rounded-sm px-4 py-1`}
      >
        <i className="fas fa-border-all" />
      </button>
    </fieldset>
  );
}
