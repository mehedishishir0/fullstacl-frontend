"use client";
import React, { useState } from "react";
import type { Comment } from "@/types/allPostDataType";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, ThumbsUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRepliesLike } from "@/hooks/Apicalling";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const RepliesComment = ({ comment }: { comment: Comment }) => {
  const { data: session } = useSession();
  const user = session?.user as { id: string };
  const token = (session?.user as { accessToken: string })?.accessToken;

  const replyLikeMutation = useRepliesLike(token);
  const [openLikesModal, setOpenLikesModal] = useState(false);
  const [selectedReply, setSelectedReply] = useState<null | typeof comment.replies[0]>(null);

  return (
    <div>
      {comment.replies.length > 0 && (
        <div className="flex flex-col gap-4 mt-4 ml-8">
          {comment.replies.map((reply) => {
            const isLiked = reply.likes.some((u) => u._id === user?.id);

            return (
              <div key={reply._id} className="flex gap-3 group relative">
                <Avatar className="w-6 h-6">
                  <AvatarFallback>
                    {reply.user.firstName?.charAt(0)}
                    {reply.user.lastName?.charAt(0)}
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

                    <div className="absolute -bottom-3 right-2 flex items-center gap-2 dark:bg-[#1e3a5f] bg-[#fff] border border-white/10 px-2 py-0.5 rounded-full shadow-lg">
                      <div
                        onClick={() => replyLikeMutation.mutate({ replyId: reply._id })}
                        className="flex -space-x-1 cursor-pointer"
                      >
                        <ThumbsUp
                          className={`w-3 h-3 ${isLiked ? "text-blue-500 fill-blue-500" : "text-gray-400"}`}
                        />
                        <Heart
                          className={`w-3 h-3 ${isLiked ? "text-red-500 fill-red-500" : "text-gray-400"}`}
                        />
                      </div>

                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => {
                          setSelectedReply(reply);
                          setOpenLikesModal(true);
                        }}
                      >
                        {reply.likes.slice(0, 3).map((u) => (
                          <Avatar key={u._id} className="w-4 h-4 border border-white -ml-1">
                            <AvatarFallback>
                              {u.firstName?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        ))}

                        {reply.likes.length > 3 && (
                          <div className="w-4 h-4 rounded-full bg-gray-400 border border-white flex items-center justify-center text-[8px] text-white font-bold -ml-1">
                            +{reply.likes.length - 3}
                          </div>
                        )}

                        <span className={`text-[10px] font-bold ml-1 ${isLiked ? "text-blue-500" : "text-gray-500"}`}>
                          {reply.likes.length || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedReply && (
        <Dialog open={openLikesModal} onOpenChange={setOpenLikesModal}>
          <DialogContent className="sm:max-w-md dark:bg-[#1a1a1a] bg-white  w-full rounded-xl p-4">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">Likes</DialogTitle>
            </DialogHeader>

            <div className="max-h-[400px] overflow-y-auto mt-3 flex flex-col gap-3">
              {selectedReply.likes.length === 0 && (
                <p className="text-sm text-gray-500 text-center">No likes yet</p>
              )}

              {selectedReply.likes.map((u) => (
                <div
                  key={u._id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Avatar className="w-9 h-9">
                    <AvatarFallback>
                      {u.firstName?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-medium">{u.firstName} {u.lastName}</p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default RepliesComment;