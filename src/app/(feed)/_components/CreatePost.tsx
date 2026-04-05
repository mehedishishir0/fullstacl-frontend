"use client";

import { useState } from "react";
import {
  Image as LucideImage,
  Video,
  Calendar,
  FileText,
  Send,
  Loader2,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useCreatePost } from "@/hooks/Apicalling";

export default function CreatePost() {
  const { data: session } = useSession();
  const token = (session?.user as { accessToken: string })?.accessToken;
  const user = session?.user as { firstName: string; lastName: string };

  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

  const postMutation = useCreatePost(token);

  const handlePost = () => {
    if (!text && !selectedImage) {
      toast.error("Please enter text or select an image to post.");
      return;
    }
    postMutation.mutate(
      { text, image: selectedImage || undefined, isPublic },
      {
        onSuccess: () => {
          setOpen(false);
          setSelectedImage(null);
          setOpen(false);
        },
      },
    );
  };

  const handleCancel = () => {
    setSelectedImage(null);
    setOpen(false);
  };

  return (
    <div className="dark:bg-[#112032] bg-white rounded-[15px] p-4 md:p-6 shadow-sm mb-6">
      <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-8">
        <Avatar className="w-10 h-10 md:w-11 md:h-11">
          <AvatarFallback>
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 flex items-center justify-between group cursor-text">
          <input
            type="text"
            placeholder="Write something ..."
            className="dark:text-gray-500 text-gray-400 text-[15px] md:text-[17px] bg-transparent outline-none w-full"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={() => setIsPublic(!isPublic)}
            className={`text-xs px-3 py-1 rounded-full border transition ${
              isPublic
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            }`}
          >
            {isPublic ? "Public" : "Private"}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 dark:bg-[#1890FF0D] bg-[#F3F9FF] p-3 rounded-xl">
        <div className="flex flex-wrap items-center gap-4 md:gap-5 px-1 md:px-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-[14px] md:text-[15px] px-4 py-2  rounded-md hover:bg-gray-100 dark:hover:bg-gray-600">
                <LucideImage className="w-5 h-5 text-blue-500" /> Photo
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-xl w-full dark:bg-[#1a1a1a] bg-white rounded-xl shadow-xl p-5">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold dark:text-white">
                  Create Post
                </DialogTitle>
              </DialogHeader>

              <div className="flex flex-col gap-4 mt-3">
                {selectedImage && (
                  <div className="relative w-full h-64 border rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      width={500}
                      height={500}
                      src={URL.createObjectURL(selectedImage)}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                    <button
                      className="absolute top-2 right-2 bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                      onClick={() => setSelectedImage(null)}
                    >
                      ×
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files?.[0] && setSelectedImage(e.target.files[0])
                  }
                  className="text-sm text-gray-500 dark:text-gray-300"
                />

                <textarea
                  placeholder="Write something..."
                  className="w-full p-3 border rounded-lg bg-transparent dark:text-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>

              <DialogFooter className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setIsPublic(!isPublic)}
                  className={`text-xs px-3 py-1 rounded-full border transition ${
                    isPublic
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {isPublic ? "Public" : "Private"}
                </button>

                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="px-4 py-2"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePost}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Post{" "}
                  {postMutation.isPending && (
                    <Loader2 className="w-4 h-4 animate-spin ml-2" />
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

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

        <Button
          className="bg-[#1890FF] hover:bg-[#1578CC] w-full md:w-auto px-6 md:px-8 py-5 md:py-6 rounded-xl font-bold flex justify-center text-white text-[15px] md:text-[16px] gap-2"
          onClick={handlePost}
        >
          <Send className="w-4 h-4" /> Post{" "}
          {postMutation.isPending && (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}
        </Button>
      </div>
    </div>
  );
}
