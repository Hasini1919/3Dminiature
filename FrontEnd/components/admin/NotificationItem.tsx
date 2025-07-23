// i use here

"use client";
import { Notification } from "@/types/admin/notification";

interface Props {
  notification: Notification;
  onMarkAsSeen: (id: string) => void;
}

export default function NotificationItem({ notification, onMarkAsSeen }: Props) {
  return (
    <div
      className={`relative p-6 mb-4 border-l-4 rounded-r-lg shadow-md transition-all duration-300 hover:shadow-lg ${
        !notification.seen
          ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-blue-500 hover:from-blue-100 hover:to-indigo-100"
          : "bg-white border-l-gray-300 hover:bg-gray-50"
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 space-y-3">
          <div className="flex items-center space-x-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
                !notification.seen
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {notification.type}
            </span>
            {!notification.seen && (
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            )}
          </div>
          
          <p className="text-gray-800 leading-relaxed font-medium">
            {notification.message}
          </p>
          
          <div className="flex items-center text-xs text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {new Date(notification.createdAt).toLocaleString()}
          </div>
        </div>
        
        {!notification.seen && (
          <button
            onClick={() => onMarkAsSeen(notification._id)}
            className="ml-6 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Mark as Read
          </button>
        )}
      </div>
    </div>
  );
}