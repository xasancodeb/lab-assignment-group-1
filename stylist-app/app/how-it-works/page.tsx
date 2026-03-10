import Link from "next/link";
import { howItWorks } from "@/lib/data";

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
    <main className="min-h-screen bg-[#faf9f7]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f7]/90 backdrop-blur border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">StyleBook</Link>
          <div className="flex items-center gap-6 text-sm text-stone-600">
            <Link href="/browse" className="hover:text-stone-900 transition-colors">Browse Stylists</Link>
            <Link href="/how-it-works" className="text-stone-900 font-medium">How it Works</Link>
          </div>
        </div>
      </nav>

      <div className="pt-36 pb-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-stone-900 mb-4">How StyleBook Works</h1>
          <p className="text-xl text-stone-500 max-w-2xl mx-auto">
            From browsing to a transformed wardrobe — it&apos;s simpler than you think.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-12 mb-24">
          {howItWorks.map((item, i) => (
            <div key={item.step} className="flex gap-8 items-start">
              <div className="shrink-0 w-16 h-16 bg-stone-900 text-white rounded-2xl flex items-center justify-center text-xl font-bold">
                {i + 1}
              </div>
              <div className="pt-2">
                <h3 className="text-2xl font-bold text-stone-900 mb-3">{item.title}</h3>
                <p className="text-stone-500 text-lg leading-relaxed max-w-xl">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-stone-900 mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl border border-stone-100 p-6">
                <h3 className="font-bold text-stone-900 mb-2">{faq.q}</h3>
                <p className="text-stone-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-stone-900 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-stone-400 mb-8">Browse stylists and book your first session today.</p>
          <Link
            href="/browse"
            className="bg-white text-stone-900 px-8 py-3 rounded-full font-medium hover:bg-stone-100 transition-colors"
          >
            Find Your Stylist
          </Link>
        </div>
      </div>
    </main>
  );
}
