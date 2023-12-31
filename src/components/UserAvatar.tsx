import { FC } from "react";
import { User } from "next-auth";
import { Avatar, AvatarFallback } from "./ui/Avatar";
import Image from "next/image";
import { Icons } from "./Icons";
import { AvatarProps } from "@radix-ui/react-avatar";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "name" | "image">;
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  if (!user) return <Avatar {...props} className="bg-slate-500" />;
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className="relative aspect-squaren h-full w-full">
          <Image
            fill
            src={user?.image}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">
            {user.name}
            <Icons.user className="h-4 w-4 text-gray-900" />
          </span>
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
