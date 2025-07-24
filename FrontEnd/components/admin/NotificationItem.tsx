// components/admin/NotificationList.tsx
"use client";
import { useEffect, useState } from "react";

type Notification = {
  _id: string;
  type: string;
  message: string;
  isSeen: boolean;
  createdAt: string;
};

export default function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetch("/api/notifications/unseen")
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((err) => console.error("Fetch notifications failed", err));
  }, []);

  const handleMarkAsSeen = async (id: string) => {
    await fetch(`/api/notifications/seen/${id}`, { method: "PATCH" });
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isSeen: true } : n))
    );
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">🔔 New Notifications</h2>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        notifications.map((n) => (
          <div
            key={n._id}
            className="border p-3 rounded shadow-md flex justify-between items-center"
          >
            <div>
              <p>{n.message}</p>
              <p className="text-sm text-gray-500">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => handleMarkAsSeen(n._id)}
              className="text-blue-600 hover:underline"
            >
              Mark as seen
            </button>
          </div>
        ))
      )}
    </div>
  );
}
