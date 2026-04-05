"use client";

import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mic, Image as ImageIcon, Loader2 } from "lucide-react";
import type { Post } from "@/types/allPostDataType";
import { usePostComment } from "@/hooks/Apicalling";

type CommentModalProps = {
  post: Post;
  user: {
    firstName: string;
    lastName: string;
  };
  token: string;
};

export default function CommentPost({ post, user, token }: CommentModalProps) {
  const [comment, setComment] = useState("");

  const commentMutation = usePostComment(token);

  const handlePostComment = () => {
    commentMutation.mutate(
      {
        text: comment,
        postId: post._id,
      },
      {
        onSuccess: () => {
          setComment("");
        },
      },
    );
  };

  return (
    <div className="flex items-center gap-3 dark:bg-[#232E42] bg-[#F6F6F6] rounded-full px-4 py-2 mb-4">
      <Avatar className="w-6 h-6">
        <AvatarFallback className="text-[10px]">
          {user?.firstName?.charAt(0)}
          {user?.lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <input
        type="text"
        placeholder="Write a comment"
        onChange={(value) => setComment(value.target.value)}
        value={comment}
        className=" bg-transparent flex-1 outline-none text-sm placeholder:text-gray-500"
      />
      <div className="flex gap-2 text-blue-400">
        <Mic className="w-4 h-4 cursor-pointer" />
        <ImageIcon className="w-4 h-4 cursor-pointer" />
        <button
          onClick={() => handlePostComment()}
          className="text-blue-400 flex gap-1 items-center font-bold text-xs"
        >
          Send{" "}
          {commentMutation.isPending && (
            <Loader2 className="w-2 h-2 animate-spin ml-2" />
          )}
        </button>
      </div>
    </div>
  );
}
