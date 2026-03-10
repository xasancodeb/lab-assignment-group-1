import Link from "next/link";
import { howItWorks } from "@/lib/data";
import Navbar from "@/components/Navbar";

const faqs = [
  {
    q: "What happens during a wardrobe session?",
    a: "Your stylist will assess your current wardrobe, help you declutter items that no longer serve you, organize what remains, and build cohesive outfits from what you own. Sessions typically run 1–2 hours depending on the service you choose.",
  },
  {
    q: "Can I book a virtual session?",
    a: "Yes! Virtual sessions are available via video call. You'll walk your stylist through your wardrobe on camera and they'll guide you in real time.",
  },
  {
    q: "How much does it cost?",
    a: "Stylists set their own rates, starting from $65/hr. You only pay at the end of your session — no upfront payment required.",
  },
  {
    q: "What if I don't like my stylist?",
    a: "We offer a satisfaction guarantee. If you're not happy with your session, contact us within 24 hours and we'll arrange a free session with a different stylist.",
  },
  {
    q: "How do stylists get verified?",
    a: "All StyleBook stylists go through an application process that includes a portfolio review, background check, and a trial session before being listed on the platform.",
  },
];

export default function HowItWorksPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#FAF7F2" }}>
      <Navbar active="how-it-works" />

      <div style={{ maxWidth: "52rem", margin: "0 auto", padding: "9rem 1.5rem 5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <p style={{ color: "#BF6B4A", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.22em", marginBottom: "1rem", fontFamily: "system-ui, sans-serif" }}>
            The Process
          </p>
          <h1 style={{ fontSize: "3rem", fontWeight: 700, color: "#18120E", marginBottom: "1rem" }}>
            How StyleBook Works
          </h1>
          <p style={{ color: "#897870", fontSize: "1.1rem", fontFamily: "system-ui, sans-serif", lineHeight: 1.7 }}>
            From browsing to a transformed wardrobe — it&apos;s simpler than you think.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", marginBottom: "5rem" }}>
          {howItWorks.map((item, i) => (
            <div key={item.step} style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
              <div style={{
                flexShrink: 0, width: 56, height: 56, borderRadius: "14px",
                background: "#18120E", color: "#BF6B4A",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.2rem", fontWeight: 700,
              }}>
                {i + 1}
              </div>
              <div style={{ paddingTop: "0.5rem" }}>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#18120E", marginBottom: "0.6rem" }}>
                  {item.title}
                </h3>
                <p style={{ color: "#897870", lineHeight: 1.75, fontFamily: "system-ui, sans-serif", fontSize: "0.95rem", maxWidth: "38rem" }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#18120E", marginBottom: "2rem" }}>
            Common Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {faqs.map((faq) => (
              <div key={faq.q} style={{ background: "#fff", borderRadius: "16px", border: "1px solid #EDE6DC", padding: "1.5rem" }}>
                <h3 style={{ fontWeight: 700, color: "#18120E", marginBottom: "0.6rem", fontSize: "0.95rem" }}>{faq.q}</h3>
                <p style={{ color: "#897870", lineHeight: 1.7, fontFamily: "system-ui, sans-serif", fontSize: "0.88rem" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: "#18120E", borderRadius: "20px", padding: "4rem 2.5rem", textAlign: "center" }}>
          <h2 style={{ color: "#FAF7F2", fontSize: "2rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Ready to get started?
          </h2>
          <p style={{ color: "#897870", fontFamily: "system-ui, sans-serif", marginBottom: "2.5rem" }}>
            Browse stylists and book your first session today.
          </p>
          <Link
            href="/browse"
            style={{
              display: "inline-block", background: "#BF6B4A", color: "#fff",
              padding: "0.9rem 2.25rem", borderRadius: "999px",
              fontFamily: "system-ui, sans-serif", fontWeight: 500,
              fontSize: "0.95rem", textDecoration: "none",
            }}
          >
            Find Your Stylist
          </Link>
        </div>
      </div>
    </main>
  );
}
