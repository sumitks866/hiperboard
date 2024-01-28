"use client";
/* eslint-disable @next/next/no-img-element */
import { useAppSelector } from "@/lib/store/store";
import { isNull } from "lodash";
import Link from "next/link";
import { AvatarGenerator } from "random-avatar-generator";
import React, { useEffect, useRef, useState } from "react";

const avatarGenerator = new AvatarGenerator();

export default function ProfileButton() {
  const { activeUser } = useAppSelector((state) => state.authReducer);
  const { user } = useAppSelector((state) => state.globalReducer);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // console.log({ activeUser, user });

  if (isNull(activeUser))
    return (
      <Link
        href="/login"
        className="bg-gray-800 text-white px-6 py-2 rounded-full"
      >
        Login
      </Link>
    );

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        <div>
          <img
            src={avatarGenerator.generateRandomAvatar(user?.email)}
            alt={user?.name}
            className={`h-8 mr-2`}
          />
        </div>
        <div>
          <div className="font-medium text-[12px]">{user?.name}</div>
          {/* <div className="text-xs text-gray-300">{user?.email}</div> */}
        </div>
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-3 px-4 py-2 w-60 text-[12px] text-gray-800 bg-white rounded-sm shadow-md border z-10 cursor-default">
          <div className="py-2 mb-1 flex items-center">
            <div>
              <img 
                src={avatarGenerator.generateRandomAvatar(user?.email)}
                alt={user?.name}
                className={`h-8 mr-2`}
              />
            </div>
            <div>
              <div className="font-semibold text-[12px]">{user?.name}</div>
              <div className="text-[11px] text-gray-700">{user?.email}</div>
            </div>
          </div>
          <Link
            href="/profile"
            className="px-2 rounded-md block py-2 hover:bg-gray-100"
          >
            <i className="far fa-user mr-2"></i> Profile
          </Link>
          <a
            href="/home"
            className="px-2 rounded-md block py-2 hover:bg-gray-100"
          >
            <i className="far fa-building mr-2"></i> Workspaces
          </a>
          <Link
            href="/settings"
            className="px-2 rounded-md block py-2 hover:bg-gray-100"
          >
            <i className="fas fa-cog mr-2"></i> Settings
          </Link>
          <a
            href="/"
            className="px-2 border-t rounded-md block py-2 hover:bg-gray-100"
          >
            <i className="fas fa-sign-out-alt mr-2"></i> Logout
          </a>
        </div>
      )}
    </div>
  );
}
