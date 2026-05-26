import { useState } from "react";
import { Link } from "wouter";
import { useListPosts, useGetPostStats, useGetRecentPosts } from "@/lib/api";
import { Layout } from "@/components/layout";
import { PostCard } from "@/components/post-card";

const FILTERS = [
  { value: "all", label: "All Posts" },
  { value: "study_group", label: "Study Groups" },
  { value: "event", label: "Events" },
  { value: "lost_found", label: "Lost & Found" },
  { value: "announcement", label: "Announcements" },
];

export default function Home() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const params = {};
  if (category !== "all") params.category = category;
  if (search) params.search = search;

  const { data: posts, isLoading } = useListPosts(params);
  const { data: stats } = useGetPostStats();
  const { data: recent } = useGetRecentPosts();

  return (
    <Layout>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        <div className="bg-white border rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-green-600">{stats?.total ?? 0}</p>
          <p className="text-sm text-gray-500 mt-1">Total Posts</p>
        </div>
        <div className="bg-white border rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{stats?.studyGroups ?? 0}</p>
          <p className="text-sm text-gray-500 mt-1">Study Groups</p>
        </div>
        <div className="bg-white border rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-orange-500">{stats?.events ?? 0}</p>
          <p className="text-sm text-gray-500 mt-1">Events</p>
        </div>
        <div className="bg-white border rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-red-500">{stats?.lostFound ?? 0}</p>
          <p className="text-sm text-gray-500 mt-1">Lost & Found</p>
        </div>
        <div className="bg-white border rounded-lg p-4 text-center md:col-span-1 col-span-2">
          <p className="text-2xl font-bold text-purple-600">{stats?.announcements ?? 0}</p>
          <p className="text-sm text-gray-500 mt-1">Announcements</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setCategory(f.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              category === f.value
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-72 border rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {isLoading ? (
            <p className="text-gray-500">Loading posts...</p>
          ) : posts?.length === 0 ? (
            <p className="text-gray-500 text-center py-12">
              No posts found. Try a different filter or search.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {posts?.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>

        <aside className="w-full lg:w-64 shrink-0">
          <h2 className="font-semibold text-gray-700 mb-3">Recent Activity</h2>
          <div className="space-y-3">
            {recent?.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`} className="block">
                <p className="text-sm font-medium text-gray-800 hover:text-green-600 line-clamp-1">
                  {post.title}
                </p>
                <p className="text-xs text-gray-400">by {post.authorName}</p>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </Layout>
  );
}