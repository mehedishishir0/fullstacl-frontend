import React from "react";
import type { Comment } from "@/types/allPostDataType";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, ThumbsUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRepliesLike } from "@/hooks/Apicalling";

const RepliesComment = ({ comment }: { comment: Comment }) => {
  const { data: session } = useSession();
  const user = session?.user as { id: string };
  const token = (session?.user as { accessToken: string })?.accessToken;

  const replyLikeMutation = useRepliesLike(token);

  return (
    <div>
      {comment.replies.length > 0 && (
        <div className="flex flex-col gap-4 mt-4 ml-8">
          {comment.replies.map((reply) => {
            const isLiked = reply?.likes?.includes(user?.id);

            return (
              <div key={reply._id} className="flex gap-3 group relative">
                <Avatar className="w-6 h-6">
                  <AvatarFallback>
                    {reply.user.firstName.charAt(0)}
                    {reply.user.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="relative dark:bg-[#232E42] bg-[#F6F6F6] p-3 rounded-2xl rounded-tl-none">
                    <h4 className="font-bold text-xs mb-1">
                      {reply.user.firstName} {reply.user.lastName}
                    </h4>

                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                      {reply.text}
                    </p>

                    <div className="absolute -bottom-3 right-2 flex items-center gap-1 dark:bg-[#1e3a5f] bg-[#fff] border border-white/10 px-2 py-0.5 rounded-full shadow-lg">
                      <div
                        onClick={() =>
                          replyLikeMutation.mutate({
                            replyId: reply._id,
                          })
                        }
                        className="flex -space-x-1 cursor-pointer"
                      >
                        <ThumbsUp
                          className={`w-3 h-3 ${
                            isLiked
                              ? "text-blue-500 fill-blue-500"
                              : "text-gray-400"
                          }`}
                        />
                        <Heart
                          className={`w-3 h-3 ${
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
                        {reply?.likes?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RepliesComment;
