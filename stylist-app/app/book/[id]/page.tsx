"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { stylists } from "@/lib/data";

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
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-stone-500">Stylist not found.</p>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#faf9f7] flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-2xl border border-stone-100 p-10 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-stone-900 mb-3">Booking Confirmed!</h2>
          <p className="text-stone-500 mb-2">
            Your session with <strong>{stylist.name}</strong> is booked for{" "}
            <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong>.
          </p>
          <p className="text-stone-400 text-sm mb-8">
            You&apos;ll receive a confirmation email shortly with all the details.
          </p>
          <Link
            href="/"
            className="bg-stone-900 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-stone-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f7]/90 backdrop-blur border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">StyleBook</Link>
          <Link href={`/stylist/${stylist.id}`} className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
            ← Back to Profile
          </Link>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-6 max-w-3xl mx-auto">
        {/* Progress */}
        <div className="flex items-center gap-3 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step >= s ? "bg-stone-900 text-white" : "bg-stone-200 text-stone-400"
                }`}
              >
                {s}
              </div>
              {s < 3 && <div className={`h-px w-10 transition-colors ${step > s ? "bg-stone-900" : "bg-stone-200"}`} />}
            </div>
          ))}
          <span className="ml-2 text-sm text-stone-500">
            {step === 1 ? "Choose Service" : step === 2 ? "Pick a Time" : "Confirm"}
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-stone-100 p-8">
          {/* Step 1: Session type */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-stone-900 mb-6">What kind of session do you need?</h2>
              <div className="space-y-3">
                {sessionTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-colors ${
                      selectedType === type.id
                        ? "border-stone-900 bg-stone-50"
                        : "border-stone-100 hover:border-stone-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-stone-800">{type.label}</p>
                        <p className="text-stone-500 text-sm mt-0.5">{type.desc}</p>
                      </div>
                      <span className="text-xs text-stone-400 shrink-0 ml-4">{type.duration}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-sm font-medium text-stone-700 mb-3">Session mode</p>
                <div className="flex gap-3">
                  {(["in-person", "virtual"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`px-5 py-2.5 rounded-full text-sm border-2 transition-colors ${
                        mode === m
                          ? "border-stone-900 bg-stone-900 text-white"
                          : "border-stone-200 text-stone-600 hover:bg-stone-50"
                      }`}
                    >
                      {m === "in-person" ? "🏠 In-Person" : "💻 Virtual"}
                    </button>
                  ))}
                </div>
              </div>

              <button
                disabled={!selectedType}
                onClick={() => setStep(2)}
                className="mt-8 w-full bg-stone-900 text-white py-3 rounded-full font-medium hover:bg-stone-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Date & time */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-stone-900 mb-6">Pick a date & time</h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-stone-700 mb-2">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>

              <div>
                <p className="text-sm font-medium text-stone-700 mb-3">Available times</p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2.5 rounded-xl text-sm border-2 transition-colors ${
                        selectedTime === slot
                          ? "border-stone-900 bg-stone-900 text-white"
                          : "border-stone-100 text-stone-600 hover:border-stone-300"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border border-stone-200 text-stone-700 py-3 rounded-full font-medium hover:bg-stone-50 transition-colors"
                >
                  Back
                </button>
                <button
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep(3)}
                  className="flex-1 bg-stone-900 text-white py-3 rounded-full font-medium hover:bg-stone-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-stone-900 mb-6">Confirm your booking</h2>

              <div className="bg-stone-50 rounded-xl p-5 space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-stone-500">Stylist</span>
                  <span className="font-semibold text-stone-800">{stylist.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Service</span>
                  <span className="font-semibold text-stone-800">
                    {sessionTypes.find((t) => t.id === selectedType)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Mode</span>
                  <span className="font-semibold text-stone-800 capitalize">{mode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Date</span>
                  <span className="font-semibold text-stone-800">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Time</span>
                  <span className="font-semibold text-stone-800">{selectedTime}</span>
                </div>
                <div className="border-t border-stone-200 pt-3 flex justify-between">
                  <span className="text-stone-500">Rate</span>
                  <span className="font-bold text-stone-900">${stylist.price}/hr</span>
                </div>
              </div>

              <p className="text-xs text-stone-400 mb-6">
                By confirming, you agree to StyleBook&apos;s Terms of Service. Payment is collected at the end of the session.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border border-stone-200 text-stone-700 py-3 rounded-full font-medium hover:bg-stone-50 transition-colors"
                >
                  Back
                </button>
                <Link
                  href="/payment"
                  className="flex-1 text-center bg-stone-900 text-white py-3 rounded-full font-medium hover:bg-stone-700 transition-colors"
                >
                  Continue to Payment
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
