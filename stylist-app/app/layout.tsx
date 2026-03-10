import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StyleBook — Book a Personal Stylist",
  description: "Connect with expert stylists who help you organize your wardrobe and elevate your style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
