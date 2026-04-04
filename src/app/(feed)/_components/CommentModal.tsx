"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mic, Image as ImageIcon, MessageCircle, Loader2 } from "lucide-react";
import type { Post } from "@/types/allPostDataType";
import { usePostComment } from "@/hooks/Apicalling";
import { useSession } from "next-auth/react";

type CommentModalProps = {
  post: Post;
};

export default function CommentModal({ post }: CommentModalProps) {
  const { data: session } = useSession();
  const token = (session?.user as { accessToken: string })?.accessToken;
  const [open, setOpen] = useState(false);

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
          setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-white/5 rounded-lg transition-colors">
          <MessageCircle className="w-5 h-5" />
          Comment
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl w-full dark:bg-[#1a1a1a] bg-white rounded-xl shadow-xl p-5">
        <DialogHeader>
          <DialogTitle>Write a Comment</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <div className="flex items-center gap-3 dark:bg-[#232E42] bg-[#F6F6F6] rounded-full px-4 py-2 my-4">
          <Avatar className="w-8 h-8">
            <AvatarFallback>
              {post.user.firstName.charAt(0)}
              {post.user.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <input
            type="text"
            placeholder="Write a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="bg-transparent flex-1 outline-none text-sm placeholder:text-gray-500"
          />
          <div className="flex gap-2 text-blue-400">
            <Mic className="w-4 h-4 cursor-pointer" />
            <ImageIcon className="w-4 h-4 cursor-pointer" />
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handlePostComment}
          >
            Post Comment{" "}
            {commentMutation.isPending && (
              <Loader2 className="w-4 h-4 animate-spin ml-2" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
