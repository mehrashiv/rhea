"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { insforge } from "@/lib/insforge";
import { loadProfiles } from "@/lib/profiles";
import { timeAgo } from "@/lib/time";
import { PostCard } from "./PostCard";
import type { Post } from "@/lib/types";

const PAGE_SIZE = 6;

type DecoratedPost = Post & { authorName: string; authorAvatar?: string | null };

export function Feed({ currentUserId }: { currentUserId?: string }) {
  const [posts, setPosts] = useState<DecoratedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const offsetRef = useRef(0);
  const hasMoreRef = useRef(true);
  const fetchingRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelNodeRef = useRef<HTMLDivElement | null>(null);

  const loadPage = useCallback(async () => {
    if (fetchingRef.current || !hasMoreRef.current) return;
    fetchingRef.current = true;

    const from = offsetRef.current;
    const to = from + PAGE_SIZE - 1;
    const { data, error } = await insforge.database
      .from("posts")
      .select("*, likes(id,user_id)")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      setError(error.message);
      fetchingRef.current = false;
      return;
    }

    const page = (data as Post[]) ?? [];
    offsetRef.current = from + page.length;
    if (page.length < PAGE_SIZE) {
      hasMoreRef.current = false;
      setHasMore(false);
    }

    const profiles = await loadProfiles(page.map((p) => p.user_id));
    const decorated = page.map((p) => ({
      ...p,
      authorName: profiles.get(p.user_id)?.name || "a maker",
      authorAvatar: profiles.get(p.user_id)?.avatar_url,
    }));

    setPosts((prev) => [...prev, ...decorated]);
    fetchingRef.current = false;
  }, []);

  useEffect(() => {
    loadPage().finally(() => setLoading(false));
  }, [loadPage]);

  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!observerRef.current) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            if (entries[0]?.isIntersecting) loadPage();
          },
          { rootMargin: "300px" }
        );
      }
      if (sentinelNodeRef.current) observerRef.current.unobserve(sentinelNodeRef.current);
      sentinelNodeRef.current = node;
      if (node) observerRef.current.observe(node);
    },
    [loadPage]
  );

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  const toggleLike = async (post: DecoratedPost) => {
    if (!currentUserId) return;
    const liked = post.likes.some((like) => like.user_id === currentUserId);

    setPosts((prev) =>
      prev.map((p) =>
        p.id === post.id
          ? {
              ...p,
              likes: liked
                ? p.likes.filter((like) => like.user_id !== currentUserId)
                : [...p.likes, { id: "optimistic", user_id: currentUserId }],
            }
          : p
      )
    );

    if (liked) {
      await insforge.database.from("likes").delete().eq("user_id", currentUserId).eq("post_id", post.id);
    } else {
      await insforge.database.from("likes").insert([{ user_id: currentUserId, post_id: post.id }]);
    }
  };

  if (loading) {
    return (
      <main className="lila-container">
        <div className="spinner-row">
          <div className="spinner" />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="lila-container">
        <p className="feed-empty">{error}</p>
      </main>
    );
  }

  return (
    <main className="lila-container">
      {posts.length === 0 ? (
        <p className="feed-empty">No posts yet — check back soon.</p>
      ) : (
        <div className="feed-list">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              authorName={post.authorName}
              authorAvatar={post.authorAvatar}
              timeAgo={timeAgo(post.created_at)}
              imageUrl={post.image_url}
              caption={post.caption}
              likeCount={post.likes.length}
              liked={currentUserId ? post.likes.some((like) => like.user_id === currentUserId) : false}
              onToggleLike={currentUserId ? () => toggleLike(post) : undefined}
            />
          ))}
        </div>
      )}

      {hasMore && (
        <>
          <div ref={sentinelRef} className="feed-sentinel" />
          <div className="spinner-row">
            <div className="spinner" />
          </div>
        </>
      )}
      {!hasMore && posts.length > 0 && <div className="feed-end">You&apos;re all caught up</div>}
    </main>
  );
}
