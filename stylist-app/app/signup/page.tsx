"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { setUser, showToast } from "@/lib/store";

type Role = "customer" | "stylist";

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #EDE6DC",
  borderRadius: "12px",
  padding: "12px 16px",
  fontSize: "1rem",
  color: "#18120E",
  backgroundColor: "white",
  outline: "none",
  boxSizing: "border-box",
};

export default function SignupPage() {
  const router = useRouter();
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
    if (role === "stylist") {
      setStep(2);
    } else {
      setUser({ id: `u_${Date.now()}`, name: form.name, email: form.email, role: "customer", avatar: "#BF6B4A" });
      showToast(`Welcome to StyleBook, ${form.name}!`);
      setDone(true);
    }
  }

  function handleFinish(e: React.FormEvent) {
    e.preventDefault();
    if (!form.tagline.trim() || !form.location.trim() || !form.rate) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setUser({ id: `u_${Date.now()}`, name: form.name, email: form.email, role: "stylist", avatar: "#8B9DC3", location: form.location, bio: form.tagline });
    showToast(`Welcome to StyleBook, ${form.name}!`);
    setDone(true);
  }

  if (done) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "#FAF7F2", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
          <div style={{ maxWidth: "448px", width: "100%", textAlign: "center" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                backgroundColor: "#E8F5EE",
                borderRadius: "9999px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
                fontSize: "1.75rem",
                color: "#2D6A4F",
              }}
            >
              ✓
            </div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#18120E", marginBottom: "12px" }}>Account created!</h2>
            <p style={{ color: "#897870", marginBottom: "32px" }}>
              Welcome to StyleBook, <strong style={{ color: "#18120E" }}>{form.name.split(" ")[0]}</strong>.{" "}
              {role === "stylist"
                ? "Your stylist profile is under review and will go live within 24 hours."
                : "Start browsing stylists and book your first session."}
            </p>
            <Link
              href={role === "customer" ? "/dashboard" : "/stylist-dashboard"}
              style={{
                display: "inline-block",
                backgroundColor: "#BF6B4A",
                color: "white",
                padding: "12px 32px",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              {role === "customer" ? "Browse Stylists" : "Go to Home"}
            </Link>
          </div>
        </div>
      </main>
    );
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
          className="signup-left-panel"
        >
          <blockquote style={{ color: "#FAF7F2" }}>
            <p style={{ fontSize: "2rem", fontWeight: 700, lineHeight: 1.2, marginBottom: "24px", letterSpacing: "-0.01em" }}>
              &ldquo;Fashion is the armor to survive the reality of everyday life.&rdquo;
            </p>
            <cite style={{ fontSize: "0.875rem", color: "#897870", fontStyle: "normal" }}>— Bill Cunningham</cite>
          </blockquote>
        </div>

        {/* Right: form */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
          <div style={{ width: "100%", maxWidth: "448px" }}>
            <div style={{ marginBottom: "32px" }}>
              <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#18120E", marginBottom: "8px" }}>Create your account</h1>
              <p style={{ color: "#897870" }}>Join thousands of people transforming their style.</p>
            </div>

            {/* Role toggle */}
            {step === 1 && (
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  backgroundColor: "#F5EDE7",
                  borderRadius: "12px",
                  padding: "4px",
                  marginBottom: "32px",
                }}
              >
                {(["customer", "stylist"] as Role[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    style={{
                      flex: 1,
                      padding: "10px 16px",
                      borderRadius: "9px",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      border: "none",
                      cursor: "pointer",
                      transition: "background-color 0.15s, color 0.15s",
                      backgroundColor: role === r ? "#BF6B4A" : "transparent",
                      color: role === r ? "white" : "#897870",
                    }}
                  >
                    {r === "customer" ? "I want styling help" : "I'm a stylist"}
                  </button>
                ))}
              </div>
            )}

            {step === 1 && (
              <>
                {/* Social */}
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
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
                  <div style={{ flex: 1, height: "1px", backgroundColor: "#EDE6DC" }} />
                  <span style={{ fontSize: "0.75rem", color: "#897870", textTransform: "uppercase", letterSpacing: "0.05em" }}>or</span>
                  <div style={{ flex: 1, height: "1px", backgroundColor: "#EDE6DC" }} />
                </div>

                <form onSubmit={handleContinue} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#18120E", marginBottom: "6px" }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Jane Smith"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px #BF6B4A")}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#18120E", marginBottom: "6px" }}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@example.com"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px #BF6B4A")}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#18120E", marginBottom: "6px" }}>
                      Password
                    </label>
                    <input
                      type="password"
                      value={form.password}
                      onChange={(e) => update("password", e.target.value)}
                      placeholder="Min. 8 characters"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px #BF6B4A")}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#18120E", marginBottom: "6px" }}>
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={form.confirm}
                      onChange={(e) => update("confirm", e.target.value)}
                      placeholder="••••••••"
                      style={inputStyle}
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
                    style={{
                      width: "100%",
                      backgroundColor: "#BF6B4A",
                      color: "white",
                      padding: "12px 16px",
                      borderRadius: "9999px",
                      fontWeight: 500,
                      border: "none",
                      cursor: "pointer",
                      marginTop: "8px",
                      fontSize: "1rem",
                      transition: "background-color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#A85A3B")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#BF6B4A")}
                  >
                    {role === "stylist" ? "Continue →" : "Create Account"}
                  </button>

                  <p style={{ fontSize: "0.75rem", textAlign: "center", color: "#897870" }}>
                    By signing up you agree to our{" "}
                    <Link href="#" style={{ color: "#BF6B4A", textDecoration: "underline" }}>Terms</Link> and{" "}
                    <Link href="#" style={{ color: "#BF6B4A", textDecoration: "underline" }}>Privacy Policy</Link>.
                  </p>
                </form>
              </>
            )}

            {/* Step 2: Stylist profile */}
            {step === 2 && (
              <form onSubmit={handleFinish} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div
                  style={{
                    backgroundColor: "#F5EDE7",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    fontSize: "0.875rem",
                    color: "#BF6B4A",
                    marginBottom: "8px",
                  }}
                >
                  Tell customers about your style — this becomes your public profile.
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#18120E", marginBottom: "6px" }}>
                    Your Tagline
                  </label>
                  <input
                    type="text"
                    value={form.tagline}
                    onChange={(e) => update("tagline", e.target.value)}
                    placeholder='e.g. "Minimal, effortless, timeless"'
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px #BF6B4A")}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#18120E", marginBottom: "6px" }}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    placeholder="New York, NY"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px #BF6B4A")}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#18120E", marginBottom: "6px" }}>
                    Hourly Rate (USD)
                  </label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#897870" }}>$</span>
                    <input
                      type="number"
                      value={form.rate}
                      onChange={(e) => update("rate", e.target.value)}
                      placeholder="75"
                      min="1"
                      style={{ ...inputStyle, paddingLeft: "32px" }}
                      onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px #BF6B4A")}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </div>
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

                <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
                  <button
                    type="button"
                    onClick={() => { setStep(1); setError(""); }}
                    style={{
                      flex: 1,
                      border: "1px solid #EDE6DC",
                      color: "#18120E",
                      padding: "12px 16px",
                      borderRadius: "9999px",
                      fontWeight: 500,
                      backgroundColor: "white",
                      cursor: "pointer",
                      fontSize: "1rem",
                      transition: "background-color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F5EDE7")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      backgroundColor: "#BF6B4A",
                      color: "white",
                      padding: "12px 16px",
                      borderRadius: "9999px",
                      fontWeight: 500,
                      border: "none",
                      cursor: "pointer",
                      fontSize: "1rem",
                      transition: "background-color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#A85A3B")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#BF6B4A")}
                  >
                    Create Account
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .signup-left-panel {
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
