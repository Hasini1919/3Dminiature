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

    useEffect(() => {
        const fetchNotifications = () => {
            fetch('http://localhost:5500/api/notifications')
                .then(res => res.json())
                .then(data => setNotifications(data));

        };

        fetchNotifications();
        const interval = setInterval(fetchNotifications, 10000);
        return () => clearInterval(interval);
    },
        []);


    const markAsSeen = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:5500/api/notifications/seen/${id}`, { method: 'PATCH' });
            const updated = await fetch('http://localhost:1000/api/notifications').then(res => res.json());
            setNotifications(updated);
            if (!res.ok) throw new Error('Failed to mark as seen');
            setNotifications(notifications.map(n => n._id === id ? { ...n, seen: true } : n));
        } catch (error) {
            console.error('Error marking notification as seen:', error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl mb-4">Notifications</h2>
            {notifications.map(n => (
                <div
                    key={n._id}
                    className={`p-4 mb-2 border rounded-lg shadow-sm ${!n.seen ? 'bg-yellow-100 border-yellow-500' : 'bg-gray-50'}`}>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{n.type ? n.type.toUpperCase() : ''}</p>
                            <p>{n.message}</p>
                            <p className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</p>

                        </div>
                        {!n.seen && (
                            <button
                                onClick={() => markAsSeen(n._id)}
                                className="text-sm text-blue-600 hover:underline">
                                Mark As Seen
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}