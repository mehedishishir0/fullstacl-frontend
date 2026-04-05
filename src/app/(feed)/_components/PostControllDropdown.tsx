"use client";

import React from "react";
import { MoreHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useDeletePost } from "@/hooks/Apicalling";

type PostControllDropdownProps = {
  postOwnerId: string;
  postId: string;
};

const PostControllDropdown = ({
  postOwnerId,
  postId,
}: PostControllDropdownProps) => {
  const { data: session } = useSession();
  const user = session?.user as { id: string };
  const token = (session?.user as { accessToken: string })?.accessToken;

  const deletePost = useDeletePost(token);

  if (user?.id !== postOwnerId) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 hover:bg-white/10 rounded-full cursor-pointer transition-colors">
          <MoreHorizontal className="w-5 h-5 text-[#000000] dark:text-[#ffffff]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem
          onClick={() => deletePost.mutate({ postId })}
          className="text-red-500 cursor-pointer outline-none"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostControllDropdown;
