"use client";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import React, { useEffect, useState } from "react";
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

interface IProps {
  value?: string;
  placeholder?: string;
  onSave?: (val: string) => void;
}

export default function TextEditor({ value, placeholder, onSave }: IProps) {
  const [localValue, setLocalValue] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (value) setLocalValue(value);
  }, [value]);

  console.log(localValue);
  return (
    <div className="w-full">
      {isEditing ? (
        <div>
          <ReactQuill
            theme="snow"
            value={localValue}
            onChange={setLocalValue}
          />
          <div className="mt-3">
            <button
              className="border border-gray-800 bg-gray-700 hover:bg-gray-800 text-white py-1 px-4 rounded-sm"
              onClick={() => {
                onSave && onSave(localValue);
                setIsEditing(false);
              }}
            >
              Save
            </button>
            <button
              className="border border-gray-800 py-1 px-4 borde hover:bg-gray-50 rounded-sm ml-4"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div
          className="hover:bg-gray-50 p-2"
          onClick={() => setIsEditing(true)}
        >
          {value ? (
            <div dangerouslySetInnerHTML={{ __html: value }} />
          ) : (
            <div className="text-gray-600 text-[12px]">{placeholder}</div>
          )}
        </div>
      )}
    </div>
  );
}
