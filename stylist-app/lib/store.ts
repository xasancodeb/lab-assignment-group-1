"use client";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "stylist";
  avatar?: string; // color hex
  location?: string;
  bio?: string;
  savedStylists?: string[]; // stylist ids
};

export type Booking = {
  id: string;
  stylistId: string;
  stylistName: string;
  stylistAvatar: string;
  service: string;
  date: string;
  time: string;
  price: number;
  status: "upcoming" | "completed" | "cancelled";
  createdAt: string;
};

export type Message = {
  id: string;
  threadId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  read: boolean;
};

export type Thread = {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastTimestamp: string;
  unread: number;
};

// ── Auth helpers ──────────────────────────────────────────────────────────────

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("sb_user");
  if (!raw) return null;
  try { return JSON.parse(raw) as User; } catch { return null; }
}

export function setUser(user: User) {
  localStorage.setItem("sb_user", JSON.stringify(user));
}

export function clearUser() {
  localStorage.removeItem("sb_user");
}

// ── Bookings helpers ──────────────────────────────────────────────────────────

export function getBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem("sb_bookings");
  if (!raw) return [];
  try { return JSON.parse(raw) as Booking[]; } catch { return []; }
}

export function addBooking(booking: Booking) {
  const bookings = getBookings();
  bookings.unshift(booking);
  localStorage.setItem("sb_bookings", JSON.stringify(bookings));
}

export function cancelBooking(id: string) {
  const bookings = getBookings().map((b) =>
    b.id === id ? { ...b, status: "cancelled" as const } : b
  );
  localStorage.setItem("sb_bookings", JSON.stringify(bookings));
}

// ── Saved stylists ────────────────────────────────────────────────────────────

export function getSaved(): string[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem("sb_saved");
  if (!raw) return [];
  try { return JSON.parse(raw) as string[]; } catch { return []; }
}

export function toggleSaved(stylistId: string): boolean {
  const saved = getSaved();
  const idx = saved.indexOf(stylistId);
  if (idx === -1) {
    saved.push(stylistId);
    localStorage.setItem("sb_saved", JSON.stringify(saved));
    return true; // now saved
  } else {
    saved.splice(idx, 1);
    localStorage.setItem("sb_saved", JSON.stringify(saved));
    return false; // removed
  }
}

// ── Messages helpers ──────────────────────────────────────────────────────────

export function getThreads(): Thread[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem("sb_threads");
  if (!raw) {
    // seed demo threads
    const demo: Thread[] = [
      {
        id: "t1",
        participantId: "1",
        participantName: "Amara Osei",
        participantAvatar: "#D4A574",
        lastMessage: "Looking forward to our session on Friday!",
        lastTimestamp: new Date(Date.now() - 3600000).toISOString(),
        unread: 1,
      },
      {
        id: "t2",
        participantId: "4",
        participantName: "Sofia Reyes",
        participantAvatar: "#C9B8A8",
        lastMessage: "I've reviewed your style quiz. Here are my thoughts...",
        lastTimestamp: new Date(Date.now() - 86400000).toISOString(),
        unread: 0,
      },
    ];
    localStorage.setItem("sb_threads", JSON.stringify(demo));
    return demo;
  }
  try { return JSON.parse(raw) as Thread[]; } catch { return []; }
}

export function getMessages(threadId: string): Message[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(`sb_messages_${threadId}`);
  if (!raw) {
    const demo: Message[] =
      threadId === "t1"
        ? [
            { id: "m1", threadId: "t1", senderId: "1", senderName: "Amara Osei", text: "Hi! I'm so excited to work with you.", timestamp: new Date(Date.now() - 7200000).toISOString(), read: true },
            { id: "m2", threadId: "t1", senderId: "me", senderName: "You", text: "Me too! Can't wait to organize my closet.", timestamp: new Date(Date.now() - 5400000).toISOString(), read: true },
            { id: "m3", threadId: "t1", senderId: "1", senderName: "Amara Osei", text: "Looking forward to our session on Friday!", timestamp: new Date(Date.now() - 3600000).toISOString(), read: false },
          ]
        : [
            { id: "m4", threadId: "t2", senderId: "4", senderName: "Sofia Reyes", text: "Hello! I've reviewed your style quiz. Here are my initial thoughts on building your capsule wardrobe...", timestamp: new Date(Date.now() - 86400000).toISOString(), read: true },
          ];
    localStorage.setItem(`sb_messages_${threadId}`, JSON.stringify(demo));
    return demo;
  }
  try { return JSON.parse(raw) as Message[]; } catch { return []; }
}

export function sendMessage(threadId: string, text: string, userId: string, userName: string) {
  const messages = getMessages(threadId);
  const newMsg: Message = {
    id: `m${Date.now()}`,
    threadId,
    senderId: userId,
    senderName: userName,
    text,
    timestamp: new Date().toISOString(),
    read: true,
  };
  messages.push(newMsg);
  localStorage.setItem(`sb_messages_${threadId}`, JSON.stringify(messages));

  // update thread
  const threads = getThreads();
  const updated = threads.map((t) =>
    t.id === threadId ? { ...t, lastMessage: text, lastTimestamp: newMsg.timestamp, unread: 0 } : t
  );
  localStorage.setItem("sb_threads", JSON.stringify(updated));
  return newMsg;
}

// ── Notifications ─────────────────────────────────────────────────────────────

export type Toast = { id: string; message: string; type: "success" | "error" | "info" };

type ToastListener = (toasts: Toast[]) => void;
const listeners: ToastListener[] = [];
let toastQueue: Toast[] = [];

export function showToast(message: string, type: Toast["type"] = "success") {
  const toast: Toast = { id: String(Date.now()), message, type };
  toastQueue = [...toastQueue, toast];
  listeners.forEach((l) => l(toastQueue));
  setTimeout(() => {
    toastQueue = toastQueue.filter((t) => t.id !== toast.id);
    listeners.forEach((l) => l(toastQueue));
  }, 4000);
}

export function subscribeToasts(fn: ToastListener) {
  listeners.push(fn);
  return () => { const i = listeners.indexOf(fn); if (i > -1) listeners.splice(i, 1); };
}
