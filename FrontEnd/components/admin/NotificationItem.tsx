"use client";
import { Notification } from "@/types/admin/notification";

interface Props {
  notification: Notification;
  onMarkAsSeen: (id: string) => void;
}

export default function NotificationItem({ notification, onMarkAsSeen }: Props) {
  return (
    <div
      className={`p-5 mb-5 border rounded-lg shadow-sm transition duration-300 ${
        !notification.seen
          ? "bg-yellow-50 border-yellow-400 hover:bg-yellow-100"
          : "bg-white border-gray-200 hover:bg-gray-50"
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-800">
            {notification.type?.toUpperCase()}
          </p>
          <p className="text-gray-700">{notification.message}</p>
          <p className="text-xs text-gray-500">
            {new Date(notification.createdAt).toLocaleString()}
          </p>
        </div>
        {!notification.seen && (
          <button
            onClick={() => onMarkAsSeen(notification._id)}
            className="ml-4 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Mark As Seen
          </button>
        )}
      </div>
    </div>
  );
}
