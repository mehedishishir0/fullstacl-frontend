import React from "react";
import StoryBar from "./StoryBar";
import CreatePost from "./CreatePost";
import Allpost from "./Allpost";

const Feed = () => {
  return (
    <div>
      <StoryBar />
      <CreatePost />
      <Allpost/>
    </div>
  );
};

export default Feed;
