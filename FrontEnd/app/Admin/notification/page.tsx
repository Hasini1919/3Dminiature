"use client";

import { useEffect, useState } from "react";
import { Notification } from "@/types/admin/notification";
import NotificationItem from "@/components/admin/NotificationItem";
import { fetchAllNotifications, markNotificationSeen } from "@/utils/Admin/notification";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const loadNotifications = async () => {
    try {
      const data = await fetchAllNotifications();
      setNotifications(data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  const handleMarkAsSeen = async (id: string) => {
    try {
      await markNotificationSeen(id);
      loadNotifications();
    } catch (err) {
      console.error("Error marking notification as seen:", err);
    }
  };

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-28 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-2">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-center text-gray-500">No notifications to display.</p>
      ) : (
        notifications.map((notification) => (
          <NotificationItem
            key={notification._id}
            notification={notification}
            onMarkAsSeen={handleMarkAsSeen}
          />
        ))
      )}
    </div>
  );
}
