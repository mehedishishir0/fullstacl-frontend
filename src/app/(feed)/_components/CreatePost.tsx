"use client";
import { Image, Video, Calendar, FileText, Send, Pencil } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function CreatePost() {

  return (
    <div className="dark:bg-[#112032] bg-white rounded-[15px] p-4 md:p-6 shadow-sm mb-6">

      {/* Top Input */}
      <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-8 cursor-pointer">
        <Avatar className="w-10 h-10 md:w-11 md:h-11">
          <AvatarImage src="/images/txt_img.png" />
        </Avatar>

        <div className="flex-1 flex items-center justify-between group cursor-text">
          <span className="dark:text-gray-500 text-gray-400 text-[15px] md:text-[17px]">
            Write something ...
          </span>

          <Pencil className="w-4 h-4 dark:text-gray-500 text-gray-400" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 dark:bg-[#1890FF0D] bg-[#F3F9FF] p-3 rounded-xl">

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-4 md:gap-5 px-1 md:px-2">

          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-[14px] md:text-[15px]">
            <Image className="w-5 h-5" /> Photo
          </button>

          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-[14px] md:text-[15px]">
            <Video className="w-5 h-5" /> Video
          </button>

          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-[14px] md:text-[15px]">
            <Calendar className="w-5 h-5" /> Event
          </button>

          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-[14px] md:text-[15px]">
            <FileText className="w-5 h-5" /> Article
          </button>

        </div>

        {/* Post Button */}
        <Button className="bg-[#1890FF] hover:bg-[#1578CC] w-full md:w-auto px-6 md:px-8 py-5 md:py-6 rounded-xl font-bold flex justify-center text-white text-[15px] md:text-[16px] gap-2">
          <Send className="w-4 h-4" /> Post
        </Button>

      </div>
    </div>
  );
}