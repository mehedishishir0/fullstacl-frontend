import { Heart, ThumbsUp } from "lucide-react";
import React, { useState } from "react";
import type { Comment } from "@/types/allPostDataType";
import { useCommentike } from "@/hooks/Apicalling";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const CommentReactAction = ({ comment }: { comment: Comment }) => {
  const { data: session } = useSession();
  const user = session?.user as { id: string };
  const token = (session?.user as { accessToken: string })?.accessToken;

  const commentLikeMutation = useCommentike(token);
  const [openLikesModal, setOpenLikesModal] = useState(false);
  const isLiked = comment.likes?.some((u) => u._id === user?.id);

  const handleLike = () => {
    commentLikeMutation.mutate({ comment: comment._id });
  };

  return (
    <div className="absolute -bottom-3 right-2 flex items-center gap-2 dark:bg-[#1e3a5f] bg-[#fff] border border-white/10 px-2 py-0.5 rounded-full shadow-lg">
      <div onClick={handleLike} className="flex -space-x-1 cursor-pointer">
        <ThumbsUp
          className={`w-3 h-3 transition ${isLiked ? "text-blue-500 fill-blue-500" : "text-gray-400"}`}
        />
        <Heart
          className={`w-3 h-3 transition ${isLiked ? "text-red-500 fill-red-500" : "text-gray-400"}`}
        />
      </div>
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setOpenLikesModal(true)}
      >
        {comment.likes?.slice(0, 1).map((u) => (
          <Avatar key={u._id} className="w-4 h-4 border border-white -ml-1">
            <AvatarFallback>{u.firstName?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        ))}

        {comment.likes && comment.likes.length > 3 && (
          <div className="w-4 h-4 rounded-full bg-gray-400 border border-white flex items-center justify-center text-[8px] text-white font-bold -ml-1">
            +{comment.likes.length - 3}
          </div>
        )}

        <span className={`text-[10px] font-bold ml-1 ${isLiked ? "text-blue-500" : "text-gray-500"}`}>
          {comment?.likes?.length || 0}
        </span>
      </div>

      <Dialog open={openLikesModal} onOpenChange={setOpenLikesModal}>
        <DialogContent className="sm:max-w-md dark:bg-[#1a1a1a] bg-white w-full rounded-xl p-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Likes</DialogTitle>
          </DialogHeader>

          <div className="max-h-[400px] overflow-y-auto mt-3 flex flex-col gap-3">
            {comment.likes?.length === 0 && (
              <p className="text-sm text-gray-500 text-center">No likes yet</p>
            )}

            {comment.likes?.map((u) => (
              <div
                key={u._id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Avatar className="w-9 h-9">
                  <AvatarFallback>{u.firstName?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium">{u.firstName} {u.lastName}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommentReactAction;