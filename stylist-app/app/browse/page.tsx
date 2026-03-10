"use client";
import { useState, useEffect } from "react";
import { stylists, specialties } from "@/lib/data";
import StylistCard from "@/components/StylistCard";
import Navbar from "@/components/Navbar";
import { getSaved, toggleSaved, showToast } from "@/lib/store";

export default function BrowsePage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    setSaved(getSaved());
  }, []);

  const filtered = stylists.filter((s) => {
    const matchesSpecialty = activeFilter === "All" || s.specialty.includes(activeFilter);
    const matchesAvail = !showAvailableOnly || s.available;
    const matchesSearch =
      !search.trim() ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.tagline.toLowerCase().includes(search.toLowerCase()) ||
      s.specialty.some((sp) => sp.toLowerCase().includes(search.toLowerCase()));
    return matchesSpecialty && matchesAvail && matchesSearch;
  });

  function handleToggleSave(stylistId: string, stylistName: string) {
    const nowSaved = toggleSaved(stylistId);
    setSaved(getSaved());
    showToast(nowSaved ? `${stylistName} saved!` : `${stylistName} removed from saved.`, nowSaved ? "success" : "info");
  }

  return (
    <main style={{ minHeight: "100vh", background: "#FAF7F2" }}>
      <Navbar active="browse" />

      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "7rem 1.5rem 5rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ color: "#BF6B4A", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.22em", marginBottom: "0.6rem", fontFamily: "system-ui, sans-serif" }}>
            Discover
          </p>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#18120E", margin: 0 }}>
            Find Your Stylist
          </h1>
        </div>

        {/* Search bar */}
        <div style={{ position: "relative", maxWidth: 420, marginBottom: "1.5rem" }}>
          <span
            style={{
              position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
              color: "#C9BAB0", fontSize: "0.875rem", pointerEvents: "none",
            }}
          >
            ⌕
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, specialty…"
            style={{
              width: "100%",
              border: "1px solid #EDE6DC",
              borderRadius: "999px",
              padding: "10px 16px 10px 36px",
              fontSize: "0.875rem",
              fontFamily: "system-ui, sans-serif",
              color: "#18120E",
              background: "#fff",
              outline: "none",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px #BF6B4A")}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "transparent", border: "none", cursor: "pointer", color: "#C9BAB0", fontSize: "0.875rem" }}
            >
              ✕
            </button>
          )}
        </div>

        <p style={{ color: "#897870", marginBottom: "1rem", fontFamily: "system-ui, sans-serif", fontSize: "0.875rem" }}>
          {filtered.length} stylist{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "2rem", alignItems: "center" }}>
          {specialties.map((s) => (
            <button
              key={s}
              onClick={() => setActiveFilter(s)}
              style={{
                padding: "7px 18px", borderRadius: "999px", fontSize: "0.82rem",
                fontFamily: "system-ui, sans-serif", cursor: "pointer", transition: "all 0.15s",
                border: activeFilter === s ? "none" : "1.5px solid #EDE6DC",
                background: activeFilter === s ? "#BF6B4A" : "#fff",
                color: activeFilter === s ? "#fff" : "#897870",
                fontWeight: activeFilter === s ? 600 : 400,
              }}
            >
              {s}
            </button>
          ))}
          <label style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "0.82rem", color: "#897870", cursor: "pointer", fontFamily: "system-ui, sans-serif", marginLeft: "auto" }}>
            <input type="checkbox" checked={showAvailableOnly} onChange={(e) => setShowAvailableOnly(e.target.checked)} style={{ accentColor: "#BF6B4A" }} />
            Available only
          </label>
        </div>

        <div style={{ height: "1px", background: "#EDE6DC", marginBottom: "2.5rem" }} />

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem 0", color: "#C9BAB0" }}>
            <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>No stylists found</p>
            <p style={{ fontSize: "0.85rem", fontFamily: "system-ui, sans-serif" }}>Try adjusting your filters or search</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {filtered.map((stylist) => (
              <div key={stylist.id} style={{ position: "relative" }}>
                <StylistCard stylist={stylist} />
                {/* Heart button */}
                <button
                  onClick={(e) => { e.preventDefault(); handleToggleSave(stylist.id, stylist.name); }}
                  title={saved.includes(stylist.id) ? "Remove from saved" : "Save stylist"}
                  style={{
                    position: "absolute",
                    top: "0.75rem",
                    right: "0.75rem",
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    border: "none",
                    background: saved.includes(stylist.id) ? "#BF6B4A" : "rgba(255,255,255,0.9)",
                    color: saved.includes(stylist.id) ? "#fff" : "#897870",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(24,18,14,0.12)",
                    transition: "all 0.2s",
                    zIndex: 10,
                  }}
                >
                  ♥
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
