"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import { getUser, clearUser, showToast, type User } from "@/lib/store";

type NavbarProps = {
  active?: "browse" | "how-it-works" | "login" | "signup" | "dashboard" | "messages";
  dark?: boolean;
};

export default function Navbar({ active, dark = false }: NavbarProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setUser(getUser());
  }, []);

  function handleLogout() {
    clearUser();
    showToast("Logged out successfully.", "info");
    setMenuOpen(false);
    router.push("/");
  }

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
          <Link href="/browse" className={cls("browse")}>Browse</Link>
          <Link href="/how-it-works" className={cls("how-it-works")}>How it Works</Link>

          {user ? (
            <>
              <Link href="/messages" className={cls("messages")}>Messages</Link>
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px 8px",
                    borderRadius: "999px",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: user.avatar ?? "#BF6B4A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: "0.875rem",
                      fontWeight: 700,
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ fontSize: "0.875rem", color: dark ? "#C9BAB0" : "#18120E", fontWeight: 500 }}>
                    {user.name.split(" ")[0]}
                  </span>
                  <span style={{ fontSize: "0.6rem", color: dark ? "#897870" : "#897870" }}>▾</span>
                </button>

                {menuOpen && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "calc(100% + 8px)",
                      background: "#fff",
                      border: "1px solid #EDE6DC",
                      borderRadius: "12px",
                      boxShadow: "0 8px 32px rgba(24,18,14,0.12)",
                      minWidth: "180px",
                      overflow: "hidden",
                    }}
                  >
                    {[
                      { label: "My Dashboard", href: user.role === "stylist" ? "/stylist-dashboard" : "/dashboard" },
                      { label: "Messages", href: "/messages" },
                      { label: "Browse Stylists", href: "/browse" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          display: "block",
                          padding: "10px 16px",
                          fontSize: "0.875rem",
                          color: "#18120E",
                          textDecoration: "none",
                          borderBottom: "1px solid #EDE6DC",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#FAF7F2")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "10px 16px",
                        fontSize: "0.875rem",
                        color: "#9B3E28",
                        background: "transparent",
                        border: "none",
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#FEF2EE")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
