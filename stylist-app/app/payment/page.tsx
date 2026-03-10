"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { addBooking, showToast } from "@/lib/store";
import { stylists } from "@/lib/data";

type PaymentMethod = "card" | "paypal" | "apple";

function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
  return digits;
}

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

function PaymentContent() {
  const searchParams = useSearchParams();
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [saveCard, setSaveCard] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // Booking context from URL params
  const stylistId = searchParams.get("stylist") ?? "1";
  const service = searchParams.get("service") ?? "Wardrobe Session";
  const date = searchParams.get("date") ?? "TBD";
  const time = searchParams.get("time") ?? "TBD";
  const stylist = stylists.find((s) => s.id === stylistId) ?? stylists[0];

  function updateCard(field: string, value: string) {
    setCard((c) => ({ ...c, [field]: value }));
  }

  function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (method === "card") {
      const digits = card.number.replace(/\s/g, "");
      if (digits.length !== 16) { setError("Enter a valid 16-digit card number."); return; }
      if (!card.name.trim()) { setError("Cardholder name is required."); return; }
      if (card.expiry.length !== 5) { setError("Enter a valid expiry date (MM/YY)."); return; }
      if (card.cvv.length < 3) { setError("Enter a valid CVV."); return; }
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addBooking({
        id: `b_${Date.now()}`,
        stylistId: stylist.id,
        stylistName: stylist.name,
        stylistAvatar: stylist.avatar,
        service,
        date,
        time,
        price: Math.round(stylist.price * 2 * 0.8 + 5),
        status: "upcoming",
        createdAt: new Date().toISOString(),
      });
      showToast(`Booking confirmed with ${stylist.name}!`);
      setDone(true);
    }, 1500);
  }

  if (done) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "#FAF7F2", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
          <div style={{ maxWidth: "448px", width: "100%", textAlign: "center" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "#E8F5EE",
                borderRadius: "9999px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
                fontSize: "2.25rem",
                color: "#2D6A4F",
              }}
            >
              ✓
            </div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#18120E", marginBottom: "12px" }}>Payment successful!</h2>
            <p style={{ color: "#897870", marginBottom: "8px" }}>Your session has been confirmed.</p>
            <p style={{ color: "#897870", fontSize: "0.875rem", marginBottom: "32px" }}>A receipt has been sent to your email.</p>
            <Link
              href="/dashboard"
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
              View My Bookings
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#FAF7F2", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        <div style={{ width: "100%", maxWidth: "896px", display: "grid", gridTemplateColumns: "1fr", gap: "40px" }} className="payment-grid">

          {/* Left: payment form */}
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#18120E", marginBottom: "32px" }}>Payment</h1>

            {/* Method selector */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "32px" }}>
              {([
                { id: "card", label: "Card" },
                { id: "paypal", label: "PayPal" },
                { id: "apple", label: "Apple Pay" },
              ] as { id: PaymentMethod; label: string }[]).map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  style={{
                    flex: 1,
                    padding: "10px 16px",
                    borderRadius: "12px",
                    border: method === m.id ? "2px solid #BF6B4A" : "2px solid #EDE6DC",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "background-color 0.15s, border-color 0.15s, color 0.15s",
                    backgroundColor: method === m.id ? "#BF6B4A" : "white",
                    color: method === m.id ? "white" : "#897870",
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {method === "card" && (
              <form onSubmit={handlePay} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#18120E", marginBottom: "6px" }}>
                    Card Number
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={card.number}
                      onChange={(e) => updateCard("number", formatCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      style={{ ...inputStyle, paddingRight: "48px", fontFamily: "monospace", letterSpacing: "0.05em" }}
                      onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px #BF6B4A")}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                    <CardIcon style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", color: "#C9BAB0" }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#18120E", marginBottom: "6px" }}>
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={card.name}
                    onChange={(e) => updateCard("name", e.target.value)}
                    placeholder="Jane Smith"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px #BF6B4A")}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#18120E", marginBottom: "6px" }}>
                      Expiry
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={card.expiry}
                      onChange={(e) => updateCard("expiry", formatExpiry(e.target.value))}
                      placeholder="MM/YY"
                      style={{ ...inputStyle, fontFamily: "monospace" }}
                      onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px #BF6B4A")}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#18120E", marginBottom: "6px" }}>
                      CVV
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={card.cvv}
                      onChange={(e) => updateCard("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                      placeholder="123"
                      style={{ ...inputStyle, fontFamily: "monospace" }}
                      onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px #BF6B4A")}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </div>
                </div>

                <label style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "0.875rem", color: "#897870", cursor: "pointer", paddingTop: "4px" }}>
                  <input
                    type="checkbox"
                    checked={saveCard}
                    onChange={(e) => setSaveCard(e.target.checked)}
                    style={{ accentColor: "#BF6B4A" }}
                  />
                  Save card for future bookings
                </label>

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
                    padding: "14px 16px",
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
                  {loading ? "Processing…" : "Pay $85.00"}
                </button>
              </form>
            )}

            {method === "paypal" && (
              <div
                style={{
                  textAlign: "center",
                  padding: "48px 32px",
                  border: "2px dashed #EDE6DC",
                  borderRadius: "16px",
                }}
              >
                <p style={{ color: "#897870", marginBottom: "24px" }}>You'll be redirected to PayPal to complete payment.</p>
                <button
                  onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); setDone(true); }, 1500); }}
                  style={{
                    backgroundColor: "#0070BA",
                    color: "white",
                    padding: "12px 40px",
                    borderRadius: "12px",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  {loading ? "Redirecting…" : "Pay with PayPal"}
                </button>
              </div>
            )}

            {method === "apple" && (
              <div
                style={{
                  textAlign: "center",
                  padding: "48px 32px",
                  border: "2px dashed #EDE6DC",
                  borderRadius: "16px",
                }}
              >
                <p style={{ color: "#897870", marginBottom: "24px" }}>Complete with Face ID or Touch ID.</p>
                <button
                  onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); setDone(true); }, 1500); }}
                  style={{
                    backgroundColor: "#18120E",
                    color: "white",
                    padding: "12px 40px",
                    borderRadius: "12px",
                    fontWeight: 500,
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <AppleIcon />
                  {loading ? "Authenticating…" : "Pay with Apple Pay"}
                </button>
              </div>
            )}
          </div>

          {/* Right: order summary */}
          <div className="payment-summary">
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "16px",
                border: "1px solid #EDE6DC",
                padding: "24px",
                position: "sticky",
                top: "32px",
              }}
            >
              <h2 style={{ fontWeight: 700, color: "#18120E", marginBottom: "20px", fontSize: "1rem" }}>Order Summary</h2>

              {/* Stylist */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "24px",
                  paddingBottom: "24px",
                  borderBottom: "1px solid #EDE6DC",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "9999px",
                    backgroundColor: "#D4A574",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    flexShrink: 0,
                  }}
                >
                  A
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: "#18120E", fontSize: "0.875rem" }}>Amara Osei</p>
                  <p style={{ color: "#897870", fontSize: "0.75rem" }}>Wardrobe Audit · In-Person</p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.875rem", marginBottom: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#897870" }}>
                  <span>Session (2 hrs × $85)</span>
                  <span>$170.00</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#2D6A4F" }}>
                  <span>First-session discount (20%)</span>
                  <span>−$34.00</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#897870" }}>
                  <span>Platform fee</span>
                  <span>$5.00</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: 700,
                    color: "#18120E",
                    borderTop: "1px solid #EDE6DC",
                    paddingTop: "12px",
                  }}
                >
                  <span>Total</span>
                  <span>$141.00</span>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "#F5EDE7",
                  borderRadius: "12px",
                  padding: "16px",
                  fontSize: "0.75rem",
                  color: "#897870",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <p style={{ display: "flex", alignItems: "center", gap: "8px" }}><span>✓</span> Payment collected after session</p>
                <p style={{ display: "flex", alignItems: "center", gap: "8px" }}><span>✓</span> Full refund if cancelled 24hrs before</p>
                <p style={{ display: "flex", alignItems: "center", gap: "8px" }}><span>✓</span> Satisfaction guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .payment-grid {
            grid-template-columns: 3fr 2fr !important;
          }
        }
      `}</style>
    </main>
  );
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}

function CardIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg style={style} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="currentColor">
      <path d="M14.535 9.56c-.022-2.295 1.875-3.408 1.96-3.461-1.07-1.563-2.732-1.777-3.322-1.797-1.407-.144-2.754.838-3.467.838-.724 0-1.835-.82-3.02-.797C5.03 4.367 3.43 5.449 2.556 7.093c-1.773 3.066-.455 7.608 1.267 10.099.843 1.22 1.845 2.586 3.155 2.537 1.27-.052 1.748-.817 3.283-.817 1.524 0 1.96.817 3.293.79 1.365-.023 2.23-1.24 3.064-2.465.97-1.414 1.368-2.786 1.39-2.856-.03-.014-2.661-1.022-2.687-4.055l.214.234z"/>
      <path d="M12.19 2.987c.7-.853 1.174-2.036 1.044-3.217-1.01.042-2.228.674-2.95 1.526-.649.752-1.218 1.953-1.065 3.107 1.126.088 2.274-.574 2.971-1.416z"/>
    </svg>
  );
}

export default function PaymentPage() {
  return (
    <Suspense>
      <PaymentContent />
    </Suspense>
  );
}
