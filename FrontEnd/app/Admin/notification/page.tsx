// app/Admin/notification/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { FiBell, FiX, FiCheck } from 'react-icons/fi';

interface Notification {
  _id: string;
  type: string;
  message: string;
  seen: boolean;
  createdAt: string;
}

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("http://localhost:5500/api/notifications");
        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error("Failed to load notifications", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotifications();
  }, []);

  const markAsSeen = async (id: string) => {
    try {
      await fetch(`http://localhost:5500/api/notifications/seen/${id}`, {
        method: "PATCH",
      });
      setNotifications(prev => 
        prev.map(n => n._id === id ? {...n, seen: true} : n)
      );
    } catch (err) {
      console.error("Error marking as seen", err);
    }
  };

  const markAllAsSeen = async () => {
    try {
      await fetch("http://localhost:5500/api/notifications/mark-all-seen", {
        method: "PATCH",
      });
      setNotifications(prev => prev.map(n => ({...n, seen: true})));
    } catch (err) {
      console.error("Error marking all as seen", err);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await fetch(`http://localhost:5500/api/notifications/${id}`, {
        method: "DELETE",
      });
      setNotifications(prev => prev.filter(n => n._id !== id));
    } catch (err) {
      console.error("Error deleting notification", err);
    }
  };

  const clearAllNotifications = async () => {
    try {
      await fetch("http://localhost:5500/api/notifications/clear", {
        method: "DELETE",
      });
      setNotifications([]);
    } catch (err) {
      console.error("Error clearing notifications", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center">
              <FiBell className="mr-3" />
              Notifications
            </h1>
            <div className="space-x-2">
              <button 
                onClick={markAllAsSeen}
                className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg flex items-center"
              >
                <FiCheck className="mr-2" />
                Mark All as Seen
              </button>
              <button 
                onClick={clearAllNotifications}
                className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg flex items-center"
              >
                <FiX className="mr-2" />
                Clear All
              </button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {notifications.length === 0 ? (
            <div className="p-12 text-center">
              <FiBell className="mx-auto text-gray-400 text-4xl mb-4" />
              <h3 className="text-xl font-medium text-gray-900">No notifications</h3>
              <p className="text-gray-500 mt-1">You're all caught up!</p>
            </div>
          ) : (
            notifications.map(notification => (
              <div 
                key={notification._id} 
                className={`p-4 flex items-start ${!notification.seen ? 'bg-red-50' : ''}`}
              >
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    !notification.seen ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <FiBell />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {!notification.seen && (
                    <button 
                      onClick={() => markAsSeen(notification._id)}
                      className="text-green-600 hover:text-green-800"
                      title="Mark as seen"
                    >
                      <FiCheck size={18} />
                    </button>
                  )}
                  <button 
                    onClick={() => deleteNotification(notification._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete notification"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}