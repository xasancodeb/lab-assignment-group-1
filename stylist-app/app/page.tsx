import Link from "next/link";
import { stylists, howItWorks } from "@/lib/data";
import StylistCard from "@/components/StylistCard";

export default function Home() {
  const featured = stylists.filter((s) => s.available).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f7]/90 backdrop-blur border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight">StyleBook</span>
          <div className="flex items-center gap-6 text-sm text-stone-600">
            <Link href="/browse" className="hover:text-stone-900 transition-colors">Browse Stylists</Link>
            <Link href="/how-it-works" className="hover:text-stone-900 transition-colors">How it Works</Link>
            <Link href="/login" className="hover:text-stone-900 transition-colors">Log In</Link>
            <Link
              href="/signup"
              className="bg-stone-900 text-white px-4 py-2 rounded-full text-sm hover:bg-stone-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-36 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
              Personal Styling On Demand
            </span>
            <h1 className="text-6xl font-bold tracking-tight text-stone-900 leading-tight mb-6">
              Book a stylist.{" "}
              <span className="text-stone-400">Transform your wardrobe.</span>
            </h1>
            <p className="text-xl text-stone-500 leading-relaxed mb-10 max-w-2xl">
              Connect with expert stylists who come to you — or meet virtually.
              Organize your drawer, build a capsule wardrobe, and finally love
              what you wear every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/browse"
                className="bg-stone-900 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-stone-700 transition-colors text-center"
              >
                Find Your Stylist
              </Link>
              <Link
                href="/how-it-works"
                className="border border-stone-300 text-stone-700 px-8 py-4 rounded-full text-base font-medium hover:bg-stone-100 transition-colors text-center"
              >
                How It Works
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-12 mt-16 pt-10 border-t border-stone-200">
            <div>
              <p className="text-3xl font-bold text-stone-900">500+</p>
              <p className="text-sm text-stone-500 mt-1">Verified Stylists</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-stone-900">12k+</p>
              <p className="text-sm text-stone-500 mt-1">Happy Customers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-stone-900">4.9★</p>
              <p className="text-sm text-stone-500 mt-1">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">How StyleBook Works</h2>
          <p className="text-stone-400 mb-14">Three steps to a wardrobe you love.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {howItWorks.map((item) => (
              <div key={item.step}>
                <p className="text-5xl font-bold text-stone-700 mb-4">{item.step}</p>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-stone-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stylists */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 mb-2">Top Stylists Near You</h2>
              <p className="text-stone-500">Available for booking today</p>
            </div>
            <Link
              href="/browse"
              className="text-sm text-stone-600 border border-stone-300 px-5 py-2 rounded-full hover:bg-stone-100 transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((stylist) => (
              <StylistCard key={stylist.id} stylist={stylist} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 bg-amber-50 border-t border-amber-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-stone-900 mb-4">
            Ready to love your wardrobe?
          </h2>
          <p className="text-stone-500 text-lg mb-8 max-w-xl mx-auto">
            Book your first session and get 20% off. No subscriptions, no
            commitments — just great style.
          </p>
          <Link
            href="/browse"
            className="bg-stone-900 text-white px-10 py-4 rounded-full text-base font-medium hover:bg-stone-700 transition-colors"
          >
            Browse Stylists
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-8 px-6 text-center text-sm text-stone-400">
        © 2026 StyleBook. All rights reserved.
      </footer>
    </main>
  );
}
