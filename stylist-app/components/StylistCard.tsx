import Link from "next/link";
import { Stylist } from "@/lib/data";

export default function StylistCard({ stylist }: { stylist: Stylist }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        overflow: "hidden",
        border: "1px solid #EDE6DC",
        transition: "box-shadow 0.2s, transform 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(24,18,14,0.10)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        (e.currentTarget as HTMLDivElement).style.transform = "none";
      }}
    >
      {/* Cover */}
      <div style={{ height: 110, background: stylist.coverColor, position: "relative" }}>
        {/* Avatar */}
        <div
          style={{
            position: "absolute", bottom: -22, left: 18,
            width: 52, height: 52, borderRadius: "50%",
            border: "3px solid #fff",
            background: stylist.avatar,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 700, fontSize: "1.1rem",
          }}
        >
          {stylist.name.charAt(0)}
        </div>

        {/* Availability badge */}
        <span
          style={{
            position: "absolute", top: 10, right: 10,
            background: stylist.available ? "#2D6A4F" : "#897870",
            color: "#fff", fontSize: "0.68rem",
            padding: "3px 10px", borderRadius: "999px",
            fontFamily: "system-ui, sans-serif", fontWeight: 600,
            letterSpacing: "0.04em",
          }}
        >
          {stylist.available ? "Available" : "Booked"}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "32px 18px 18px" }}>
        <h3 style={{ fontWeight: 700, color: "#18120E", fontSize: "1.05rem", marginBottom: "3px" }}>
          {stylist.name}
        </h3>
        <p style={{ color: "#897870", fontSize: "0.82rem", marginBottom: "12px", fontFamily: "system-ui, sans-serif", fontStyle: "italic" }}>
          {stylist.tagline}
        </p>

        {/* Specialty tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "14px" }}>
          {stylist.specialty.slice(0, 2).map((s) => (
            <span
              key={s}
              style={{
                background: "#F5EDE7", color: "#BF6B4A",
                fontSize: "0.7rem", padding: "3px 10px", borderRadius: "999px",
                fontFamily: "system-ui, sans-serif", fontWeight: 500,
              }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Meta row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", fontFamily: "system-ui, sans-serif", fontSize: "0.82rem" }}>
            <span style={{ color: "#BF6B4A" }}>★</span>
            <span style={{ fontWeight: 600, color: "#18120E" }}>{stylist.rating}</span>
            <span style={{ color: "#C9BAB0" }}>({stylist.reviews})</span>
          </div>
          <span style={{ color: "#18120E", fontWeight: 700, fontFamily: "system-ui, sans-serif", fontSize: "0.88rem" }}>
            ${stylist.price}<span style={{ color: "#C9BAB0", fontWeight: 400 }}>/hr</span>
          </span>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "8px" }}>
          <Link
            href={`/stylist/${stylist.id}`}
            style={{
              flex: 1, textAlign: "center", fontSize: "0.8rem",
              border: "1.5px solid #EDE6DC", color: "#18120E",
              padding: "8px 0", borderRadius: "999px",
              fontFamily: "system-ui, sans-serif", textDecoration: "none",
              transition: "background 0.15s",
            }}
          >
            View Profile
          </Link>
          {stylist.available && (
            <Link
              href={`/book/${stylist.id}`}
              style={{
                flex: 1, textAlign: "center", fontSize: "0.8rem",
                background: "#BF6B4A", color: "#fff",
                padding: "8px 0", borderRadius: "999px",
                fontFamily: "system-ui, sans-serif", fontWeight: 500, textDecoration: "none",
              }}
            >
              Book
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
