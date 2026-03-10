"use client";
import { useState } from "react";
import Link from "next/link";
import { stylists, specialties } from "@/lib/data";
import StylistCard from "@/components/StylistCard";

export default function BrowsePage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const filtered = stylists.filter((s) => {
    const matchesSpecialty =
      activeFilter === "All" || s.specialty.includes(activeFilter);
    const matchesAvail = !showAvailableOnly || s.available;
    return matchesSpecialty && matchesAvail;
  });

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f7]/90 backdrop-blur border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">StyleBook</Link>
          <div className="flex items-center gap-6 text-sm text-stone-600">
            <Link href="/browse" className="text-stone-900 font-medium">Browse Stylists</Link>
            <Link href="/how-it-works" className="hover:text-stone-900 transition-colors">How it Works</Link>
          </div>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-6 max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-stone-900 mb-2">Find Your Stylist</h1>
          <p className="text-stone-500">Browse verified stylists and book a session today.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {specialties.map((s) => (
              <button
                key={s}
                onClick={() => setActiveFilter(s)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  activeFilter === s
                    ? "bg-stone-900 text-white"
                    : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm text-stone-600 cursor-pointer whitespace-nowrap ml-auto">
            <input
              type="checkbox"
              checked={showAvailableOnly}
              onChange={(e) => setShowAvailableOnly(e.target.checked)}
              className="accent-stone-800"
            />
            Available only
          </label>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-stone-400">
            <p className="text-xl mb-2">No stylists found</p>
            <p className="text-sm">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((stylist) => (
              <StylistCard key={stylist.id} stylist={stylist} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
