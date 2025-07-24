import { Notification } from "@/types/admin/notification";

const BASE_URL = "http://localhost:5500/api/notifications";

export async function fetchNotifications(): Promise<Notification[]> {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return res.json();
}

export async function markNotificationSeen(id: string): Promise<void> {
  await fetch(`${BASE_URL}/${id}/seen`, { method: "PATCH" });
}

export async function markAllNotificationsSeen(): Promise<void> {
  await fetch(`${BASE_URL}/markAllSeen`, { method: "PATCH" });
}
