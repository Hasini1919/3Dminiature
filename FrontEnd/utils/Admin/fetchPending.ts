// utils/Admin/fetchPendingOrders.ts
import { Order } from "@/types/admin/order";

export const fetchPendingOrders = async (): Promise<Order[]> => {
  const res = await fetch("http://localhost:5500/api/updates/pending");
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

export const updateOrderStatus = async (orderId: string, newStatus: string): Promise<void> => {
  const res = await fetch(`http://localhost:5500/api/updates/${orderId}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus }),
  });

  if (!res.ok) throw new Error("Failed to update status");
};
