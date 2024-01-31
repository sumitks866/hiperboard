import { useAppSelector } from "@/lib/store/store";
import { isNull } from "lodash";
import React, { useState, useEffect, useRef } from "react";

export default function NotificationButton() {
  const { activeUser } = useAppSelector((state) => state.authReducer);
  const { user } = useAppSelector((state) => state.globalReducer);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isNull(activeUser)) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <i
        className={`far fa-bell text-[13px] cursor-pointer hover:bg-black p-2 rounded-full`}
        onClick={toggleDropdown}
      />
      {isDropdownOpen && (
        <div className="absolute right-0 mt-3 w-52 italic text-center bg-white text-gray-800 rounded-sm p-4 shadow-lg z-10">
          All caught up!
        </div>
      )}
    </div>
  );
}
