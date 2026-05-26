import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/auth";

export function Layout({ children }) {
  const { user, setUser } = useAuth();
  const [, setLocation] = useLocation();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
    setLocation("/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80">
            <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold text-sm">
              CB
            </div>
            <span className="font-bold text-lg">Campus Board</span>
          </Link>

          <nav className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-gray-600">
                  Hi, <span className="font-medium text-gray-800">{user.username}</span>
                </span>
                <Link
                  href="/new"
                  className="bg-green-600 text-white text-sm px-4 py-1.5 rounded-lg hover:bg-green-700"
                >
                  New Post
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-500 hover:text-gray-800 border rounded-lg px-3 py-1.5"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="bg-green-600 text-white text-sm px-4 py-1.5 rounded-lg hover:bg-green-700"
                >
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t py-5 bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Campus Board — Moringa School
        </div>
      </footer>
    </div>
  );
}
