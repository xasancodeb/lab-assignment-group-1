"use client";
import Link from "next/link";
import { stylists, howItWorks } from "@/lib/data";
import Navbar from "@/components/Navbar";
import StylistCard from "@/components/StylistCard";

export default function Home() {
  const featured = stylists.filter((s) => s.available).slice(0, 3);

  return (
    <main style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
      <Navbar />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FAF7F2]">

        {/* Background grain texture (pure CSS) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
            opacity: 0.6,
          }}
        />

        {/* Right panel — espresso */}
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 bottom-0 hidden lg:block"
          style={{ width: "42%", background: "#18120E" }}
        />

        <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-16 w-full grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">

          {/* Left: text */}
          <div className="lg:col-span-3 animate-fade-up">
            <p
              className="text-xs uppercase tracking-[0.22em] mb-8 delay-100 animate-fade-in"
              style={{ color: "#BF6B4A", fontFamily: "system-ui, sans-serif" }}
            >
              Personal Styling · On Demand
            </p>

            <h1
              className="leading-none mb-8"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "#18120E", fontWeight: 700 }}
            >
              Your wardrobe,{" "}
              <em style={{ color: "#BF6B4A", fontStyle: "italic" }}>finally</em>
              <br />you.
            </h1>

            <p
              className="mb-10 max-w-xl leading-relaxed delay-100 animate-fade-up"
              style={{ fontSize: "1.15rem", color: "#897870", fontFamily: "system-ui, sans-serif", fontWeight: 400 }}
            >
              StyleBook connects you with expert personal stylists who come to
              your home — or meet you virtually — to organize, rebuild, and
              elevate how you show up every day.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 delay-200 animate-fade-up">
              <Link
                href="/browse"
                style={{
                  background: "#BF6B4A", color: "#fff",
                  padding: "1rem 2.25rem", borderRadius: "999px",
                  fontFamily: "system-ui, sans-serif", fontWeight: 500,
                  fontSize: "0.95rem", textDecoration: "none",
                  display: "inline-block", transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#A85A3B")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#BF6B4A")}
              >
                Find Your Stylist
              </Link>
              <Link
                href="/how-it-works"
                style={{
                  border: "1.5px solid #EDE6DC", color: "#18120E",
                  padding: "1rem 2.25rem", borderRadius: "999px",
                  fontFamily: "system-ui, sans-serif", fontWeight: 400,
                  fontSize: "0.95rem", textDecoration: "none",
                  display: "inline-block", background: "transparent",
                }}
              >
                How it Works →
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 mt-14 pt-8" style={{ borderTop: "1px solid #EDE6DC" }}>
              {[
                { n: "500+", label: "Verified Stylists" },
                { n: "12k+", label: "Happy Customers" },
                { n: "4.9★", label: "Average Rating" },
              ].map(({ n, label }) => (
                <div key={label}>
                  <p style={{ fontSize: "1.6rem", fontWeight: 700, color: "#18120E", lineHeight: 1 }}>{n}</p>
                  <p style={{ fontSize: "0.78rem", color: "#897870", marginTop: "0.3rem", fontFamily: "system-ui, sans-serif" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: floating stylist cards (decorative) */}
          <div className="lg:col-span-2 hidden lg:flex flex-col items-center justify-center gap-4 relative py-12 animate-scale-in delay-300">
            {featured.map((s, i) => (
              <div
                key={s.id}
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "14px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  width: "100%",
                  maxWidth: "280px",
                  transform: i === 1 ? "translateX(24px)" : i === 2 ? "translateX(-12px)" : "none",
                  boxShadow: "0 4px 24px rgba(24,18,14,0.12)",
                  border: "1px solid rgba(237,230,220,0.6)",
                }}
              >
                <div
                  style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: s.avatar,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontWeight: 700, fontSize: "1.1rem", flexShrink: 0,
                  }}
                >
                  {s.name.charAt(0)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 700, color: "#18120E", fontSize: "0.9rem", margin: 0 }}>{s.name}</p>
                  <p style={{ color: "#897870", fontSize: "0.75rem", margin: "2px 0 0", fontFamily: "system-ui, sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.tagline}</p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ color: "#BF6B4A", fontSize: "0.78rem", fontFamily: "system-ui, sans-serif", fontWeight: 600 }}>★ {s.rating}</p>
                  <p style={{ color: "#C9BAB0", fontSize: "0.7rem", fontFamily: "system-ui, sans-serif" }}>${s.price}/hr</p>
                </div>
              </div>
            ))}

            {/* "Book now" nudge floating badge */}
            <div
              style={{
                position: "absolute", bottom: 0, right: 0,
                background: "#BF6B4A", color: "#fff",
                borderRadius: "999px", padding: "8px 16px",
                fontSize: "0.75rem", fontFamily: "system-ui, sans-serif",
                fontWeight: 600, boxShadow: "0 4px 16px rgba(191,107,74,0.4)",
              }}
            >
              3 available today
            </div>
          </div>
        </div>
      </section>

      {/* ── Manifesto strip ─────────────────────────────────────── */}
      <section style={{ background: "#BF6B4A", overflow: "hidden" }}>
        <div
          style={{
            display: "flex", gap: "3rem", padding: "1rem 0",
            whiteSpace: "nowrap", animation: "marquee 20s linear infinite",
            fontFamily: "Georgia, serif", fontSize: "1rem",
            color: "rgba(255,255,255,0.85)", letterSpacing: "0.04em",
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>
              Your style is your story &nbsp;·&nbsp; Confidence made visible &nbsp;·&nbsp; Dress the life you want &nbsp;·&nbsp; Own every room &nbsp;·
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ── How it works ────────────────────────────────────────── */}
      <section style={{ background: "#18120E", padding: "6rem 1.5rem" }}>
        <div className="max-w-6xl mx-auto">
          <div style={{ marginBottom: "3.5rem" }}>
            <p style={{ color: "#BF6B4A", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.75rem", fontFamily: "system-ui, sans-serif" }}>
              The Process
            </p>
            <h2 style={{ color: "#FAF7F2", fontSize: "2.5rem", fontWeight: 700, margin: 0 }}>
              Three steps to a wardrobe{" "}
              <em style={{ fontStyle: "italic", color: "#C9BAB0" }}>you love</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {howItWorks.map((item, i) => (
              <div key={item.step} style={{ borderTop: "1px solid #2E2018", paddingTop: "2rem" }}>
                <p style={{ fontSize: "3rem", fontWeight: 700, color: "#2E2018", marginBottom: "1.25rem", lineHeight: 1 }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 style={{ color: "#FAF7F2", fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.75rem" }}>
                  {item.title}
                </h3>
                <p style={{ color: "#897870", lineHeight: 1.7, fontSize: "0.95rem", fontFamily: "system-ui, sans-serif" }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Stylists ───────────────────────────────────── */}
      <section style={{ padding: "6rem 1.5rem", background: "#FAF7F2" }}>
        <div className="max-w-6xl mx-auto">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem" }}>
            <div>
              <p style={{ color: "#BF6B4A", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.75rem", fontFamily: "system-ui, sans-serif" }}>
                Featured
              </p>
              <h2 style={{ color: "#18120E", fontSize: "2.2rem", fontWeight: 700, margin: 0 }}>
                Top stylists available today
              </h2>
            </div>
            <Link
              href="/browse"
              style={{ color: "#897870", fontSize: "0.875rem", fontFamily: "system-ui, sans-serif", textDecoration: "none", borderBottom: "1px solid #EDE6DC", paddingBottom: "2px" }}
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((stylist) => (
              <StylistCard key={stylist.id} stylist={stylist} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ─────────────────────────────────────────── */}
      <section style={{ background: "#F5EDE7", padding: "5rem 1.5rem", textAlign: "center" }}>
        <div className="max-w-3xl mx-auto">
          <p style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", color: "#18120E", fontStyle: "italic", lineHeight: 1.6, marginBottom: "2rem" }}>
            &ldquo;I opened my drawer for the first time in years and actually
            felt excited. StyleBook changed how I start every morning.&rdquo;
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#D4A574", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.85rem", fontWeight: 700 }}>
              T
            </div>
            <p style={{ color: "#897870", fontSize: "0.85rem", fontFamily: "system-ui, sans-serif" }}>
              Taylor M. · New York, NY
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section style={{ background: "#18120E", padding: "7rem 1.5rem", textAlign: "center" }}>
        <div className="max-w-2xl mx-auto">
          <p style={{ color: "#BF6B4A", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "1.5rem", fontFamily: "system-ui, sans-serif" }}>
            First session 20% off
          </p>
          <h2 style={{ color: "#FAF7F2", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "1.5rem" }}>
            Ready to love getting dressed again?
          </h2>
          <p style={{ color: "#897870", fontSize: "1.05rem", fontFamily: "system-ui, sans-serif", marginBottom: "3rem", lineHeight: 1.7 }}>
            No subscriptions. No pressure. Just a stylist who gets you.
          </p>
          <Link
            href="/browse"
            style={{
              display: "inline-block", background: "#BF6B4A", color: "#fff",
              padding: "1.1rem 2.75rem", borderRadius: "999px",
              fontFamily: "system-ui, sans-serif", fontWeight: 500,
              fontSize: "1rem", textDecoration: "none",
            }}
          >
            Browse Stylists
          </Link>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer style={{ background: "#18120E", borderTop: "1px solid #2E2018", padding: "2rem 1.5rem" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p style={{ color: "#3D2E24", fontSize: "0.85rem", fontFamily: "system-ui, sans-serif" }}>
            © 2026 StyleBook. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "2rem" }}>
            {["Privacy", "Terms", "Support"].map((l) => (
              <Link key={l} href="#" style={{ color: "#3D2E24", fontSize: "0.85rem", fontFamily: "system-ui, sans-serif", textDecoration: "none" }}>
                {l}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
