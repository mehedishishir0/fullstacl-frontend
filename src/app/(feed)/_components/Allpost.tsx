"use client";

import React from "react";
import Post from "./Post";
import { useAllPosts } from "@/hooks/Apicalling";
import { useSession } from "next-auth/react";

const Allpost = () => {
  const { data: session } = useSession();
  const token = (session?.user as { accessToken: string })?.accessToken;

  const post = useAllPosts(token);

  return (
    <div className="flex flex-col gap-5 lg:mb-20 mb-32">
      {post.data?.data.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Allpost;
