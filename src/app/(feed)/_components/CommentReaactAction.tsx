import { Heart, ThumbsUp } from "lucide-react";
import React from "react";
import type { Comment } from "@/types/allPostDataType";
import { useCommentike } from "@/hooks/Apicalling";
import { useSession } from "next-auth/react";

const CommentReaactAction = ({ comment }: { comment: Comment }) => {
  const { data: session } = useSession();

  const user = session?.user as { id: string };
  const token = (session?.user as { accessToken: string })?.accessToken;

  const commentLikeMutation = useCommentike(token);

  const isLiked = comment?.likes?.includes(user?.id);

  const handleLike = () => {
    commentLikeMutation.mutate({ comment: comment._id });
  };

  return (
    <div className="absolute -bottom-3 right-2 flex items-center gap-1 dark:bg-[#1e3a5f] bg-[#fff] border border-white/10 px-2 py-0.5 rounded-full shadow-lg">
      
      <div
        onClick={handleLike}
        className="flex -space-x-1 cursor-pointer"
      >
        <ThumbsUp
          className={`w-3 h-3 transition ${
            isLiked
              ? "text-blue-500 fill-blue-500"
              : "text-gray-400"
          }`}
        />
        <Heart
          className={`w-3 h-3 transition ${
            isLiked
              ? "text-red-500 fill-red-500"
              : "text-gray-400"
          }`}
        />
      </div>

      <span
        className={`text-[10px] font-bold ${
          isLiked ? "text-blue-500" : "text-gray-500"
        }`}
      >
        {comment?.likes?.length || 0}
      </span>
    </div>
  );
};

export default CommentReaactAction;