export type FeedResponse = {
  success: boolean;
  message: string;
  data: Post[];
};

export type Post = {
  _id: string;
  user: User;
  text: string;
  image: Image | null;
  likes: string[];
  isPublic: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  comments: Comment[];
};

type User = {
  _id: string;
  firstName: string;
  lastName: string;
};

type Image = {
  url: string;
  public_id: string;
};

export type Comment = {
  _id: string;
  post: string;
  user: User;
  text: string;
  likes: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  replies: Reply[];
};

type Reply = {
  _id: string;
  comment: string;
  user: User;
  text: string;
  likes: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};