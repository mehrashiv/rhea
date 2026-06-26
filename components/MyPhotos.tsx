"use client";

import { useEffect, useState } from "react";
import { insforge } from "@/lib/insforge";
import { useAuth } from "@/lib/auth-context";
import { PostCard } from "./PostCard";
import type { Post } from "@/lib/types";

export function MyPhotos({ refreshSignal }: { refreshSignal: number }) {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    let ignore = false;
    insforge.database
      .from("posts")
      .select("*, likes(id,user_id)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (ignore) return;
        if (error) {
          setError(error.message);
          return;
        }
        setPosts((data as Post[]) ?? []);
      });
    return () => {
      ignore = true;
    };
  }, [user, refreshSignal]);

  if (!user) return null;

  const toggleLike = async (post: Post) => {
    const liked = post.likes.some((like) => like.user_id === user.id);
    setPosts(
      (prev) =>
        prev?.map((p) =>
          p.id === post.id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((like) => like.user_id !== user.id)
                  : [...p.likes, { id: "optimistic", user_id: user.id }],
              }
            : p
        ) ?? prev
    );

    if (liked) {
      await insforge.database
        .from("likes")
        .delete()
        .eq("user_id", user.id)
        .eq("post_id", post.id);
    } else {
      await insforge.database
        .from("likes")
        .insert([{ user_id: user.id, post_id: post.id }]);
    }
  };

  const handleDelete = async (post: Post) => {
    setDeletingId(post.id);
    if (post.image_key) {
      await insforge.storage.from("post-images").remove(post.image_key);
    }
    const { error } = await insforge.database
      .from("posts")
      .delete()
      .eq("id", post.id);
    setDeletingId(null);
    if (error) {
      setError(error.message);
      return;
    }
    setPosts((prev) => prev?.filter((p) => p.id !== post.id) ?? prev);
  };

  if (error) {
    return <p className="px-4 py-12 text-center text-sm text-like-500">{error}</p>;
  }

  if (!posts) {
    return <p className="px-4 py-12 text-center text-sm text-muted">Loading your photos…</p>;
  }

  if (posts.length === 0) {
    return (
      <p className="px-4 py-12 text-center text-sm text-muted">
        You haven&apos;t shared any photos yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 py-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUserId={user.id}
          onToggleLike={toggleLike}
          onDelete={handleDelete}
          deleting={deletingId === post.id}
        />
      ))}
    </div>
  );
}
