"use client";

import { useEffect, useState } from "react";
import { FiBell } from "react-icons/fi";
import Link from "next/link";
import { fetchNotifications } from "@/utils/Admin/notification";

export default function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const notifications = await fetchNotifications();
        const unread = notifications.filter((n) => !n.isSeen).length;
        setUnreadCount(unread);
      } catch {}
    }
    load();
  }, []);

  return (
    <Link href="/Admin/notifications" className="relative p-2 text-gray-600 hover:text-blue-600">
      <FiBell size={24} />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </Link>
  );
}
