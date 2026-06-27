"use client";

import { useCallback, useEffect, useState } from "react";
import { insforge } from "@/lib/insforge";
import { useAuth } from "@/lib/auth-context";
import { timeAgo } from "@/lib/time";
import { PostCard } from "./PostCard";
import { UploadDropzone } from "./UploadDropzone";
import type { Post } from "@/lib/types";

export function MyPhotos() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadPosts = useCallback(() => {
    if (!user) return;
    insforge.database
      .from("posts")
      .select("*, likes(id,user_id)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
          return;
        }
        setPosts((data as Post[]) ?? []);
      });
  }, [user]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  if (!user) return null;

  const authorName = user.profile?.name || user.email.split("@")[0];

  const handleDelete = async (post: Post) => {
    setDeletingId(post.id);
    if (post.image_key) {
      await insforge.storage.from("post-images").remove(post.image_key);
    }
    const { error } = await insforge.database.from("posts").delete().eq("id", post.id);
    setDeletingId(null);
    if (error) {
      setError(error.message);
      return;
    }
    setPosts((prev) => prev?.filter((p) => p.id !== post.id) ?? prev);
  };

  const handleEditCaption = async (post: Post, newCaption: string) => {
    const trimmed = newCaption.trim() || null;
    const { error } = await insforge.database
      .from("posts")
      .update({ caption: trimmed })
      .eq("id", post.id);
    if (error) {
      throw new Error(error.message);
    }
    setPosts((prev) =>
      prev?.map((p) => (p.id === post.id ? { ...p, caption: trimmed } : p)) ?? prev
    );
  };

  return (
    <main className="lila-container">
      <UploadDropzone onPosted={loadPosts} />

      {error && <p className="field-error">{error}</p>}

      {posts === null ? (
        <div className="spinner-row">
          <div className="spinner" />
        </div>
      ) : posts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__title">Your photos live here</div>
          <p className="empty-state__hint">Share your first one above.</p>
        </div>
      ) : (
        <div className="feed-list">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              authorName={authorName}
              authorAvatar={user.profile?.avatar_url}
              timeAgo={timeAgo(post.created_at)}
              imageUrl={post.image_url}
              caption={post.caption}
              likeCount={post.likes.length}
              onDelete={() => handleDelete(post)}
              deleting={deletingId === post.id}
              onEditCaption={(newCaption) => handleEditCaption(post, newCaption)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
