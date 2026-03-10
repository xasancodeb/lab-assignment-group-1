"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  getUser,
  setUser as persistUser,
  getBookings,
  getSaved,
  cancelBooking,
  showToast,
  type User,
  type Booking,
} from "@/lib/store";
import { stylists } from "@/lib/data";

type Tab = "bookings" | "saved" | "profile";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [tab, setTab] = useState<Tab>("bookings");
  const [editMode, setEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: "", email: "", bio: "" });

  useEffect(() => {
    const u = getUser();
    if (!u) { router.replace("/login"); return; }
    setUser(u);
    setProfileForm({ name: u.name, email: u.email, bio: u.bio ?? "" });
    setBookings(getBookings());
    setSaved(getSaved());
  }, [router]);

  function handleCancel(id: string) {
    cancelBooking(id);
    setBookings(getBookings());
    showToast("Booking cancelled.", "info");
  }

  function handleProfileSave(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    const updated = { ...user, name: profileForm.name, email: profileForm.email, bio: profileForm.bio };
    persistUser(updated);
    setUser(updated);
    setEditMode(false);
    showToast("Profile updated!");
  }

  const savedStylists = stylists.filter((s) => saved.includes(s.id));

  if (!user) return null;

  const upcoming = bookings.filter((b) => b.status === "upcoming");
  const past = bookings.filter((b) => b.status !== "upcoming");

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#FAF7F2", fontFamily: "Georgia, serif" }}>
      <Navbar active="dashboard" />

      {/* Header */}
      <div style={{ background: "#18120E", paddingTop: "5rem", paddingBottom: "2.5rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <div className="max-w-6xl mx-auto" style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <div
            style={{
              width: 64, height: 64, borderRadius: "50%",
              background: user.avatar ?? "#BF6B4A",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: "1.5rem", fontWeight: 700, flexShrink: 0,
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p style={{ color: "#BF6B4A", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "system-ui, sans-serif", marginBottom: "4px" }}>
              My Dashboard
            </p>
            <h1 style={{ color: "#FAF7F2", fontSize: "1.75rem", fontWeight: 700, margin: 0 }}>
              Welcome, {user.name.split(" ")[0]}
            </h1>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "#18120E", borderBottom: "1px solid #2E2018" }}>
        <div className="max-w-6xl mx-auto" style={{ display: "flex", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
          {(["bookings", "saved", "profile"] as Tab[]).map((t) => (
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
              {t === "bookings" ? `Bookings (${upcoming.length})` : t === "saved" ? `Saved (${savedStylists.length})` : "Profile"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto" style={{ padding: "2.5rem 1.5rem" }}>

        {/* ── Bookings Tab ── */}
        {tab === "bookings" && (
          <div>
            {bookings.length === 0 ? (
              <EmptyState
                title="No bookings yet"
                desc="Browse stylists and book your first session."
                cta="Browse Stylists"
                href="/browse"
              />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {upcoming.length > 0 && (
                  <>
                    <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#18120E", marginBottom: "0.5rem" }}>Upcoming</h2>
                    {upcoming.map((b) => <BookingCard key={b.id} booking={b} onCancel={handleCancel} />)}
                  </>
                )}
                {past.length > 0 && (
                  <>
                    <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#897870", marginTop: "1.5rem", marginBottom: "0.5rem" }}>Past</h2>
                    {past.map((b) => <BookingCard key={b.id} booking={b} onCancel={handleCancel} />)}
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Saved Tab ── */}
        {tab === "saved" && (
          <div>
            {savedStylists.length === 0 ? (
              <EmptyState
                title="No saved stylists"
                desc="Heart a stylist while browsing to save them here."
                cta="Browse Stylists"
                href="/browse"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {savedStylists.map((s) => (
                  <Link key={s.id} href={`/stylist/${s.id}`} style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        background: "#fff",
                        borderRadius: "16px",
                        overflow: "hidden",
                        border: "1px solid #EDE6DC",
                        transition: "box-shadow 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(24,18,14,0.1)")}
                      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                    >
                      <div style={{ height: 80, background: s.coverColor }} />
                      <div style={{ padding: "1rem" }}>
                        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginTop: "-28px", marginBottom: "0.75rem" }}>
                          <div style={{ width: 48, height: 48, borderRadius: "50%", background: s.avatar, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, border: "3px solid #fff" }}>
                            {s.name.charAt(0)}
                          </div>
                        </div>
                        <p style={{ fontWeight: 700, color: "#18120E", margin: 0, fontSize: "0.95rem" }}>{s.name}</p>
                        <p style={{ color: "#897870", fontSize: "0.8rem", fontFamily: "system-ui, sans-serif", margin: "2px 0 8px" }}>{s.tagline}</p>
                        <p style={{ color: "#BF6B4A", fontSize: "0.8rem", fontFamily: "system-ui, sans-serif", fontWeight: 600 }}>★ {s.rating} · ${s.price}/hr</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Profile Tab ── */}
        {tab === "profile" && (
          <div style={{ maxWidth: 520 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#18120E", margin: 0 }}>Your Profile</h2>
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
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#18120E", marginBottom: "6px", fontFamily: "system-ui, sans-serif" }}>Bio</label>
                  <textarea
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm((f) => ({ ...f, bio: e.target.value }))}
                    rows={3}
                    placeholder="Tell us about your style..."
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
                  { label: "Account Type", value: user.role === "stylist" ? "Stylist" : "Customer" },
                  { label: "Bio", value: user.bio || "No bio yet." },
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

function BookingCard({ booking, onCancel }: { booking: Booking; onCancel: (id: string) => void }) {
  const statusColor = booking.status === "upcoming" ? "#2D6A4F" : booking.status === "cancelled" ? "#9B3E28" : "#897870";
  const statusBg = booking.status === "upcoming" ? "#E8F5EE" : booking.status === "cancelled" ? "#FEF2EE" : "#F5EDE7";

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #EDE6DC",
        borderRadius: "16px",
        padding: "1.25rem 1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div
        style={{
          width: 48, height: 48, borderRadius: "50%",
          background: booking.stylistAvatar,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontWeight: 700, fontSize: "1.1rem", flexShrink: 0,
        }}
      >
        {booking.stylistName.charAt(0)}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 700, color: "#18120E", margin: 0, fontSize: "0.95rem" }}>{booking.stylistName}</p>
        <p style={{ color: "#897870", fontSize: "0.8rem", fontFamily: "system-ui, sans-serif", margin: "2px 0" }}>
          {booking.service} · {booking.date} at {booking.time}
        </p>
        <p style={{ color: "#BF6B4A", fontSize: "0.8rem", fontFamily: "system-ui, sans-serif", fontWeight: 600, margin: 0 }}>
          ${booking.price}
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem", flexShrink: 0 }}>
        <span style={{ background: statusBg, color: statusColor, fontSize: "0.7rem", fontFamily: "system-ui, sans-serif", fontWeight: 600, padding: "3px 10px", borderRadius: "999px", textTransform: "capitalize" }}>
          {booking.status}
        </span>
        {booking.status === "upcoming" && (
          <button
            onClick={() => onCancel(booking.id)}
            style={{ background: "transparent", border: "none", color: "#9B3E28", fontSize: "0.75rem", fontFamily: "system-ui, sans-serif", cursor: "pointer", padding: 0 }}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

function EmptyState({ title, desc, cta, href }: { title: string; desc: string; cta: string; href: string }) {
  return (
    <div style={{ textAlign: "center", padding: "4rem 1.5rem" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#F5EDE7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", margin: "0 auto 1rem" }}>
        ✦
      </div>
      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#18120E", marginBottom: "0.5rem" }}>{title}</h3>
      <p style={{ color: "#897870", fontFamily: "system-ui, sans-serif", marginBottom: "1.5rem" }}>{desc}</p>
      <Link
        href={href}
        style={{ display: "inline-block", background: "#BF6B4A", color: "#fff", padding: "10px 24px", borderRadius: "999px", fontSize: "0.875rem", fontFamily: "system-ui, sans-serif", fontWeight: 500, textDecoration: "none" }}
      >
        {cta}
      </Link>
    </div>
  );
}
