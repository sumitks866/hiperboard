"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import Tag from "./Tag";

interface IProps {
  tagsList: string[];
  classname?: string;
  readonly?: boolean;
  onChange?: (tags: string[]) => void;
}

export default function TagGroup({
  tagsList,
  classname,
  readonly = false,
  onChange,
}: IProps) {
  const [localTags, setLocalTags] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTagName, setNewTagName] = useState<string>("");
  const [highlightLastTag, setHighlightLastTag] = useState<boolean>(false);
  const backspaceCountRef = useRef(0);

  const handleChange = () => {
    setIsEditing(false);
    onChange && onChange(localTags);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      if (newTagName.trim()) {
        setLocalTags((pre) => [...pre, newTagName.trim()]);
        setNewTagName("");
      }
    } else if (e.key === "Backspace" && newTagName == "") {
      backspaceCountRef.current += 1;
      if (backspaceCountRef.current === 1) {
        setHighlightLastTag(true);
      } else if (backspaceCountRef.current === 2) {
        setLocalTags((pre) => pre.slice(0, -1));
        setHighlightLastTag(false);
        backspaceCountRef.current = 0;
      }
    }
  };

  useEffect(() => {
    setLocalTags(tagsList);
  }, [tagsList]);

  return (
    <div
      className={`w-full flex items-center min-h-8 overflow-y-auto justify-between ${
        !isEditing ? "hover:bg-gray-50" : "border"
      }`}
      onClick={() => setIsEditing(true)}
    >
      <div className="w-full flex flex-wrap">
        {localTags.length > 0 || isEditing ? (
          <>
            {" "}
            {localTags.map((tag, id) => (
              <div key={id} className="mx-1 my-1">
                <Tag
                  value={tag}
                  isEditing={isEditing}
                  isHighlighted={
                    highlightLastTag && id === localTags.length - 1
                  }
                  onClose={(value) =>
                    setLocalTags((pre) => pre.filter((t) => t !== value))
                  }
                />
              </div>
            ))}
            {isEditing && (
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="Add label"
                className="w-[100px] focus:outline-none pl-1"
                onKeyDown={(e) => handleInputKeyPress(e)}
                autoFocus
              />
            )}
          </>
        ) : (
          <div className="mx-1 text-gray-500">None</div>
        )}
      </div>

      {!readonly && isEditing && (
        <div
          className="w-fit flex items-center justify-center mx-1"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="w-fit mr-3" onClick={handleChange}>
            <img
              src="https://img.icons8.com/color/48/checkmark--v1.png"
              alt="checkmark--v1"
              className="h-4 w-6"
            />
          </button>

          <button className="w-fit" onClick={handleClose}>
            <img
              src="https://img.icons8.com/color/48/delete-sign--v1.png"
              alt="checkmark--v1"
              className="h-4 w-6"
            />
          </button>
        </div>
      )}
    </div>
  );
}
