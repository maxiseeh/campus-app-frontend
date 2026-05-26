import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BASE = "/api";

async function fetchJson(url, options = {}) {
  const res = await fetch(url, { credentials: "include", ...options });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Something went wrong");
  }
  return res.json();
}

export const POSTS_KEY = ["posts"];
export const STATS_KEY = ["stats"];
export const RECENT_KEY = ["recent"];

export function useListPosts(params = {}) {
  const qs = new URLSearchParams();
  if (params.category) qs.set("category", params.category);
  if (params.search) qs.set("search", params.search);

  return useQuery({
    queryKey: [...POSTS_KEY, params],
    queryFn: () => fetchJson(`${BASE}/posts?${qs}`),
  });
}

export function useGetPostStats() {
  return useQuery({
    queryKey: STATS_KEY,
    queryFn: () => fetchJson(`${BASE}/posts/stats`),
  });
}

export function useGetRecentPosts() {
  return useQuery({
    queryKey: RECENT_KEY,
    queryFn: () => fetchJson(`${BASE}/posts/recent`),
  });
}

export function useGetPost(id) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchJson(`${BASE}/posts/${id}`),
    enabled: !!id,
    retry: false,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
      fetchJson(`${BASE}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_KEY });
      queryClient.invalidateQueries({ queryKey: STATS_KEY });
      queryClient.invalidateQueries({ queryKey: RECENT_KEY });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${BASE}/posts/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to delete post");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_KEY });
      queryClient.invalidateQueries({ queryKey: STATS_KEY });
      queryClient.invalidateQueries({ queryKey: RECENT_KEY });
    },
  });
}
