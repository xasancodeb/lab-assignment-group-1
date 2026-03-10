"use client";
import { useState } from "react";
import Link from "next/link";

type Role = "customer" | "stylist";

export default function SignupPage() {
  const [role, setRole] = useState<Role>("customer");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    // stylist-only
    tagline: "",
    location: "",
    rate: "",
  });
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validateStep1() {
    if (!form.name.trim()) return "Full name is required.";
    if (!form.email.includes("@")) return "Enter a valid email.";
    if (form.password.length < 8) return "Password must be at least 8 characters.";
    if (form.password !== form.confirm) return "Passwords don't match.";
    return "";
  }

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    const err = validateStep1();
    if (err) { setError(err); return; }
    setError("");
    if (role === "stylist") { setStep(2); } else { setDone(true); }
  }

  function handleFinish(e: React.FormEvent) {
    e.preventDefault();
    if (!form.tagline.trim() || !form.location.trim() || !form.rate) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setDone(true);
  }

  if (done) {
    return (
      <main className="min-h-screen bg-[#faf9f7] flex flex-col">
        <nav className="px-6 py-5 border-b border-stone-200">
          <Link href="/" className="text-xl font-bold tracking-tight">StyleBook</Link>
        </nav>
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
            <h2 className="text-2xl font-bold text-stone-900 mb-3">Account created!</h2>
            <p className="text-stone-500 mb-8">
              Welcome to StyleBook, <strong>{form.name.split(" ")[0]}</strong>.{" "}
              {role === "stylist"
                ? "Your stylist profile is under review and will go live within 24 hours."
                : "Start browsing stylists and book your first session."}
            </p>
            <Link
              href={role === "customer" ? "/browse" : "/"}
              className="bg-stone-900 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-stone-700 transition-colors"
            >
              {role === "customer" ? "Browse Stylists" : "Go to Home"}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f7] flex flex-col">
      <nav className="px-6 py-5 border-b border-stone-200 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">StyleBook</Link>
        <p className="text-sm text-stone-500">
          Already have an account?{" "}
          <Link href="/login" className="text-stone-900 font-medium hover:underline">Log in</Link>
        </p>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-stone-900 mb-2">Create your account</h1>
            <p className="text-stone-500">Join thousands of people transforming their style.</p>
          </div>

          {/* Role toggle */}
          {step === 1 && (
            <div className="flex gap-2 bg-stone-100 rounded-xl p-1 mb-8">
              {(["customer", "stylist"] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    role === r ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-700"
                  }`}
                >
                  {r === "customer" ? "I want styling help" : "I'm a stylist"}
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <>
              {/* Social */}
              <div className="space-y-3 mb-8">
                <button className="w-full flex items-center justify-center gap-3 border border-stone-200 rounded-xl py-3 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors">
                  <GoogleIcon />
                  Continue with Google
                </button>
              </div>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-stone-200" />
                <span className="text-xs text-stone-400 uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-stone-200" />
              </div>

              <form onSubmit={handleContinue} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Password</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Confirm Password</label>
                  <input
                    type="password"
                    value={form.confirm}
                    onChange={(e) => update("confirm", e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 transition"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-stone-900 text-white py-3 rounded-xl font-medium hover:bg-stone-700 transition-colors mt-2"
                >
                  {role === "stylist" ? "Continue →" : "Create Account"}
                </button>

                <p className="text-xs text-center text-stone-400">
                  By signing up you agree to our{" "}
                  <Link href="#" className="underline">Terms</Link> and{" "}
                  <Link href="#" className="underline">Privacy Policy</Link>.
                </p>
              </form>
            </>
          )}

          {/* Step 2: Stylist profile */}
          {step === 2 && (
            <form onSubmit={handleFinish} className="space-y-4">
              <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-sm text-amber-800 mb-2">
                Tell customers about your style — this becomes your public profile.
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Your Tagline</label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={(e) => update("tagline", e.target.value)}
                  placeholder='e.g. "Minimal, effortless, timeless"'
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Location</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="New York, NY"
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Hourly Rate (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">$</span>
                  <input
                    type="number"
                    value={form.rate}
                    onChange={(e) => update("rate", e.target.value)}
                    placeholder="75"
                    min="1"
                    className="w-full border border-stone-200 rounded-xl pl-8 pr-4 py-3 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 transition"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setStep(1); setError(""); }}
                  className="flex-1 border border-stone-200 text-stone-700 py-3 rounded-xl font-medium hover:bg-stone-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-stone-900 text-white py-3 rounded-xl font-medium hover:bg-stone-700 transition-colors"
                >
                  Create Account
                </button>
              </div>
            </form>
          )}
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
