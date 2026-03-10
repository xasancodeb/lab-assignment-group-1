"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { setUser, showToast } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
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
    setTimeout(() => {
      setLoading(false);
      // Demo auth: any email/password works
      const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      setUser({
        id: `u_${Date.now()}`,
        name,
        email,
        role: "customer",
        avatar: "#BF6B4A",
      });
      showToast(`Welcome back, ${name}!`);
      router.push("/dashboard");
    }, 900);
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#FAF7F2", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ flex: 1, display: "flex" }}>
        {/* Left: editorial panel */}
        <div
          style={{
            display: "none",
            flex: "0 0 50%",
            backgroundColor: "#18120E",
            padding: "64px 56px",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
          className="login-left-panel"
        >
          <blockquote style={{ color: "#FAF7F2" }}>
            <p style={{ fontSize: "2rem", fontWeight: 700, lineHeight: 1.2, marginBottom: "24px", letterSpacing: "-0.01em" }}>
              &ldquo;Style is a way to say who you are without having to speak.&rdquo;
            </p>
            <cite style={{ fontSize: "0.875rem", color: "#897870", fontStyle: "normal" }}>— Rachel Zoe</cite>
          </blockquote>
        </div>

        {/* Right: form */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
          <div style={{ width: "100%", maxWidth: "448px" }}>
            <div style={{ marginBottom: "32px" }}>
              <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#18120E", marginBottom: "8px" }}>Welcome back</h1>
              <p style={{ color: "#897870" }}>Log in to manage your bookings and profile.</p>
            </div>

            {/* Social logins */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
              <button
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  border: "1px solid #EDE6DC",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#897870",
                  backgroundColor: "white",
                  cursor: "pointer",
                  transition: "background-color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F5EDE7")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                <GoogleIcon />
                Continue with Google
              </button>
              <button
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  border: "1px solid #EDE6DC",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#897870",
                  backgroundColor: "white",
                  cursor: "pointer",
                  transition: "background-color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F5EDE7")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                <AppleIcon />
                Continue with Apple
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
              <div style={{ flex: 1, height: "1px", backgroundColor: "#EDE6DC" }} />
              <span style={{ fontSize: "0.75rem", color: "#897870", textTransform: "uppercase", letterSpacing: "0.05em" }}>or</span>
              <div style={{ flex: 1, height: "1px", backgroundColor: "#EDE6DC" }} />
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#18120E", marginBottom: "6px" }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={{
                    width: "100%",
                    border: "1px solid #EDE6DC",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    fontSize: "1rem",
                    color: "#18120E",
                    backgroundColor: "white",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px #BF6B4A")}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                />
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                  <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "#18120E" }}>
                    Password
                  </label>
                  <Link href="#" style={{ fontSize: "0.75rem", color: "#BF6B4A", textDecoration: "none" }}>
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    border: "1px solid #EDE6DC",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    fontSize: "1rem",
                    color: "#18120E",
                    backgroundColor: "white",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px #BF6B4A")}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                />
              </div>

              {error && (
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#9B3E28",
                    backgroundColor: "#FEF2EE",
                    border: "1px solid #F5C9BC",
                    borderRadius: "12px",
                    padding: "12px 16px",
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  backgroundColor: "#BF6B4A",
                  color: "white",
                  padding: "12px 16px",
                  borderRadius: "9999px",
                  fontWeight: 500,
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.5 : 1,
                  marginTop: "8px",
                  fontSize: "1rem",
                  transition: "background-color 0.15s",
                }}
                onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#A85A3B"; }}
                onMouseLeave={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#BF6B4A"; }}
              >
                {loading ? "Logging in…" : "Log In"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .login-left-panel {
            display: flex !important;
          }
        }
      `}</style>
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
