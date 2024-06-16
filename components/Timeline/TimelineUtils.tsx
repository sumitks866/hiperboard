/* eslint-disable @next/next/no-img-element */
import { ActivityType } from "@/utils/enums";
import { ITaskActivity } from "@/utils/types";
import { formatDate } from "@/utils/utilities";
import { AvatarGenerator } from "random-avatar-generator";

const avatarGenerator = new AvatarGenerator();

export const renderEventIcon = (activity: ITaskActivity): React.ReactNode => {
  switch (activity.type) {
    case ActivityType.TaskCreated: {
      return (
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className="text-white"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M11.25 19.25H7.75C6.64543 19.25 5.75 18.3546 5.75 17.25V6.75C5.75 5.64543 6.64543 4.75 7.75 4.75H14L18.25 9V11.25"
          ></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M17 14.75V19.25"
          ></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M19.25 17L14.75 17"
          ></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M18 9.25H13.75V5"
          ></path>
        </svg>
      );
    }
    case ActivityType.AssigneeAdded: {
      return (
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className="text-white"
        >
          <circle
            cx="12"
            cy="8"
            r="3.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          ></circle>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12.25 19.25H6.94953C5.77004 19.25 4.88989 18.2103 5.49085 17.1954C6.36247 15.7234 8.23935 14 12.25 14"
          ></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M17 14.75V19.25"
          ></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M19.25 17L14.75 17"
          ></path>
        </svg>
      );
    }
    case ActivityType.CommentAdded: {
      return (
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className="text-white"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 18.25C15.5 18.25 19.25 16.5 19.25 12C19.25 7.5 15.5 5.75 12 5.75C8.5 5.75 4.75 7.5 4.75 12C4.75 13.0298 4.94639 13.9156 5.29123 14.6693C5.50618 15.1392 5.62675 15.6573 5.53154 16.1651L5.26934 17.5635C5.13974 18.2547 5.74527 18.8603 6.43651 18.7307L9.64388 18.1293C9.896 18.082 10.1545 18.0861 10.4078 18.1263C10.935 18.2099 11.4704 18.25 12 18.25Z"
          ></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.5 12C9.5 12.2761 9.27614 12.5 9 12.5C8.72386 12.5 8.5 12.2761 8.5 12C8.5 11.7239 8.72386 11.5 9 11.5C9.27614 11.5 9.5 11.7239 9.5 12Z"
          ></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.5 12C12.5 12.2761 12.2761 12.5 12 12.5C11.7239 12.5 11.5 12.2761 11.5 12C11.5 11.7239 11.7239 11.5 12 11.5C12.2761 11.5 12.5 11.7239 12.5 12Z"
          ></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.5 12C15.5 12.2761 15.2761 12.5 15 12.5C14.7239 12.5 14.5 12.2761 14.5 12C14.5 11.7239 14.7239 11.5 15 11.5C15.2761 11.5 15.5 11.7239 15.5 12Z"
          ></path>
        </svg>
      );
    }
    case ActivityType.DescriptionChanged: {
      return (
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className="text-white"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25V9L14 4.75H7.75C6.64543 4.75 5.75 5.64543 5.75 6.75V17.25C5.75 18.3546 6.64543 19.25 7.75 19.25Z"
          ></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M18 9.25H13.75V5"
          ></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9.75 15.25H14.25"
          ></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9.75 12.25H14.25"
          ></path>
        </svg>
      );
    }
    case ActivityType.StatusChanged: {
      return (
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className="text-white"
        >
          <circle
            cx="12"
            cy="12"
            r="7.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          ></circle>
          <circle
            cx="12"
            cy="12"
            r="4.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          ></circle>
          <circle
            cx="12"
            cy="12"
            r="1.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          ></circle>
        </svg>
      );
    }
    case ActivityType.PriorityChanged: {
      return (
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className="text-white"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M5.75 19.25L5.75 13.25M5.75 13.25L5.75 5.75C5.75 5.75 8.5 3.5 12 5.75C15.5 8 18.25 5.75 18.25 5.75L18.25 13.25C18.25 13.25 15.5 15.5 12 13.25C8.5 11 5.75 13.25 5.75 13.25Z"
          ></path>
        </svg>
      );
    }
    case ActivityType.RelatedTaskAdded: {
      return (
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className="text-white"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M11.25 19.25H7.75C6.64543 19.25 5.75 18.3546 5.75 17.25V6.75C5.75 5.64543 6.64543 4.75 7.75 4.75H14L18.25 9V11.25"
          ></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M17 14.75V19.25"
          ></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M19.25 17L14.75 17"
          ></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M18 9.25H13.75V5"
          ></path>
        </svg>
      );
    }
    default:
      return <></>;
  }
};

