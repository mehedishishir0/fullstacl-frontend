// components/Feed/Post.tsx
import { MoreHorizontal, Share2, Heart } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import type { Post } from "@/types/allPostDataType";
import Comment from "./Comment";
import CommentModal from "./CommentModal";

export default function Post({ post }: { post: Post }) {

  return (
    <div className="dark:bg-[#112032] bg-white rounded-[15px] shadow-sm overflow-hidden ">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12">
            <AvatarFallback>
              {post.user.firstName.charAt(0)}
              {post.user.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-[17px] leading-tight cursor-pointer">
              {post.user.firstName} {post.user.lastName}
            </span>
            <div className="flex gap-2 items-center mt-1 ">
              <span className="text-gray-400 text-[13px]">
                {new Date(post.createdAt).toLocaleString("en-US", {
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
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-[#000000] dark:text-[#ffffff]" />
        </button>
      </div>

      {/* Caption */}
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
        <div className="flex items-center">
          <div className="flex -space-x-2 mr-3">
            {[1, 2].map((i) => (
              <Avatar key={i} className="w-7 h-7 borde-1 border-white">
                <AvatarImage src={`https://i.pravatar.cc/100?img=${i + 10}`} />
              </Avatar>
            ))}
            <div className="w-7 h-7 rounded-full bg-[#1890FF] border-1 z-10  border-white flex items-center justify-center text-[15px] font-bold text-white">
              {`${post.likes.length}`}
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <span>
            {post.comments.reduce(
              (total, comment) => total + 1 + comment.replies.length,
              0,
            )}{" "}
            Comments
          </span>
          <span>122 Share</span>
        </div>
      </div>

      <div className="px-6 py-2 flex gap-2 items-center dark:bg-[#11263c] bg-[#FBFCFD] ">
        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#1e3a5f]/30 rounded-lg text-blue-400 font-medium">
          <Heart className="w-5 h-5" /> Love
        </button>
      
        <CommentModal post={post} />
        
        <button className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-white/5 rounded-lg transition-colors">
          <Share2 className="w-5 h-5" /> Share
        </button>
      </div>

      <Comment post={post} />
    </div>
  );
}
