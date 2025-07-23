import { Notification } from "@/types/admin/notification";

export const fetchAllNotifications = async (): Promise<Notification[]> => {
  const res = await fetch("http://localhost:5500/api/notifications");
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return res.json();
};

export const markNotificationSeen = async (id: string): Promise<void> => {
  const res = await fetch(`http://localhost:5500/api/notifications/seen/${id}`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Failed to mark as seen");
};
