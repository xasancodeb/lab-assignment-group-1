"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  getUser,
  getThreads,
  getMessages,
  sendMessage,
  type User,
  type Thread,
  type Message,
} from "@/lib/store";
import { Suspense } from "react";

function MessagesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeThread, setActiveThread] = useState<Thread | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const u = getUser();
    if (!u) { router.replace("/login"); return; }
    setUser(u);
    const ts = getThreads();
    setThreads(ts);

    const threadId = searchParams.get("thread");
    const initial = threadId ? ts.find((t) => t.id === threadId) ?? ts[0] : ts[0];
    if (initial) {
      setActiveThread(initial);
      setMessages(getMessages(initial.id));
    }
  }, [router, searchParams]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSelectThread(thread: Thread) {
    setActiveThread(thread);
    setMessages(getMessages(thread.id));
    setInput("");
    // mark as read
    setThreads((prev) => prev.map((t) => t.id === thread.id ? { ...t, unread: 0 } : t));
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || !activeThread || !user) return;
    const msg = sendMessage(activeThread.id, input.trim(), user.id, user.name);
    setMessages((prev) => [...prev, msg]);
    setThreads(getThreads());
    setInput("");
  }

  function formatTime(iso: string) {
    const d = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    if (diff < 86400000) return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    if (diff < 604800000) return d.toLocaleDateString([], { weekday: "short" });
    return d.toLocaleDateString([], { month: "short", day: "numeric" });
  }

  if (!user) return null;

  return (
    <main style={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#FAF7F2", fontFamily: "Georgia, serif" }}>
      <Navbar active="messages" />

      <div style={{ flex: 1, display: "flex", overflow: "hidden", paddingTop: "64px" }}>
        {/* Sidebar: thread list */}
        <div
          style={{
            width: 300,
            borderRight: "1px solid #EDE6DC",
            display: "flex",
            flexDirection: "column",
            background: "#fff",
            flexShrink: 0,
          }}
        >
          <div style={{ padding: "1.25rem 1rem 0.75rem", borderBottom: "1px solid #EDE6DC" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#18120E", margin: 0 }}>Messages</h2>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {threads.map((t) => (
              <button
                key={t.id}
                onClick={() => handleSelectThread(t)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.875rem 1rem",
                  background: activeThread?.id === t.id ? "#FAF7F2" : "transparent",
                  border: "none",
                  borderBottom: "1px solid #EDE6DC",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => { if (activeThread?.id !== t.id) e.currentTarget.style.background = "#F5EDE7"; }}
                onMouseLeave={(e) => { if (activeThread?.id !== t.id) e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div
                    style={{
                      width: 40, height: 40, borderRadius: "50%",
                      background: t.participantAvatar,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontWeight: 700, fontSize: "0.875rem",
                    }}
                  >
                    {t.participantName.charAt(0)}
                  </div>
                  {t.unread > 0 && (
                    <span
                      style={{
                        position: "absolute", top: -2, right: -2,
                        width: 16, height: 16, borderRadius: "50%",
                        background: "#BF6B4A", color: "#fff",
                        fontSize: "0.6rem", fontFamily: "system-ui, sans-serif",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 700,
                      }}
                    >
                      {t.unread}
                    </span>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px" }}>
                    <p style={{ fontWeight: t.unread > 0 ? 700 : 600, color: "#18120E", margin: 0, fontSize: "0.875rem", fontFamily: "system-ui, sans-serif" }}>
                      {t.participantName}
                    </p>
                    <span style={{ fontSize: "0.7rem", color: "#C9BAB0", fontFamily: "system-ui, sans-serif" }}>
                      {formatTime(t.lastTimestamp)}
                    </span>
                  </div>
                  <p
                    style={{
                      color: t.unread > 0 ? "#18120E" : "#897870",
                      fontSize: "0.78rem",
                      fontFamily: "system-ui, sans-serif",
                      margin: 0,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontWeight: t.unread > 0 ? 600 : 400,
                    }}
                  >
                    {t.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        {activeThread ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Chat header */}
            <div style={{ padding: "0.875rem 1.25rem", borderBottom: "1px solid #EDE6DC", background: "#fff", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: activeThread.participantAvatar,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: 700,
                }}
              >
                {activeThread.participantName.charAt(0)}
              </div>
              <div>
                <p style={{ fontWeight: 700, color: "#18120E", margin: 0, fontSize: "0.95rem", fontFamily: "system-ui, sans-serif" }}>
                  {activeThread.participantName}
                </p>
                <p style={{ color: "#2D6A4F", fontSize: "0.75rem", fontFamily: "system-ui, sans-serif", margin: 0 }}>
                  Online
                </p>
              </div>
            </div>

            {/* Messages list */}
            <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {messages.map((msg) => {
                const isMe = msg.senderId === user.id || msg.senderId === "me";
                return (
                  <div
                    key={msg.id}
                    style={{ display: "flex", flexDirection: isMe ? "row-reverse" : "row", gap: "0.625rem", alignItems: "flex-end" }}
                  >
                    {!isMe && (
                      <div
                        style={{
                          width: 32, height: 32, borderRadius: "50%",
                          background: activeThread.participantAvatar,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#fff", fontWeight: 700, fontSize: "0.75rem", flexShrink: 0,
                        }}
                      >
                        {msg.senderName.charAt(0)}
                      </div>
                    )}
                    <div
                      style={{
                        maxWidth: "65%",
                        padding: "0.625rem 0.875rem",
                        borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                        background: isMe ? "#18120E" : "#fff",
                        color: isMe ? "#FAF7F2" : "#18120E",
                        fontSize: "0.875rem",
                        fontFamily: "system-ui, sans-serif",
                        lineHeight: 1.5,
                        border: isMe ? "none" : "1px solid #EDE6DC",
                        boxShadow: "0 1px 4px rgba(24,18,14,0.06)",
                      }}
                    >
                      {msg.text}
                    </div>
                    <span style={{ fontSize: "0.65rem", color: "#C9BAB0", fontFamily: "system-ui, sans-serif", flexShrink: 0 }}>
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSend}
              style={{
                padding: "1rem 1.25rem",
                borderTop: "1px solid #EDE6DC",
                background: "#fff",
                display: "flex",
                gap: "0.75rem",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                style={{
                  flex: 1,
                  border: "1px solid #EDE6DC",
                  borderRadius: "999px",
                  padding: "10px 18px",
                  fontSize: "0.875rem",
                  fontFamily: "system-ui, sans-serif",
                  color: "#18120E",
                  background: "#FAF7F2",
                  outline: "none",
                }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px #BF6B4A")}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              />
              <button
                type="submit"
                disabled={!input.trim()}
                style={{
                  background: "#BF6B4A",
                  border: "none",
                  borderRadius: "50%",
                  width: 40, height: 40,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: input.trim() ? "pointer" : "not-allowed",
                  opacity: input.trim() ? 1 : 0.5,
                  flexShrink: 0,
                  color: "#fff",
                  fontSize: "1rem",
                }}
              >
                ➤
              </button>
            </form>
          </div>
        ) : (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ color: "#897870", fontFamily: "system-ui, sans-serif" }}>Select a conversation to start messaging.</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function MessagesPage() {
  return (
    <Suspense>
      <MessagesContent />
    </Suspense>
  );
}
