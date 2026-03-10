import Link from "next/link";

/**
 * The StyleBook mark: a bookmark ribbon in clay + the wordmark.
 * "Style" — serif bold  |  "Book" — lighter weight, tracking wide
 */
export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const scale = size === "sm" ? 0.75 : size === "lg" ? 1.35 : 1;
  const markW = Math.round(18 * scale);
  const markH = Math.round(22 * scale);

  return (
    <Link href="/" className="flex items-center gap-2.5 select-none">
      {/* Bookmark mark */}
      <svg
        width={markW}
        height={markH}
        viewBox="0 0 18 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer bookmark shape */}
        <path
          d="M0 0 H18 V22 L9 16 L0 22 Z"
          fill="#BF6B4A"
        />
        {/* Inner cut (negative space for depth) */}
        <path
          d="M3 3 H15 V17.5 L9 13.5 L3 17.5 Z"
          fill="#FAF7F2"
          opacity="0.18"
        />
      </svg>

      {/* Wordmark */}
      <span
        style={{
          fontSize: size === "sm" ? "1rem" : size === "lg" ? "1.5rem" : "1.2rem",
          lineHeight: 1,
          letterSpacing: "-0.01em",
        }}
      >
        <span
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 700,
            color: "#18120E",
          }}
        >
          Style
        </span>
        <span
          style={{
            fontFamily: "system-ui, sans-serif",
            fontWeight: 400,
            letterSpacing: "0.08em",
            color: "#897870",
            textTransform: "uppercase",
            fontSize: "0.75em",
          }}
        >
          book
        </span>
      </span>
    </Link>
  );
}
