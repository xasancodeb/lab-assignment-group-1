"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  getUser,
  getBookings,
  showToast,
  setUser as saveUser,
  type User,
  type Booking,
} from "@/lib/store";

type Tab = "overview" | "bookings" | "profile";

const DEMO_STATS = [
  { label: "Total Sessions", value: "47" },
  { label: "Avg Rating", value: "4.9★" },
  { label: "This Month", value: "$3,240" },
  { label: "Repeat Clients", value: "68%" },
];

export default function StylistDashboardPage() {
  const router = useRouter();
  const [user, setUserState] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tab, setTab] = useState<Tab>("overview");
  const [available, setAvailable] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: "", email: "", bio: "", location: "" });

  useEffect(() => {
    const u = getUser();
    if (!u) { router.replace("/login"); return; }
    setUserState(u);
    setProfileForm({ name: u.name, email: u.email, bio: u.bio ?? "", location: u.location ?? "" });
    // Filter bookings relevant to this stylist (demo: show all)
    setBookings(getBookings());
  }, [router]);

  function handleProfileSave(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    const updated = { ...user, ...profileForm };
    saveUser(updated);
    setUserState(updated);
    setEditMode(false);
    showToast("Profile updated!");
  }

  function toggleAvailability() {
    setAvailable((a) => !a);
    showToast(available ? "Marked as unavailable." : "You're now available for bookings!", available ? "info" : "success");
  }

  if (!user) return null;

  const upcoming = bookings.filter((b) => b.status === "upcoming");
  const past = bookings.filter((b) => b.status !== "upcoming");

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#FAF7F2", fontFamily: "Georgia, serif" }}>
      <Navbar />

      {/* Header */}
      <div style={{ background: "#18120E", paddingTop: "5rem", paddingBottom: "2.5rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <div className="max-w-6xl mx-auto">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
              <div
                style={{
                  width: 64, height: 64, borderRadius: "50%",
                  background: user.avatar ?? "#8B9DC3",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: "1.5rem", fontWeight: 700, flexShrink: 0,
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p style={{ color: "#BF6B4A", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "system-ui, sans-serif", marginBottom: "4px" }}>
                  Stylist Dashboard
                </p>
                <h1 style={{ color: "#FAF7F2", fontSize: "1.75rem", fontWeight: 700, margin: 0 }}>
                  {user.name}
                </h1>
                {user.bio && <p style={{ color: "#897870", fontSize: "0.875rem", fontFamily: "system-ui, sans-serif", margin: "4px 0 0" }}>{user.bio}</p>}
              </div>
            </div>

            {/* Availability toggle */}
            <button
              onClick={toggleAvailability}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "999px",
                border: "none",
                background: available ? "#E8F5EE" : "#F5EDE7",
                color: available ? "#2D6A4F" : "#897870",
                fontFamily: "system-ui, sans-serif",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: available ? "#2D6A4F" : "#C9BAB0", display: "inline-block" }} />
              {available ? "Available" : "Unavailable"}
            </button>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", flexWrap: "wrap" }}>
            {DEMO_STATS.map(({ label, value }) => (
              <div key={label}>
                <p style={{ color: "#FAF7F2", fontSize: "1.5rem", fontWeight: 700, margin: 0, lineHeight: 1 }}>{value}</p>
                <p style={{ color: "#897870", fontSize: "0.75rem", fontFamily: "system-ui, sans-serif", margin: "4px 0 0" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "#18120E", borderBottom: "1px solid #2E2018" }}>
        <div className="max-w-6xl mx-auto" style={{ display: "flex", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
          {(["overview", "bookings", "profile"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "0.875rem 1.25rem",
                background: "transparent",
                border: "none",
                borderBottom: tab === t ? "2px solid #BF6B4A" : "2px solid transparent",
                color: tab === t ? "#FAF7F2" : "#897870",
                fontFamily: "system-ui, sans-serif",
                fontSize: "0.875rem",
                fontWeight: tab === t ? 600 : 400,
                cursor: "pointer",
                textTransform: "capitalize",
                marginBottom: "-1px",
              }}
            >
              {t === "bookings" ? `Bookings (${upcoming.length})` : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto" style={{ padding: "2.5rem 1.5rem" }}>

        {/* ── Overview ── */}
        {tab === "overview" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
              {[
                { icon: "📅", title: "Upcoming Sessions", desc: `${upcoming.length} session${upcoming.length !== 1 ? "s" : ""} scheduled` },
                { icon: "💬", title: "New Messages", desc: "2 unread conversations" },
                { icon: "⭐", title: "Latest Review", desc: '"Professional, punctual, and incredibly talented."' },
                { icon: "💰", title: "Payout Pending", desc: "$340 to be released Friday" },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  style={{ background: "#fff", border: "1px solid #EDE6DC", borderRadius: "16px", padding: "1.5rem" }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{icon}</div>
                  <h3 style={{ fontWeight: 700, color: "#18120E", fontSize: "0.95rem", margin: "0 0 4px" }}>{title}</h3>
                  <p style={{ color: "#897870", fontSize: "0.85rem", fontFamily: "system-ui, sans-serif", margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#18120E", marginBottom: "1rem" }}>Quick Actions</h2>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {[
                { label: "View Messages", href: "/messages" },
                { label: "View My Profile", href: `/stylist/1` },
                { label: "Browse Platform", href: "/browse" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  style={{ display: "inline-block", border: "1px solid #EDE6DC", color: "#18120E", padding: "8px 20px", borderRadius: "999px", fontSize: "0.875rem", fontFamily: "system-ui, sans-serif", textDecoration: "none", background: "#fff" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F5EDE7")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Bookings ── */}
        {tab === "bookings" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {bookings.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem 1.5rem" }}>
                <p style={{ color: "#897870", fontFamily: "system-ui, sans-serif" }}>No bookings yet. Clients will appear here once they book with you.</p>
              </div>
            ) : (
              <>
                {upcoming.length > 0 && (
                  <>
                    <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#18120E", marginBottom: "0.5rem" }}>Upcoming</h2>
                    {upcoming.map((b) => (
                      <div
                        key={b.id}
                        style={{ background: "#fff", border: "1px solid #EDE6DC", borderRadius: "16px", padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}
                      >
                        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#BF6B4A", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, flexShrink: 0 }}>
                          C
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontWeight: 700, color: "#18120E", margin: 0, fontSize: "0.95rem" }}>Client Session</p>
                          <p style={{ color: "#897870", fontSize: "0.8rem", fontFamily: "system-ui, sans-serif", margin: "2px 0" }}>
                            {b.service} · {b.date} at {b.time}
                          </p>
                        </div>
                        <span style={{ background: "#E8F5EE", color: "#2D6A4F", fontSize: "0.7rem", fontFamily: "system-ui, sans-serif", fontWeight: 600, padding: "3px 10px", borderRadius: "999px" }}>
                          Upcoming
                        </span>
                      </div>
                    ))}
                  </>
                )}
                {past.length > 0 && (
                  <>
                    <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#897870", marginTop: "1.5rem", marginBottom: "0.5rem" }}>Past</h2>
                    {past.map((b) => (
                      <div
                        key={b.id}
                        style={{ background: "#fff", border: "1px solid #EDE6DC", borderRadius: "16px", padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", opacity: 0.7 }}
                      >
                        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#C9BAB0", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, flexShrink: 0 }}>
                          C
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontWeight: 700, color: "#18120E", margin: 0, fontSize: "0.95rem" }}>Client Session</p>
                          <p style={{ color: "#897870", fontSize: "0.8rem", fontFamily: "system-ui, sans-serif", margin: "2px 0" }}>
                            {b.service} · {b.date} at {b.time}
                          </p>
                        </div>
                        <span style={{ background: "#F5EDE7", color: "#897870", fontSize: "0.7rem", fontFamily: "system-ui, sans-serif", fontWeight: 600, padding: "3px 10px", borderRadius: "999px", textTransform: "capitalize" }}>
                          {b.status}
                        </span>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        )}

        {/* ── Profile ── */}
        {tab === "profile" && (
          <div style={{ maxWidth: 520 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#18120E", margin: 0 }}>Stylist Profile</h2>
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  style={{ background: "transparent", border: "1px solid #EDE6DC", borderRadius: "8px", padding: "6px 16px", fontSize: "0.875rem", fontFamily: "system-ui, sans-serif", color: "#18120E", cursor: "pointer" }}
                >
                  Edit
                </button>
              )}
            </div>

            {editMode ? (
              <form onSubmit={handleProfileSave} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { label: "Full Name", field: "name", type: "text" },
                  { label: "Email", field: "email", type: "email" },
                  { label: "Location", field: "location", type: "text" },
                ].map(({ label, field, type }) => (
                  <div key={field}>
                    <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#18120E", marginBottom: "6px", fontFamily: "system-ui, sans-serif" }}>{label}</label>
                    <input
                      type={type}
                      value={profileForm[field as keyof typeof profileForm]}
                      onChange={(e) => setProfileForm((f) => ({ ...f, [field]: e.target.value }))}
                      style={{ width: "100%", border: "1px solid #EDE6DC", borderRadius: "12px", padding: "10px 14px", fontSize: "1rem", color: "#18120E", background: "#fff", outline: "none", boxSizing: "border-box" }}
                      onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px #BF6B4A")}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#18120E", marginBottom: "6px", fontFamily: "system-ui, sans-serif" }}>Tagline / Bio</label>
                  <textarea
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm((f) => ({ ...f, bio: e.target.value }))}
                    rows={3}
                    style={{ width: "100%", border: "1px solid #EDE6DC", borderRadius: "12px", padding: "10px 14px", fontSize: "1rem", color: "#18120E", background: "#fff", outline: "none", boxSizing: "border-box", resize: "vertical" }}
                    onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px #BF6B4A")}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  />
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button type="submit" style={{ background: "#BF6B4A", color: "#fff", border: "none", borderRadius: "999px", padding: "10px 24px", fontSize: "0.875rem", fontFamily: "system-ui, sans-serif", fontWeight: 500, cursor: "pointer" }}>
                    Save Changes
                  </button>
                  <button type="button" onClick={() => setEditMode(false)} style={{ background: "transparent", color: "#897870", border: "1px solid #EDE6DC", borderRadius: "999px", padding: "10px 24px", fontSize: "0.875rem", fontFamily: "system-ui, sans-serif", cursor: "pointer" }}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  { label: "Full Name", value: user.name },
                  { label: "Email", value: user.email },
                  { label: "Location", value: user.location || "Not set" },
                  { label: "Bio / Tagline", value: user.bio || "No bio yet." },
                ].map(({ label, value }) => (
                  <div key={label} style={{ borderBottom: "1px solid #EDE6DC", paddingBottom: "1rem" }}>
                    <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#897870", fontFamily: "system-ui, sans-serif", marginBottom: "4px" }}>{label}</p>
                    <p style={{ color: "#18120E", fontSize: "1rem", margin: 0, fontFamily: "system-ui, sans-serif" }}>{value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
