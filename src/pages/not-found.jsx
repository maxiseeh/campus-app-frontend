import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-4 bg-white border rounded-lg p-6">
        <div className="flex mb-4 gap-2">
          <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
        </div>
        <p className="text-sm text-gray-600">
          Did you forget to add the page to the router?
        </p>
        <Link href="/" className="inline-block mt-4 text-green-600 hover:underline text-sm">
          Go back home
        </Link>
      </div>
    </div>
  );
}