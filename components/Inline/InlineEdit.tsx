/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useRef, useState } from "react";

interface IProps {
  children: React.ReactNode;
  editComponent: React.ReactNode;
  handleChange?: () => void;
}

export default function InlineEdit({
  children,
  editComponent,
  handleChange,
}: IProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsEditing(false);
        setIsHovered(false);
        handleChange && handleChange();
      }
    };

    // const handleEvent = (isEditing: boolean) => {
    if (isEditing) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    // };

    // handleEvent(isEditing);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleChange, isEditing]);

  return (
    <div
      className={`w-full flex justify-between rounded-sm items-center ${
        isEditing ? "border border-gray-300 px-2" : "hover:bg-gray-50"
      }`}
      ref={ref}
    >
      {isEditing ? (
        editComponent
      ) : (
        <div
          className="w-full relative pr-1"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsEditing(true)}
        >
          {children}
        </div>
      )}
      {isHovered && (
        <img
          src="https://img.icons8.com/material-rounded/24/787878/edit--v1.png"
          alt="edit--v1"
          className="h-4"
        />
      )}
    </div>
  );
}
