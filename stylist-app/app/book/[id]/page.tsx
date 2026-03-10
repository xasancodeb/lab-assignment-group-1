"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { stylists } from "@/lib/data";
import Navbar from "@/components/Navbar";

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
];

const sessionTypes = [
  { id: "wardrobe-audit", label: "Wardrobe Audit", desc: "Full closet review & declutter", duration: "2 hrs" },
  { id: "drawer-org", label: "Drawer Organization", desc: "Organize & fold your drawers perfectly", duration: "1 hr" },
  { id: "outfit-build", label: "Outfit Building", desc: "Build 7 days of outfits from what you have", duration: "1.5 hrs" },
  { id: "shopping", label: "Personal Shopping", desc: "Shop together in-store or online", duration: "2 hrs" },
];

export default function BookPage() {
  const params = useParams();
  const stylist = stylists.find((s) => s.id === params.id);

  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [mode, setMode] = useState<"in-person" | "virtual">("in-person");
  const [submitted, setSubmitted] = useState(false);

  if (!stylist) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#FAF7F2" }}>
        <p style={{ color: "#897870" }}>Stylist not found.</p>
      </main>
    );
  }

  if (submitted) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "#FAF7F2", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div
          style={{
            maxWidth: "448px",
            width: "100%",
            backgroundColor: "white",
            borderRadius: "16px",
            border: "1px solid #EDE6DC",
            padding: "40px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              backgroundColor: "#E8F5EE",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: "1.75rem",
              color: "#2D6A4F",
            }}
          >
            ✓
          </div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#18120E", marginBottom: "12px" }}>Booking Confirmed!</h2>
          <p style={{ color: "#897870", marginBottom: "8px" }}>
            Your session with <strong style={{ color: "#18120E" }}>{stylist.name}</strong> is booked for{" "}
            <strong style={{ color: "#18120E" }}>{selectedDate}</strong> at <strong style={{ color: "#18120E" }}>{selectedTime}</strong>.
          </p>
          <p style={{ color: "#897870", fontSize: "0.875rem", marginBottom: "32px" }}>
            You&apos;ll receive a confirmation email shortly with all the details.
          </p>
          <Link
            href="/"
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
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#FAF7F2" }}>
      <Navbar />

      <div style={{ paddingTop: "112px", paddingBottom: "80px", paddingLeft: "24px", paddingRight: "24px", maxWidth: "768px", margin: "0 auto" }}>
        {/* Progress */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "40px" }}>
          {[1, 2, 3].map((s) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "9999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  transition: "background-color 0.15s, color 0.15s",
                  backgroundColor: step >= s ? "#BF6B4A" : "#EDE6DC",
                  color: step >= s ? "white" : "#C9BAB0",
                }}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  style={{
                    height: "1px",
                    width: "40px",
                    transition: "background-color 0.15s",
                    backgroundColor: step > s ? "#BF6B4A" : "#EDE6DC",
                  }}
                />
              )}
            </div>
          ))}
          <span style={{ marginLeft: "8px", fontSize: "0.875rem", color: "#897870" }}>
            {step === 1 ? "Choose Service" : step === 2 ? "Pick a Time" : "Confirm"}
          </span>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            border: "1px solid #EDE6DC",
            padding: "32px",
          }}
        >
          {/* Step 1: Session type */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#18120E", marginBottom: "24px" }}>
                What kind of session do you need?
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {sessionTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "16px",
                      borderRadius: "12px",
                      border: selectedType === type.id ? "2px solid #BF6B4A" : "2px solid #EDE6DC",
                      backgroundColor: selectedType === type.id ? "#FBF5F1" : "white",
                      cursor: "pointer",
                      transition: "border-color 0.15s, background-color 0.15s",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <p style={{ fontWeight: 600, color: "#18120E" }}>{type.label}</p>
                        <p style={{ color: "#897870", fontSize: "0.875rem", marginTop: "2px" }}>{type.desc}</p>
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "#897870", flexShrink: 0, marginLeft: "16px" }}>{type.duration}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div style={{ marginTop: "24px" }}>
                <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#18120E", marginBottom: "12px" }}>Session mode</p>
                <div style={{ display: "flex", gap: "12px" }}>
                  {(["in-person", "virtual"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      style={{
                        padding: "10px 20px",
                        borderRadius: "9999px",
                        fontSize: "0.875rem",
                        border: "2px solid",
                        cursor: "pointer",
                        transition: "background-color 0.15s, border-color 0.15s, color 0.15s",
                        borderColor: mode === m ? "#BF6B4A" : "#EDE6DC",
                        backgroundColor: mode === m ? "#BF6B4A" : "white",
                        color: mode === m ? "white" : "#897870",
                      }}
                    >
                      {m === "in-person" ? "🏠 In-Person" : "💻 Virtual"}
                    </button>
                  ))}
                </div>
              </div>

              <button
                disabled={!selectedType}
                onClick={() => setStep(2)}
                style={{
                  marginTop: "32px",
                  width: "100%",
                  backgroundColor: "#BF6B4A",
                  color: "white",
                  padding: "12px 16px",
                  borderRadius: "9999px",
                  fontWeight: 500,
                  border: "none",
                  cursor: selectedType ? "pointer" : "not-allowed",
                  opacity: selectedType ? 1 : 0.4,
                  fontSize: "1rem",
                  transition: "background-color 0.15s",
                }}
                onMouseEnter={(e) => { if (selectedType) e.currentTarget.style.backgroundColor = "#A85A3B"; }}
                onMouseLeave={(e) => { if (selectedType) e.currentTarget.style.backgroundColor = "#BF6B4A"; }}
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Date & time */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#18120E", marginBottom: "24px" }}>Pick a date &amp; time</h2>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#18120E", marginBottom: "8px" }}>Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  style={{
                    width: "100%",
                    border: "1px solid #EDE6DC",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    fontSize: "1rem",
                    color: "#18120E",
                    backgroundColor: "white",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px #BF6B4A")}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                />
              </div>

              <div>
                <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#18120E", marginBottom: "12px" }}>Available times</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }} className="time-grid">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      style={{
                        padding: "10px",
                        borderRadius: "12px",
                        fontSize: "0.875rem",
                        border: "2px solid",
                        cursor: "pointer",
                        transition: "background-color 0.15s, border-color 0.15s, color 0.15s",
                        borderColor: selectedTime === slot ? "#18120E" : "#EDE6DC",
                        backgroundColor: selectedTime === slot ? "#18120E" : "white",
                        color: selectedTime === slot ? "white" : "#897870",
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "32px" }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    flex: 1,
                    border: "1px solid #EDE6DC",
                    color: "#18120E",
                    padding: "12px 16px",
                    borderRadius: "9999px",
                    fontWeight: 500,
                    backgroundColor: "white",
                    cursor: "pointer",
                    fontSize: "1rem",
                    transition: "background-color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F5EDE7")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
                >
                  Back
                </button>
                <button
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep(3)}
                  style={{
                    flex: 1,
                    backgroundColor: "#BF6B4A",
                    color: "white",
                    padding: "12px 16px",
                    borderRadius: "9999px",
                    fontWeight: 500,
                    border: "none",
                    cursor: !selectedDate || !selectedTime ? "not-allowed" : "pointer",
                    opacity: !selectedDate || !selectedTime ? 0.4 : 1,
                    fontSize: "1rem",
                    transition: "background-color 0.15s",
                  }}
                  onMouseEnter={(e) => { if (selectedDate && selectedTime) e.currentTarget.style.backgroundColor = "#A85A3B"; }}
                  onMouseLeave={(e) => { if (selectedDate && selectedTime) e.currentTarget.style.backgroundColor = "#BF6B4A"; }}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#18120E", marginBottom: "24px" }}>Confirm your booking</h2>

              <div
                style={{
                  backgroundColor: "#FBF5F1",
                  borderRadius: "12px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  fontSize: "0.875rem",
                  marginBottom: "24px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#897870" }}>Stylist</span>
                  <span style={{ fontWeight: 600, color: "#18120E" }}>{stylist.name}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#897870" }}>Service</span>
                  <span style={{ fontWeight: 600, color: "#18120E" }}>
                    {sessionTypes.find((t) => t.id === selectedType)?.label}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#897870" }}>Mode</span>
                  <span style={{ fontWeight: 600, color: "#18120E", textTransform: "capitalize" }}>{mode}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#897870" }}>Date</span>
                  <span style={{ fontWeight: 600, color: "#18120E" }}>{selectedDate}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#897870" }}>Time</span>
                  <span style={{ fontWeight: 600, color: "#18120E" }}>{selectedTime}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: "1px solid #EDE6DC",
                    paddingTop: "12px",
                  }}
                >
                  <span style={{ color: "#897870" }}>Rate</span>
                  <span style={{ fontWeight: 700, color: "#18120E" }}>${stylist.price}/hr</span>
                </div>
              </div>

              <p style={{ fontSize: "0.75rem", color: "#897870", marginBottom: "24px" }}>
                By confirming, you agree to StyleBook&apos;s Terms of Service. Payment is collected at the end of the session.
              </p>

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => setStep(2)}
                  style={{
                    flex: 1,
                    border: "1px solid #EDE6DC",
                    color: "#18120E",
                    padding: "12px 16px",
                    borderRadius: "9999px",
                    fontWeight: 500,
                    backgroundColor: "white",
                    cursor: "pointer",
                    fontSize: "1rem",
                    transition: "background-color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F5EDE7")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
                >
                  Back
                </button>
                <Link
                  href="/payment"
                  style={{
                    flex: 1,
                    textAlign: "center",
                    backgroundColor: "#BF6B4A",
                    color: "white",
                    padding: "12px 16px",
                    borderRadius: "9999px",
                    fontWeight: 500,
                    textDecoration: "none",
                    fontSize: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Continue to Payment
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .time-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </main>
  );
}