export const getUserLabel = (email: string) => {
  return (
    <div className="flex items-center">
      <img
        src={avatarGenerator.generateRandomAvatar(email)}
        alt={email}
        className={`h-6`}
      />
      <div className="ml-2 font-semibold">{email}</div>
    </div>
  );
};

export const renderEventContent = (
  activity: ITaskActivity
): React.ReactNode => {
  switch (activity.type) {
    case ActivityType.TaskCreated: {
      return (
        <div>
          <div className="flex items-center">
            <div>{getUserLabel(activity.actorEmail)}</div>
            <div className="p-[2px] mx-2 rounded-full bg-gray-500" />
            <div className="text-[11px] font-medium">
              {formatDate(activity.timestamp)}
            </div>
          </div>
          <div className="mt-3">{`Created this task`}</div>
        </div>
      );
    }
    case ActivityType.AssigneeAdded: {
      return (
        <div>
          <div className="flex items-center">
            <div>{getUserLabel(activity.actorEmail)}</div>
            <div className="p-[2px] mx-2 rounded-full bg-gray-500" />
            <div className="text-[11px] font-medium">
              {formatDate(activity.timestamp)}
            </div>
          </div>
          <div className="mt-3">{`Assigned ${activity.data?.assigneeEmail}`}</div>
        </div>
      );
    }
    case ActivityType.CommentAdded: {
      return (
        <div>
          <div className="flex items-center">
            <div>{getUserLabel(activity.actorEmail)}</div>
            <div className="p-[2px] mx-2 rounded-full bg-gray-500" />
            <div className="text-[11px] font-medium">
              {formatDate(activity.timestamp)}
            </div>
          </div>
          <div className="mt-3">
            {`Added a new comment ${activity.data?.commentId}`}
          </div>
        </div>
      );
    }
    case ActivityType.DescriptionChanged: {
      return (
        <div>
          <div className="flex items-center">
            <div>{getUserLabel(activity.actorEmail)}</div>
            <div className="p-[2px] mx-2 rounded-full bg-gray-500" />
            <div className="text-[11px] font-medium">
              {formatDate(activity.timestamp)}
            </div>
          </div>
          <div className="mt-3">{`Updated the issue description`}</div>
        </div>
      );
    }
    case ActivityType.StatusChanged: {
      return (
        <div>
          <div className="flex items-center">
            <div>{getUserLabel(activity.actorEmail)}</div>
            <div className="p-[2px] mx-2 rounded-full bg-gray-500" />
            <div className="text-[11px] font-medium">
              {formatDate(activity.timestamp)}
            </div>
          </div>
          <div className="mt-3">
            {`Updated the task status to `} <b>{activity.data?.status}</b>
          </div>
        </div>
      );
    }
    case ActivityType.PriorityChanged: {
      return (
        <div>
          <div className="flex items-center">
            <div>{getUserLabel(activity.actorEmail)}</div>
            <div className="p-[2px] mx-2 rounded-full bg-gray-500" />
            <div className="text-[11px] font-medium">
              {formatDate(activity.timestamp)}
            </div>
          </div>
          <div className="mt-3">
            {`${activity.actorEmail} updated priority to `}
            <b>{activity.data?.priority}</b>
          </div>
        </div>
      );
    }
    case ActivityType.RelatedTaskAdded: {
      return (
        <div>
          <div className="flex items-center">
            <div>{getUserLabel(activity.actorEmail)}</div>
            <div className="p-[2px] mx-2 rounded-full bg-gray-500" />
            <div className="text-[11px] font-medium">
              {formatDate(activity.timestamp)}
            </div>
          </div>
          <div className="mt-3">{`Linked a related task ${activity.data?.relatedTaskId}`}</div>
        </div>
      );
    }
    default:
      return <></>;
  }
};
