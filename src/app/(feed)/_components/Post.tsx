import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import type { Post } from "@/types/allPostDataType";
import Comment from "./Comment";
import AllReactAction from "./AllReactAction";
import LikeShow from "./LikeShow";
import { useState } from "react";
import PostControllDropdown from "./PostControllDropdown";

export default function Post({ post }: { post: Post }) {
  const [openComment,setOpenComment] = useState(false)

  return (
    <div className="dark:bg-[#112032] bg-white rounded-[15px] shadow-sm overflow-hidden ">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12">
            <AvatarFallback>
              {post?.user?.firstName.charAt(0)}
              {post?.user?.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-[17px] leading-tight cursor-pointer">
              {post?.user?.firstName} {post?.user?.lastName}
            </span>
            <div className="flex gap-2 items-center mt-1 ">
              <span className="text-gray-400 text-[13px]">
                {new Date(post?.createdAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span className="text-gray-400 text-[13px]">
                {post.isPublic ? "Public" : "Private"}
              </span>
            </div>
          </div>
        </div>
        <PostControllDropdown postId={post._id} postOwnerId={post?.user?._id}/>
        
      </div>

      <div className="px-6 pb-4">
        <p className="text-[16px] ">{post.text}</p>
      </div>

      {post.image && (
        <div className="px-6 pb-2">
          <div className="rounded-[15px] overflow-hidden">
            <Image
              width={800}
              height={500}
              src={post.image?.url || ""}
              alt="Healthy Tracking"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      )}

      <div className="px-6 py-4 flex items-center justify-between text-gray-400 text-sm">
       <LikeShow post={post}/>
      
        <div className="flex gap-4">
          <span className="cursor-pointer" onClick={() =>  setOpenComment(!openComment)}>
            {post.comments.reduce(
              (total, comment) => total + 1 + comment.replies.length,
              0,
            )}{" "}
            Comments
          </span>
          <span>122 Share</span>
        </div>
      </div>

      <AllReactAction openComment={openComment}  setOpenComment={setOpenComment}  post={post} />
     {
      openComment &&  <Comment post={post} />
     }
    
    </div>
  );
}
