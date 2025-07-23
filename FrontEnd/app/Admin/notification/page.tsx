// FRONTEND (Next.js 13+ with TypeScript & Tailwind)
// File: app/Admin/notification/page.tsx

"use client";
import { useEffect, useState } from "react";

type Notification = {
  _id: string;
  type: "ORDER_PLACED" | string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

type RelatedInfo = {
  type: string;
  info: any; // Replace with appropriate type if known
};

export default function NotificationsPanel() {
  const [notifs, setNotifs] = useState<Notification[]>([]);
  const [selected, setSelected] = useState<Notification | null>(null);
  const [detail, setDetail] = useState<RelatedInfo | null>(null);

  useEffect(() => {
    fetch("http://localhost:5500/api/notifications")
      .then((r) => r.json())
      .then(setNotifs);
  }, []);

  const markRead = async (id: string) => {
    await fetch(`http://localhost:5500/api/notifications/${id}/read`, {
      method: "POST",
    });
    setNotifs((prev) => prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)));
  };

  const clickNotif = async (n: Notification) => {
    setSelected(n);
    await markRead(n._id);
    const res = await fetch(`http://localhost:5500/api/notifications/related/${n._id}`);
    const json = await res.json();
    setDetail(json);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      <ul className="space-y-2">
        {notifs.map((n) => (
          <li key={n._id} className={n.isRead ? "text-gray-400" : "font-bold"}>
            <button onClick={() => clickNotif(n)}>
              {n.message} • {new Date(n.createdAt).toLocaleString()}
            </button>
          </li>
        ))}
      </ul>

      {detail && (
        <div className="mt-6 p-4 border rounded bg-white">
          {detail.type === "ORDER_PLACED" && (
            <div>
              <h3 className="text-lg font-semibold">Order Placed</h3>
              <p>Order #: {detail.info.orderNumber}</p>
              <p>Date: {new Date(detail.info.date).toLocaleString()}</p>
            </div>
          )}
          {/* Handle other types */}
        </div>
      )}
    </div>
  );
}