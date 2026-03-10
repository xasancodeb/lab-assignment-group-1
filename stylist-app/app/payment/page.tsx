"use client";
import { useState } from "react";
import Link from "next/link";

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

export default function PaymentPage() {
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [saveCard, setSaveCard] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

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
    setTimeout(() => { setLoading(false); setDone(true); }, 1500);
  }

  if (done) {
    return (
      <main className="min-h-screen bg-[#faf9f7] flex flex-col">
        <nav className="px-6 py-5 border-b border-stone-200">
          <Link href="/" className="text-xl font-bold tracking-tight">StyleBook</Link>
        </nav>
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
            <h2 className="text-2xl font-bold text-stone-900 mb-3">Payment successful!</h2>
            <p className="text-stone-500 mb-2">Your session has been confirmed.</p>
            <p className="text-stone-400 text-sm mb-8">A receipt has been sent to your email.</p>
            <Link
              href="/"
              className="bg-stone-900 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-stone-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f7] flex flex-col">
      {/* Nav */}
      <nav className="px-6 py-5 border-b border-stone-200 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">StyleBook</Link>
        <div className="flex items-center gap-2 text-xs text-stone-400">
          <LockIcon />
          Secured by 256-bit SSL
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left: payment form */}
          <div className="lg:col-span-3">
            <h1 className="text-2xl font-bold text-stone-900 mb-8">Payment</h1>

            {/* Method selector */}
            <div className="flex gap-2 mb-8">
              {([
                { id: "card", label: "Card" },
                { id: "paypal", label: "PayPal" },
                { id: "apple", label: "Apple Pay" },
              ] as { id: PaymentMethod; label: string }[]).map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-medium transition-colors ${
                    method === m.id
                      ? "border-stone-900 bg-stone-900 text-white"
                      : "border-stone-200 text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {method === "card" && (
              <form onSubmit={handlePay} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={card.number}
                      onChange={(e) => updateCard("number", formatCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 pr-12 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 transition font-mono tracking-wider"
                    />
                    <CardIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Cardholder Name</label>
                  <input
                    type="text"
                    value={card.name}
                    onChange={(e) => updateCard("name", e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">Expiry</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={card.expiry}
                      onChange={(e) => updateCard("expiry", formatExpiry(e.target.value))}
                      placeholder="MM/YY"
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 transition font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">CVV</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={card.cvv}
                      onChange={(e) => updateCard("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                      placeholder="123"
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 transition font-mono"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-3 text-sm text-stone-600 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={saveCard}
                    onChange={(e) => setSaveCard(e.target.checked)}
                    className="accent-stone-800"
                  />
                  Save card for future bookings
                </label>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-stone-900 text-white py-3.5 rounded-xl font-medium hover:bg-stone-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? "Processing…" : "Pay $85.00"}
                </button>
              </form>
            )}

            {method === "paypal" && (
              <div className="text-center py-12 border-2 border-dashed border-stone-200 rounded-2xl">
                <p className="text-stone-500 mb-6">You'll be redirected to PayPal to complete payment.</p>
                <button
                  onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); setDone(true); }, 1500); }}
                  className="bg-[#0070BA] text-white px-10 py-3 rounded-xl font-bold hover:bg-[#005ea6] transition-colors"
                >
                  {loading ? "Redirecting…" : "Pay with PayPal"}
                </button>
              </div>
            )}

            {method === "apple" && (
              <div className="text-center py-12 border-2 border-dashed border-stone-200 rounded-2xl">
                <p className="text-stone-500 mb-6">Complete with Face ID or Touch ID.</p>
                <button
                  onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); setDone(true); }, 1500); }}
                  className="bg-black text-white px-10 py-3 rounded-xl font-medium hover:bg-stone-800 transition-colors flex items-center gap-2 mx-auto"
                >
                  <AppleIcon />
                  {loading ? "Authenticating…" : "Pay with Apple Pay"}
                </button>
              </div>
            )}
          </div>

          {/* Right: order summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-stone-100 p-6 sticky top-8">
              <h2 className="font-bold text-stone-900 mb-5">Order Summary</h2>

              {/* Stylist */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-stone-100">
                <div className="w-10 h-10 rounded-full bg-[#D4A574] flex items-center justify-center text-white font-bold text-sm shrink-0">
                  A
                </div>
                <div>
                  <p className="font-semibold text-stone-800 text-sm">Amara Osei</p>
                  <p className="text-stone-400 text-xs">Wardrobe Audit · In-Person</p>
                </div>
              </div>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-stone-600">
                  <span>Session (2 hrs × $85)</span>
                  <span>$170.00</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>First-session discount (20%)</span>
                  <span>−$34.00</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Platform fee</span>
                  <span>$5.00</span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 border-t border-stone-100 pt-3">
                  <span>Total</span>
                  <span>$141.00</span>
                </div>
              </div>

              <div className="bg-stone-50 rounded-xl p-4 text-xs text-stone-500 space-y-1.5">
                <p className="flex items-center gap-2"><span>✓</span> Payment collected after session</p>
                <p className="flex items-center gap-2"><span>✓</span> Full refund if cancelled 24hrs before</p>
                <p className="flex items-center gap-2"><span>✓</span> Satisfaction guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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

function CardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
