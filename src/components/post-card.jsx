import { Link } from "wouter";
import { format } from "date-fns";
import { CategoryBadge } from "./CategoryBadge";


export function PostCard({ post }) {
  return (
    <Link
      href={`/post/${post.id}`}
      className="block bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-2">
        <CategoryBadge category={post.category} />
        <span className="text-xs text-gray-400">
          {format(new Date(post.createdAt), "MMM d")}
        </span>
      </div>

      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>

      {post.description && (
        <p className="text-gray-500 text-sm line-clamp-2 mb-3">{post.description}</p>
      )}

      {post.location && (
        <p className="text-xs text-gray-400 mb-1">{post.location}</p>
      )}

      <p className="text-xs text-gray-400 mt-2">By {post.authorName}</p>
    </Link>
  );
}
