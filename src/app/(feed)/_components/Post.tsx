// components/Feed/Post.tsx
import { MoreHorizontal, MessageSquare, Share2,  Mic, Image as ImageIcon, ThumbsUp, Heart } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

export default function Post() {
  return (
    <div className="dark:bg-[#112032] bg-white rounded-[15px] shadow-sm overflow-hidden ">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/images/post_img.png" />
            <AvatarFallback>KS</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-[17px] leading-tight cursor-pointer">Karim Saif</span>
            <span className="text-gray-400 text-[13px] mt-1">
              5 minute ago . Public
            </span>
          </div>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-[#000000] dark:text-[#ffffff]" />
        </button>
      </div>

      {/* Caption */}
      <div className="px-6 pb-4">
        <p className="text-[16px] ">
          - Healthy Tracking App
        </p>
      </div>

      {/* Post Image */}
      <div className="px-6 pb-2">
        <div className="rounded-[15px] overflow-hidden">
          <Image
            width={800}
            height={500}
            src="/images/timeline_img.png" 
            alt="Healthy Tracking" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 py-4 flex items-center justify-between text-gray-400 text-sm">
        <div className="flex items-center">
            {/* Stacked Avatars */}
            <div className="flex -space-x-2 mr-3">
                {[1,2,3,4].map((i) => (
                    <Avatar key={i} className="w-7 h-7 borde-1 border-white">
                        <AvatarImage src={`https://i.pravatar.cc/100?img=${i+10}`} />
                    </Avatar>
                ))}
                <div className="w-7 h-7 rounded-full bg-[#1890FF] border-1 z-10  border-white flex items-center justify-center text-[10px] font-bold text-white">
                    9+
                </div>
            </div>
        </div>
        <div className="flex gap-4">
            <span>12 Comment</span>
            <span>122 Share</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-2 flex gap-2 items-center dark:bg-[#11263c] bg-[#FBFCFD] ">
        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#1e3a5f]/30 rounded-lg text-blue-400 font-medium">
            <Heart className="w-5 h-5" /> Love
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-white/5 rounded-lg transition-colors">
            <MessageSquare className="w-5 h-5" /> Comment
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-white/5 rounded-lg transition-colors">
            <Share2 className="w-5 h-5" /> Share
        </button>
      </div>

      {/* Comment Input */}
      <div className="p-6">
        <div className="flex items-center gap-3 dark:bg-[#232E42] bg-[#F6F6F6] rounded-full px-4 py-2 mb-6">
            <Avatar className="w-8 h-8">
                <AvatarImage src="https://i.pravatar.cc/150?u=me" />
            </Avatar>
            <input 
                type="text" 
                placeholder="Write a comment" 
                className=" bg-transparent flex-1 outline-none text-sm placeholder:text-gray-500"
            />
            <div className="flex gap-2 text-blue-400">
                <Mic className="w-4 h-4 cursor-pointer" />
                <ImageIcon className="w-4 h-4 cursor-pointer" />
            </div>
        </div>

        <p className="text-xs font-semibold text-gray-400 mb-4 cursor-pointer hover:underline">
            View 4 previous comments
        </p>

        {/* Individual Comment */}
        <div className="flex gap-3 group">
            <Avatar className="w-10 h-10">
                <AvatarImage src="https://i.pravatar.cc/150?u=radovan" />
            </Avatar>
            <div className="flex-1">
                <div className="relative dark:bg-[#232E42] bg-[#F6F6F6] p-4 rounded-2xl rounded-tl-none">
                    <h4 className="font-bold text-sm mb-1">Radovan SkillArena</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                    </p>
                    {/* Reaction badges on comment */}
                    <div className="absolute -bottom-3 right-2 flex items-center gap-1 dark:bg-[#1e3a5f] bg-[#fff] border border-white/10 px-2 py-0.5 rounded-full shadow-lg">
                        <div className="flex -space-x-1">
                            <ThumbsUp className="w-3 h-3 text-blue-400 fill-blue-400" />
                            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                        </div>
                        <span className="text-[10px] font-bold">198</span>
                    </div>
                </div>
                
                <div className="flex gap-4 mt-2 ml-1 text-xs font-bold text-blue-400">
                    <button className="hover:underline">Like.</button>
                    <button className="hover:underline">Reply.</button>
                    <button className="hover:underline">Share</button>
                    <span className="text-gray-500 font-normal">. 21m</span>
                </div>

                {/* Nested Comment Input */}
                <div className="mt-4 flex items-center gap-3 dark:bg-[#232E42] bg-[#F6F6F6] rounded-full px-4 py-2">
                    <Avatar className="w-6 h-6">
                        <AvatarImage src="https://i.pravatar.cc/150?u=me" />
                    </Avatar>
                    <input 
                        type="text" 
                        placeholder="Write a comment" 
                        className="bg-transparent flex-1 outline-none text-xs placeholder:text-gray-500"
                    />
                    <div className="flex gap-2 text-blue-400">
                        <Mic className="w-3 h-3 cursor-pointer" />
                        <ImageIcon className="w-3 h-3 cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}