// utils/Admin/fetchCompletedOrders.ts
import { Order } from "@/types/admin/order";

export const fetchCompletedOrders = async (): Promise<Order[]> => {
  const res = await fetch("http://localhost:5500/api/updates/Completed");
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

export const updateOrderStatus = async (orderId: string, newStatus: string): Promise<void> => {
  const res = await fetch(`http://localhost:5500/api/updates/${orderId}/final`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus }),
  });

  if (!res.ok) throw new Error("Failed to update status");
};






