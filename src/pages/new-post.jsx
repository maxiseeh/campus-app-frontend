import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useCreatePost } from "@/lib/api";
import { useAuth } from "@/context/auth";
import { Layout } from "@/components/layout";

const CATEGORIES = [
  { value: "announcement", label: "Announcement" },
  { value: "study_group", label: "Study Group" },
  { value: "event", label: "Event" },
  { value: "lost_found", label: "Lost & Found" },
];

export default function NewPost() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const createPost = useCreatePost();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "announcement",
    contactInfo: "",
    location: "",
    eventDate: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) return setError("Please enter a title");

    const data = { ...form };
    if (form.category !== "event") delete data.eventDate;

    createPost.mutate(data, {
      onSuccess: (post) => setLocation(`/post/${post.id}`),
      onError: (err) => setError(err.message || "Failed to create post"),
    });
  }

  if (!user) {
    return (
      <Layout>
        <div className="max-w-sm mx-auto mt-16 text-center">
          <h2 className="text-xl font-bold mb-3">Login required</h2>
          <p className="text-gray-500 text-sm mb-6">
            You need to be logged in to create a post.
          </p>
          <Link href="/login" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
            Log in
          </Link>
          <p className="text-sm text-gray-400 mt-4">
            No account?{" "}
            <Link href="/signup" className="text-green-600 hover:underline">Sign up</Link>
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-xl mx-auto pb-12">
        <button onClick={() => setLocation("/")} className="mb-6 text-gray-500 hover:text-gray-700 text-sm">
          &larr; Back to board
        </button>

        <h1 className="text-2xl font-bold mb-6">Create a New Post</h1>

        {error && (
          <p className="text-red-500 bg-red-50 border border-red-200 rounded p-3 mb-4 text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="What is this about?"
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Give more details..."
              rows={4}
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Posting as</label>
            <input
              type="text"
              value={user.username}
              disabled
              className="border rounded-lg p-2 w-full bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contact Info</label>
            <input
              type="text"
              name="contactInfo"
              value={form.contactInfo}
              onChange={handleChange}
              placeholder="Email or phone number"
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Library, Room 204"
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {form.category === "event" && (
            <div>
              <label className="block text-sm font-medium mb-1">Event Date</label>
              <input
                type="date"
                name="eventDate"
                value={form.eventDate}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={createPost.isPending}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {createPost.isPending ? "Posting..." : "Create Post"}
          </button>
        </form>
      </div>
    </Layout>
  );
}