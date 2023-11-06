"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Image as ImageIcon, Link2, User } from "lucide-react";
import { FC } from "react";
import UserAvatar from "./UserAvatar";
import type { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "./ui/Avatar";
interface MiniCreatePostProps {
  session: Session | null;
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <li className="overflow-hidden rounded-md bg-white shadow mb-4 ">
      <div className="h-full px-6 py-4 flex justify-between gap-6">
        <div className="relative">
          {session ? (
            <UserAvatar user={session.user} />
          ) : (
            <Avatar>
              <User className="relative aspect-squaren h-full w-full" />
            </Avatar>
          )}

          <span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white" />
        </div>
        <Input
          //   onClick={() => router.push(pathname + "/submit")}
          //   readOnly
          placeholder="Create post"
        />
        <Button
          onClick={() => router.push(pathname + "/submit")}
          variant="ghost"
        >
          <ImageIcon className="text-zinc-600" />
        </Button>
        <Button
          onClick={() => router.push(pathname + "/submit")}
          variant="ghost"
        >
          <Link2 className="text-zinc-600" />
        </Button>
      </div>
    </li>
  );
};

export default MiniCreatePost;
