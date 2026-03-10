import Link from "next/link";
import { notFound } from "next/navigation";
import { stylists } from "@/lib/data";

export default async function StylistProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const stylist = stylists.find((s) => s.id === id);
  if (!stylist) notFound();

  const reviews = [
    {
      name: "Taylor M.",
      rating: 5,
      comment:
        "Completely transformed how I think about getting dressed. My drawer actually makes sense now!",
      date: "Feb 2026",
    },
    {
      name: "Jordan K.",
      rating: 5,
      comment:
        "Worth every dollar. I donated 60% of my closet and somehow have way more to wear.",
      date: "Jan 2026",
    },
    {
      name: "Riley S.",
      rating: 4,
      comment:
        "Super knowledgeable and easy to work with. Already booked a second session.",
      date: "Dec 2025",
    },
  ];

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f7]/90 backdrop-blur border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">StyleBook</Link>
          <Link href="/browse" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
            ← Back to Browse
          </Link>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl overflow-hidden border border-stone-100 mb-8">
          <div className="h-48" style={{ backgroundColor: stylist.coverColor }} />
          <div className="px-8 pb-8">
            <div className="flex items-end gap-5 -mt-12 mb-6">
              <div
                className="w-24 h-24 rounded-full border-4 border-white flex items-center justify-center text-3xl font-bold text-white shrink-0"
                style={{ backgroundColor: stylist.avatar }}
              >
                {stylist.name.charAt(0)}
              </div>
              <div className="pb-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-stone-900">{stylist.name}</h1>
                  {stylist.available ? (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                      Available
                    </span>
                  ) : (
                    <span className="bg-stone-100 text-stone-500 text-xs px-2 py-1 rounded-full font-medium">
                      Fully Booked
                    </span>
                  )}
                </div>
                <p className="text-stone-500">{stylist.tagline}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-stone-600">
              <span>📍 {stylist.location}</span>
              <span>
                ★ <strong className="text-stone-900">{stylist.rating}</strong>{" "}
                ({stylist.reviews} reviews)
              </span>
              <span>
                💰 <strong className="text-stone-900">${stylist.price}/hr</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: bio & specialties */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border border-stone-100 p-6">
              <h2 className="text-lg font-bold text-stone-900 mb-3">About</h2>
              <p className="text-stone-600 leading-relaxed">
                {stylist.name} is a certified personal stylist with a passion for
                helping people discover their authentic style. With years of
                experience in wardrobe consulting, personal shopping, and style
                coaching, they bring a thoughtful, personalized approach to every
                session. Whether you need a full closet overhaul or just want to
                organize your drawer, {stylist.name.split(" ")[0]} has you covered.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-stone-100 p-6">
              <h2 className="text-lg font-bold text-stone-900 mb-4">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {stylist.specialty.map((s) => (
                  <span
                    key={s}
                    className="bg-stone-100 text-stone-700 px-3 py-2 rounded-full text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-100 p-6">
              <h2 className="text-lg font-bold text-stone-900 mb-4">Recent Reviews</h2>
              <div className="space-y-5">
                {reviews.map((review, i) => (
                  <div key={i} className="border-b border-stone-100 last:border-0 pb-5 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-stone-800">{review.name}</span>
                      <span className="text-xs text-stone-400">{review.date}</span>
                    </div>
                    <p className="text-amber-400 text-sm mb-2">{"★".repeat(review.rating)}</p>
                    <p className="text-stone-600 text-sm leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: booking card */}
          <div>
            <div className="bg-white rounded-2xl border border-stone-100 p-6 sticky top-28">
              <p className="text-2xl font-bold text-stone-900 mb-1">
                ${stylist.price}
                <span className="text-base font-normal text-stone-400">/hr</span>
              </p>
              <p className="text-sm text-stone-500 mb-6">Session includes consultation, wardrobe audit & outfit building</p>

              <div className="space-y-3 text-sm text-stone-600 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> In-home or virtual session
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Personalized style report
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Shopping list included
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Free follow-up message
                </div>
              </div>

              {stylist.available ? (
                <Link
                  href={`/book/${stylist.id}`}
                  className="block w-full text-center bg-stone-900 text-white py-3 rounded-full font-medium hover:bg-stone-700 transition-colors"
                >
                  Book a Session
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full text-center bg-stone-200 text-stone-400 py-3 rounded-full font-medium cursor-not-allowed"
                >
                  Fully Booked
                </button>
              )}
              <p className="text-xs text-center text-stone-400 mt-3">You won&apos;t be charged yet</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
