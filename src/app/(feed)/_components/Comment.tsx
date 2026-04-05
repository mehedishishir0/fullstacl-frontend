"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mic, Image as ImageIcon, Loader2 } from "lucide-react";
import type { Post } from "@/types/allPostDataType";
import { usePostReplyComment } from "@/hooks/Apicalling";
import { useSession } from "next-auth/react";
import CommentReaactAction from "./CommentReaactAction";
import RepliesComment from "./RepliesComment";

type Props = {
  post: Post;
};

export default function PostComments({ post }: Props) {
  const { data: session } = useSession();
  const token = (session?.user as { accessToken: string })?.accessToken;
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const replyMutation = usePostReplyComment(token);

  const handleReplyClick = (commentId: string) => {
    setReplyingTo(commentId === replyingTo ? null : commentId);
  };

  const handleSubmitReply = (commentId: string) => {
    if (!replyText.trim()) return;
    replyMutation.mutate(
      {
        text: replyText,
        commentId,
      },
      {
        onSuccess: () => {
          setReplyingTo(null);
          setReplyText("");
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-4 mt-4 p-6">
      {post.comments.map((comment) => (
        <div key={comment._id} className="flex gap-3 group">
          <Avatar className="w-10 h-10">
            <AvatarFallback>
              {comment.user.firstName.charAt(0)}
              {comment.user.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="relative dark:bg-[#232E42] bg-[#F6F6F6] p-4 rounded-2xl rounded-tl-none">
              <h4 className="font-bold text-sm mb-1">
                {comment.user.firstName} {comment.user.lastName}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {comment.text}
              </p>
              <CommentReaactAction comment={comment} />
            </div>

            <div className="flex gap-4 mt-2 ml-1 text-xs font-bold text-blue-400">
              {/* <button className="hover:underline">Like.</button> */}
              <button
                onClick={() => handleReplyClick(comment._id)}
                className="hover:underline"
              >
                Reply.
              </button>
              <button className="hover:underline">Share</button>
              <span className="text-gray-500 font-normal">
                . {new Date(comment.createdAt).toLocaleTimeString()}
              </span>
            </div>

            {/* Reply input */}
            {replyingTo === comment._id && (
              <div className="mt-4 flex items-center gap-3 dark:bg-[#232E42] bg-[#F6F6F6] rounded-full px-4 py-2">
                <Avatar className="w-6 h-6">
                  <AvatarFallback>
                    {post.user.firstName.charAt(0)}
                    {post.user.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <input
                  type="text"
                  placeholder="Write a comment"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="bg-transparent flex-1 outline-none text-xs placeholder:text-gray-500"
                />
                <div className="flex gap-2 text-blue-400">
                  <Mic className="w-3 h-3 cursor-pointer" />
                  <ImageIcon className="w-3 h-3 cursor-pointer" />
                </div>
                <button
                  onClick={() => handleSubmitReply(comment._id)}
                  className="text-blue-400 flex gap-1 items-center font-bold text-xs"
                >
                  Send{" "}
                  {replyMutation.isPending && (
                    <Loader2 className="w-2 h-2 animate-spin ml-2" />
                  )}
                </button>
              </div>
            )}

            {/* Replies */}
           <RepliesComment comment={comment} />
           
          </div>
        </div>
      ))}
    </div>
  );
}
