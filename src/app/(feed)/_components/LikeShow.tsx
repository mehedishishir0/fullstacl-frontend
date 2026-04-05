"use client";
import React, { useState } from "react";
import type { Post } from "@/types/allPostDataType";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const LikeShow = ({ post }: { post: Post }) => {
  const [openLikesModal, setOpenLikesModal] = useState(false);

  return (
    <>
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setOpenLikesModal(true)}
      >
        <div className="flex -space-x-2 mr-3">
          {post.likes.slice(0, 3).map((user) => (
            <Avatar key={user._id} className="w-7 h-7 border border-white">
              <AvatarFallback>
                {user.firstName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ))}

          <div className="w-7 h-7 rounded-full bg-[#1890FF] border z-10 border-white flex items-center justify-center text-[15px] font-bold text-white">
            {post.likes.length}
          </div>
        </div>
      </div>

      <Dialog open={openLikesModal} onOpenChange={setOpenLikesModal}>
        <DialogContent className="sm:max-w-md w-full dark:bg-[#1a1a1a] bg-white rounded-xl p-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Likes</DialogTitle>
          </DialogHeader>

          <div className="max-h-[400px] overflow-y-auto mt-3 flex flex-col gap-3">
            {post.likes.length === 0 && (
              <p className="text-sm text-gray-500 text-center">No likes yet</p>
            )}

            {post.likes.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Avatar className="w-9 h-9">
                  <AvatarFallback>
                    {user.firstName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <p className="text-sm font-medium">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LikeShow;
