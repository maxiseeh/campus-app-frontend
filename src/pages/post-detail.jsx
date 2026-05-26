import { useRoute, useLocation } from "wouter";
import { format } from "date-fns";
import { useGetPost, useDeletePost } from "@/lib/api";
import { useAuth } from "@/context/auth";
import { Layout } from "@/components/layout";
import { CategoryBadge } from "@/components/CategoryBadge";

export default function PostDetail() {
  const [, params] = useRoute("/post/:id");
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  const id = params?.id ? parseInt(params.id) : 0;
  const { data: post, isLoading, isError } = useGetPost(id);
  const deletePost = useDeletePost();

  function handleDelete() {
    if (!window.confirm("Delete this post? This cannot be undone.")) return;
    deletePost.mutate(id, {
      onSuccess: () => setLocation("/"),
      onError: (err) => alert(err.message || "Failed to delete. Please try again."),
    });
  }

  if (isLoading) {
    return <Layout><p className="text-gray-500 mt-12">Loading post...</p></Layout>;
  }

  if (isError) {
    return (
      <Layout>
        <p className="text-red-500 mt-12">Post not found.</p>
        <button onClick={() => setLocation("/")} className="mt-4 text-green-600 text-sm">
          &larr; Back to board
        </button>
      </Layout>
    );
  }

  const isOwner = user && post && user.id === post.userId;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto pb-12">
        <button onClick={() => setLocation("/")} className="mb-6 text-gray-500 hover:text-gray-700 text-sm">
          &larr; Back to board
        </button>

        <div className="mb-3">
          <CategoryBadge category={post.category} />
        </div>

        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

        <p className="text-sm text-gray-500 mb-6">
          Posted by{" "}
          <span className="font-medium text-gray-800">{post.authorName}</span>
          {isOwner && (
            <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              your post
            </span>
          )}
          {" · "}
          {format(new Date(post.createdAt), "MMM d, yyyy")}
        </p>

        {post.description && (
          <p className="text-gray-700 whitespace-pre-wrap mb-8 leading-relaxed">
            {post.description}
          </p>
        )}

        {(post.location || post.eventDate || post.contactInfo) && (
          <div className="bg-gray-50 border rounded-lg p-4 space-y-2 text-sm mb-8">
            {post.eventDate && (
              <p>
                <span className="font-medium">Date: </span>
                {format(new Date(post.eventDate), "MMMM d, yyyy")}
              </p>
            )}
            {post.location && (
              <p>
                <span className="font-medium">Location: </span>
                {post.location}
              </p>
            )}
            {post.contactInfo && (
              <p>
                <span className="font-medium">Contact: </span>
                {post.contactInfo}
              </p>
            )}
          </div>
        )}

        {isOwner && (
          <button
            onClick={handleDelete}
            disabled={deletePost.isPending}
            className="text-red-500 border border-red-300 px-4 py-2 rounded-lg hover:bg-red-50 text-sm disabled:opacity-50"
          >
            {deletePost.isPending ? "Deleting..." : "Delete this post"}
          </button>
        )}
      </div>
    </Layout>
  );
}