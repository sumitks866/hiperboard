/* eslint-disable @next/next/no-img-element */
"use client";
import { useAppSelector } from "@/lib/store/store";
import { NavigatorOptions } from "@/utils/types";
import { isNull } from "lodash";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AvatarGenerator } from "random-avatar-generator";
import React from "react";

const options: NavigatorOptions[] = [
  { name: "Projects", route: "projects", icon: "far fa-folder" },
  { name: "Assigned to Me", route: "assigned-to-me", icon: "far fa-user" },
  { name: "Mentions", route: "mentions", icon: "fas fa-at" },
  { name: "Activities", route: "activities", icon: "far fa-chart-bar" },
  { name: "Starred", route: "starred", icon: "far fa-star" },
  // { name: "Profile", route: "/profile", icon: "far fa-user-circle" },
];

export default function UserNavigator() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  const { activeUser } = useAppSelector((state) => state.authReducer);
  const user = activeUser;

  if (isNull(user)) return null;

  const avatarGenerator = new AvatarGenerator();

  return (
    <div className="px-2 flex flex-col">
      <div className="font-bold px-4 flex items-center text-lg whitespace-no-wrap overflow-hidden overflow-ellipsis py-6">
        <img
          src={avatarGenerator.generateRandomAvatar(user.username)}
          alt={user.name}
          className={`h-12 mr-4`}
        />
        {user.name}
      </div>
      <ul className="pt-8">
        {options.map((option) => (
          <Link href={`/home?view=${option.route}`} key={option.name}>
            <li
              className={`py-2 my-1 rounded-md px-2 text-sm hover:bg-gray-200 ${
                view === option.route ? "bg-gray-300 hover:bg-gray-300" : ""
              }`}
            >
              <i className={`mr-2 ${option.icon}`}></i>
              {option.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
