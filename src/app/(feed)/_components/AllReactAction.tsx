"use client";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import React from "react";
import type { Post } from "@/types/allPostDataType";
import { usePostLike } from "@/hooks/Apicalling";
import { useSession } from "next-auth/react";

const AllReactAction = ({
  post,
  setOpenComment,
  openComment
}: {
  post: Post;
  setOpenComment: (open: boolean) => void;
  openComment:boolean
}) => {
  const { data: session } = useSession();
  const user = session?.user as { id: string };
  const token = (session?.user as { accessToken: string })?.accessToken;
  const postLikeMutation = usePostLike(token);

  const isLiked = post.likes.some((u) => u._id === user?.id);

  return (
    <div>
      <div className="px-6 py-2 flex gap-2 items-center dark:bg-[#11263c] bg-[#FBFCFD] ">
        <button
          onClick={() => postLikeMutation.mutate({ postId: post._id })}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium ${
            isLiked ? "text-red-500  bg-[#1e3a5f]/30" : "text-blue-400"
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500" : ""}`} />
          Love
        </button>

        <button onClick={()=> setOpenComment(!openComment)} className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-white/5 rounded-lg transition-colors">
          <MessageCircle className="w-5 h-5" />
          Comment
        </button>

        <button className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-white/5 rounded-lg transition-colors">
          <Share2 className="w-5 h-5" /> Share
        </button>
      </div>
    </div>
  );
};

export default AllReactAction;
