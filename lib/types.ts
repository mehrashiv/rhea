export type Like = {
  id: string;
  user_id: string;
};

export type Post = {
  id: string;
  user_id: string;
  image_url: string;
  image_key: string | null;
  caption: string | null;
  created_at: string;
  likes: Like[];
};
