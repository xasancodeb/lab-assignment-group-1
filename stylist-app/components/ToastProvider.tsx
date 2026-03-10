"use client";
import { useEffect, useState } from "react";
import { subscribeToasts, Toast } from "@/lib/store";

export default function ToastProvider() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsub = subscribeToasts(setToasts);
    return unsub;
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          style={{
            padding: "0.875rem 1.25rem",
            borderRadius: "12px",
            fontSize: "0.875rem",
            fontFamily: "system-ui, sans-serif",
            fontWeight: 500,
            maxWidth: "340px",
            boxShadow: "0 8px 32px rgba(24,18,14,0.18)",
            background:
              t.type === "success"
                ? "#18120E"
                : t.type === "error"
                ? "#9B3E28"
                : "#2D1B69",
            color: "#FAF7F2",
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            animation: "fadeUp 0.25s ease",
          }}
        >
          <span style={{ fontSize: "1rem" }}>
            {t.type === "success" ? "✓" : t.type === "error" ? "✕" : "ℹ"}
          </span>
          {t.message}
        </div>
      ))}
    </div>
  );
}
