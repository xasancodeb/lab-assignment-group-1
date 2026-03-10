import Link from "next/link";
import Logo from "./Logo";

type NavbarProps = {
  active?: "browse" | "how-it-works" | "login" | "signup";
  /** When true, renders over a dark background */
  dark?: boolean;
};

export default function Navbar({ active, dark = false }: NavbarProps) {
  const base = dark
    ? "bg-[#18120E]/90 border-[#2E2018]"
    : "bg-[#FAF7F2]/90 border-[#EDE6DC]";
  const linkColor = dark ? "text-[#C9BAB0]" : "text-[#897870]";
  const linkHover = dark ? "hover:text-[#FAF7F2]" : "hover:text-[#18120E]";
  const activeColor = dark ? "text-[#FAF7F2]" : "text-[#18120E]";

  function cls(page: typeof active) {
    const isActive = active === page;
    return `transition-colors font-sans text-sm ${isActive ? `${activeColor} font-semibold` : `${linkColor} ${linkHover}`}`;
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur border-b ${base}`}
      style={{ fontFamily: "system-ui, sans-serif" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />

        <div className="flex items-center gap-7">
          <Link href="/browse" className={cls("browse")}>
            Browse
          </Link>
          <Link href="/how-it-works" className={cls("how-it-works")}>
            How it Works
          </Link>
          <Link
            href="/login"
            className={`transition-colors text-sm font-sans ${dark ? "text-[#C9BAB0] hover:text-[#FAF7F2]" : "text-[#897870] hover:text-[#18120E]"}`}
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="text-sm font-sans font-medium bg-[#BF6B4A] text-white px-5 py-2 rounded-full hover:bg-[#A85A3B] transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
