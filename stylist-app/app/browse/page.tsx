"use client";
import { useState } from "react";
import { stylists, specialties } from "@/lib/data";
import StylistCard from "@/components/StylistCard";
import Navbar from "@/components/Navbar";

export default function BrowsePage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const filtered = stylists.filter((s) => {
    const matchesSpecialty = activeFilter === "All" || s.specialty.includes(activeFilter);
    const matchesAvail = !showAvailableOnly || s.available;
    return matchesSpecialty && matchesAvail;
  });

  return (
    <main style={{ minHeight: "100vh", background: "#FAF7F2" }}>
      <Navbar active="browse" />

      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "7rem 1.5rem 5rem" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <p style={{ color: "#BF6B4A", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.22em", marginBottom: "0.6rem", fontFamily: "system-ui, sans-serif" }}>
            Discover
          </p>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#18120E", margin: 0 }}>
            Find Your Stylist
          </h1>
          <p style={{ color: "#897870", marginTop: "0.5rem", fontFamily: "system-ui, sans-serif" }}>
            {filtered.length} stylist{filtered.length !== 1 ? "s" : ""} available
          </p>
        </div>

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
            <p style={{ fontSize: "0.85rem", fontFamily: "system-ui, sans-serif" }}>Try adjusting your filters</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {filtered.map((stylist) => (
              <StylistCard key={stylist.id} stylist={stylist} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
