import React from 'react'
import StoryBar from './StoryBar'
import CreatePost from './CreatePost'
import Post from './Post'

const Feed = () => {
  return (
    <div>
        <StoryBar/>
        <CreatePost/>
        <div className='flex flex-col gap-5 lg:mb-20 mb-32'>
          <Post/>
          <Post/>
            <Post/>
              <Post/>
                <Post/>
        </div>
    </div>
  )
}

export default Feed