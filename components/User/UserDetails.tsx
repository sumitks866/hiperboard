/* eslint-disable @next/next/no-img-element */
import { AvatarGenerator } from "random-avatar-generator";
const avatarGenerator = new AvatarGenerator();

interface IProps {
    userId: string;
}

export function UserDetails(props: IProps) {
  return (
    <div className="flex items-center">
      <img
        src={avatarGenerator.generateRandomAvatar(props.userId)}
        alt={props.userId}
        className={`h-8 mr-2`}
      />
      <span>{props.userId}</span>
    </div>
  );
}
