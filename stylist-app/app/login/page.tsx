"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    // Simulate auth — replace with real auth logic
    setTimeout(() => {
      setLoading(false);
      setError("Invalid email or password. (Demo mode — no real auth yet)");
    }, 1000);
  }

  return (
    <main className="min-h-screen bg-[#faf9f7] flex flex-col">
      {/* Nav */}
      <nav className="px-6 py-5 border-b border-stone-200 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          StyleBook
        </Link>
        <p className="text-sm text-stone-500">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-stone-900 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </nav>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-stone-900 mb-2">Welcome back</h1>
            <p className="text-stone-500">Log in to manage your bookings and profile.</p>
          </div>

          {/* Social logins */}
          <div className="space-y-3 mb-8">
            <button className="w-full flex items-center justify-center gap-3 border border-stone-200 rounded-xl py-3 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors">
              <GoogleIcon />
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 border border-stone-200 rounded-xl py-3 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors">
              <AppleIcon />
              Continue with Apple
            </button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-xs text-stone-400 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-stone-700">
                  Password
                </label>
                <Link href="#" className="text-xs text-stone-500 hover:text-stone-800 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 transition"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-stone-900 text-white py-3 rounded-xl font-medium hover:bg-stone-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Logging in…" : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.96L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
      <path d="M14.535 9.56c-.022-2.295 1.875-3.408 1.96-3.461-1.07-1.563-2.732-1.777-3.322-1.797-1.407-.144-2.754.838-3.467.838-.724 0-1.835-.82-3.02-.797C5.03 4.367 3.43 5.449 2.556 7.093c-1.773 3.066-.455 7.608 1.267 10.099.843 1.22 1.845 2.586 3.155 2.537 1.27-.052 1.748-.817 3.283-.817 1.524 0 1.96.817 3.293.79 1.365-.023 2.23-1.24 3.064-2.465.97-1.414 1.368-2.786 1.39-2.856-.03-.014-2.661-1.022-2.687-4.055l.214.234z"/>
      <path d="M12.19 2.987c.7-.853 1.174-2.036 1.044-3.217-1.01.042-2.228.674-2.95 1.526-.649.752-1.218 1.953-1.065 3.107 1.126.088 2.274-.574 2.971-1.416z"/>
    </svg>
  );
}
