'use client';
import { useEffect, useState } from "react";

interface Notification {
    _id: string;
    type: string;
    message: string;
    seen: boolean;
    createdAt: string;
}

export default function Notification() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const fetchNotifications = async () => {
        try {
            const res = await fetch('http://localhost:5500/api/notifications');
            if (!res.ok) throw new Error("Failed to fetch notifications");
            const data = await res.json();
            setNotifications(data);
        } catch (err) {
            console.error("Error fetching notifications:", err);
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 10000);
        return () => clearInterval(interval);
    }, []);

    const markAsSeen = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:5500/api/notifications/seen/${id}`, {
                method: 'PATCH'
            });
            if (!res.ok) throw new Error('Failed to mark as seen');
            await fetchNotifications();
        } catch (error) {
            console.error('Error marking notification as seen:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-28 p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-2">Notifications</h2>

            {notifications.length === 0 ? (
                <p className="text-center text-gray-500">No notifications to display.</p>
            ) : (
                notifications.map((n) => (
                    <div
                        key={n._id}
                        className={`p-5 mb-5 border rounded-lg shadow-sm transition duration-300 ${!n.seen
                                ? 'bg-yellow-50 border-yellow-400 hover:bg-yellow-100'
                                : 'bg-white border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="text-sm font-semibold text-gray-800">{n.type?.toUpperCase()}</p>
                                <p className="text-gray-700">{n.message}</p>
                                <p className="text-xs text-gray-500">
                                    {new Date(n.createdAt).toLocaleString()}
                                </p>
                            </div>
                            {!n.seen && (
                                <button
                                    onClick={() => markAsSeen(n._id)}
                                    className="ml-4 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                >
                                    Mark As Seen
                                </button>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
