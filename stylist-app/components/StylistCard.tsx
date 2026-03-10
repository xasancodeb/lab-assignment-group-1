import Link from "next/link";
import { Stylist } from "@/lib/data";

export default function StylistCard({ stylist }: { stylist: Stylist }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-100 hover:shadow-lg transition-shadow group">
      {/* Cover */}
      <div
        className="h-32 relative"
        style={{ backgroundColor: stylist.coverColor }}
      >
        {/* Avatar */}
        <div
          className="absolute -bottom-8 left-5 w-16 h-16 rounded-full border-4 border-white flex items-center justify-center text-xl font-bold text-white"
          style={{ backgroundColor: stylist.avatar }}
        >
          {stylist.name.charAt(0)}
        </div>
        {stylist.available ? (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            Available
          </span>
        ) : (
          <span className="absolute top-3 right-3 bg-stone-400 text-white text-xs px-2 py-1 rounded-full font-medium">
            Booked
          </span>
        )}
      </div>

      {/* Content */}
      <div className="pt-10 px-5 pb-5">
        <h3 className="font-bold text-stone-900 text-lg">{stylist.name}</h3>
        <p className="text-stone-500 text-sm mb-3">{stylist.tagline}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {stylist.specialty.slice(0, 2).map((s) => (
            <span
              key={s}
              className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-full"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <span className="text-amber-500">★</span>
            <span className="font-semibold text-stone-800">{stylist.rating}</span>
            <span className="text-stone-400">({stylist.reviews})</span>
          </div>
          <span className="text-stone-700 font-semibold">${stylist.price}/hr</span>
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            href={`/stylist/${stylist.id}`}
            className="flex-1 text-center text-sm border border-stone-200 text-stone-700 py-2 rounded-full hover:bg-stone-50 transition-colors"
          >
            View Profile
          </Link>
          {stylist.available && (
            <Link
              href={`/book/${stylist.id}`}
              className="flex-1 text-center text-sm bg-stone-900 text-white py-2 rounded-full hover:bg-stone-700 transition-colors"
            >
              Book
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
