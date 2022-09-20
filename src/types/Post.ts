type Like = {
  id: number;
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
  created_at: string | Date;
  mine: boolean;
  like: Like[];
  comment: Comment[];
  user?: User;
};

export type NewPost = {
  type: string;
  body: string;
  user_id: number;
};
