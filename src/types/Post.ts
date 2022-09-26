import { post_like } from "@prisma/client";

type Like = {
  liked: boolean;
};

type Comment = {
  id: number;
  body: string;
  created_at: string | Date;
};

type User = {
  id: number | undefined;
  name: string | undefined;
  avatar: string | undefined;
};

export type Post = {
  id: number;
  type: string;
  body: string;
  like_cont: number;
  liked: boolean;
  created_at: string | Date;
  mine: boolean;
  comment: Comment[];
  user?: User;
};

export type NewPost = {
  type: string;
  body: string;
  user_id: number;
};
