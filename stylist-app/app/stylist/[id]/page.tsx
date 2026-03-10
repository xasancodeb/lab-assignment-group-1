import Link from "next/link";
import { notFound } from "next/navigation";
import { stylists } from "@/lib/data";
import Navbar from "@/components/Navbar";

export default async function StylistProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const stylist = stylists.find((s) => s.id === id);
  if (!stylist) notFound();

  const reviews = [
    { name: "Taylor M.", rating: 5, comment: "Completely transformed how I think about getting dressed. My drawer actually makes sense now!", date: "Feb 2026" },
    { name: "Jordan K.", rating: 5, comment: "Worth every dollar. I donated 60% of my closet and somehow have way more to wear.", date: "Jan 2026" },
    { name: "Riley S.", rating: 4, comment: "Super knowledgeable and easy to work with. Already booked a second session.", date: "Dec 2025" },
  ];

  const card: React.CSSProperties = {
    background: "#fff", borderRadius: "18px",
    border: "1px solid #EDE6DC", padding: "1.75rem",
    marginBottom: "1.25rem",
  };

  return (
    <main style={{ minHeight: "100vh", background: "#FAF7F2" }}>
      <Navbar />

      <div style={{ maxWidth: "68rem", margin: "0 auto", padding: "7rem 1.5rem 5rem" }}>
        {/* Back */}
        <Link href="/browse" style={{ color: "#897870", fontSize: "0.82rem", fontFamily: "system-ui, sans-serif", textDecoration: "none", display: "inline-block", marginBottom: "1.5rem" }}>
          ← Back to Browse
        </Link>

        {/* Header card */}
        <div style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", border: "1px solid #EDE6DC", marginBottom: "2rem" }}>
          <div style={{ height: 160, background: stylist.coverColor }} />
          <div style={{ padding: "0 2rem 2rem" }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "1.25rem", marginTop: "-3rem", marginBottom: "1.5rem" }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%",
                border: "4px solid #FAF7F2",
                background: stylist.avatar,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 700, fontSize: "1.8rem", flexShrink: 0,
              }}>
                {stylist.name.charAt(0)}
              </div>
              <div style={{ paddingBottom: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <h1 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#18120E", margin: 0 }}>{stylist.name}</h1>
                  <span style={{
                    background: stylist.available ? "#E8F5EE" : "#F5F0EC",
                    color: stylist.available ? "#2D6A4F" : "#897870",
                    fontSize: "0.7rem", padding: "3px 10px", borderRadius: "999px",
                    fontFamily: "system-ui, sans-serif", fontWeight: 600,
                  }}>
                    {stylist.available ? "Available" : "Fully Booked"}
                  </span>
                </div>
                <p style={{ color: "#897870", fontStyle: "italic", margin: "4px 0 0", fontFamily: "Georgia, serif" }}>{stylist.tagline}</p>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", fontFamily: "system-ui, sans-serif", fontSize: "0.85rem", color: "#897870" }}>
              <span>📍 {stylist.location}</span>
              <span>★ <strong style={{ color: "#18120E" }}>{stylist.rating}</strong> ({stylist.reviews} reviews)</span>
              <span>💰 <strong style={{ color: "#18120E" }}>${stylist.price}/hr</strong></span>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "2rem", alignItems: "start" }}>
          {/* Left */}
          <div>
            <div style={card}>
              <h2 style={{ fontWeight: 700, color: "#18120E", fontSize: "1.05rem", marginBottom: "0.75rem" }}>About</h2>
              <p style={{ color: "#6B5E57", lineHeight: 1.8, fontFamily: "system-ui, sans-serif", fontSize: "0.9rem" }}>
                {stylist.name} is a certified personal stylist with a passion for helping people discover their authentic style. With years of experience in wardrobe consulting, personal shopping, and style coaching, they bring a thoughtful, personalized approach to every session. Whether you need a full closet overhaul or just want to organize your drawer, {stylist.name.split(" ")[0]} has you covered.
              </p>
            </div>

            <div style={card}>
              <h2 style={{ fontWeight: 700, color: "#18120E", fontSize: "1.05rem", marginBottom: "1rem" }}>Specialties</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {stylist.specialty.map((s) => (
                  <span key={s} style={{ background: "#F5EDE7", color: "#BF6B4A", fontSize: "0.8rem", padding: "6px 14px", borderRadius: "999px", fontFamily: "system-ui, sans-serif", fontWeight: 500 }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div style={card}>
              <h2 style={{ fontWeight: 700, color: "#18120E", fontSize: "1.05rem", marginBottom: "1.25rem" }}>Reviews</h2>
              {reviews.map((review, i) => (
                <div key={i} style={{ borderBottom: i < reviews.length - 1 ? "1px solid #F0E8E0" : "none", paddingBottom: i < reviews.length - 1 ? "1.25rem" : 0, marginBottom: i < reviews.length - 1 ? "1.25rem" : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ fontWeight: 600, color: "#18120E", fontFamily: "system-ui, sans-serif", fontSize: "0.88rem" }}>{review.name}</span>
                    <span style={{ color: "#C9BAB0", fontSize: "0.75rem", fontFamily: "system-ui, sans-serif" }}>{review.date}</span>
                  </div>
                  <p style={{ color: "#BF6B4A", fontSize: "0.85rem", marginBottom: "0.5rem" }}>{"★".repeat(review.rating)}</p>
                  <p style={{ color: "#897870", fontSize: "0.85rem", lineHeight: 1.7, fontFamily: "system-ui, sans-serif" }}>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Booking sidebar */}
          <div style={{ position: "sticky", top: "6rem" }}>
            <div style={{ background: "#fff", borderRadius: "18px", border: "1px solid #EDE6DC", padding: "1.75rem" }}>
              <p style={{ fontSize: "2rem", fontWeight: 700, color: "#18120E", marginBottom: "0.25rem" }}>
                ${stylist.price}<span style={{ fontSize: "1rem", fontWeight: 400, color: "#C9BAB0" }}>/hr</span>
              </p>
              <p style={{ color: "#897870", fontSize: "0.82rem", fontFamily: "system-ui, sans-serif", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                Session includes consultation, wardrobe audit & outfit building
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "1.5rem", fontFamily: "system-ui, sans-serif", fontSize: "0.83rem", color: "#6B5E57" }}>
                {["In-home or virtual session", "Personalized style report", "Shopping list included", "Free follow-up message"].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#BF6B4A", fontWeight: 700 }}>✓</span> {item}
                  </div>
                ))}
              </div>

              {stylist.available ? (
                <Link
                  href={`/book/${stylist.id}`}
                  style={{
                    display: "block", width: "100%", textAlign: "center",
                    background: "#BF6B4A", color: "#fff",
                    padding: "0.9rem", borderRadius: "999px",
                    fontFamily: "system-ui, sans-serif", fontWeight: 600,
                    fontSize: "0.9rem", textDecoration: "none",
                  }}
                >
                  Book a Session
                </Link>
              ) : (
                <div style={{
                  width: "100%", textAlign: "center",
                  background: "#F0E8E0", color: "#C9BAB0",
                  padding: "0.9rem", borderRadius: "999px",
                  fontFamily: "system-ui, sans-serif", fontSize: "0.9rem",
                }}>
                  Fully Booked
                </div>
              )}
              <p style={{ textAlign: "center", color: "#C9BAB0", fontSize: "0.72rem", fontFamily: "system-ui, sans-serif", marginTop: "0.75rem" }}>
                You won&apos;t be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
