import { Order } from "@/types/admin/order";

export const fetchNewOrders = async (): Promise<Order[]> => {
  const res = await fetch("http://localhost:5500/api/orders/new");
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
};

export const updateOrderStatus = async (orderId: string, newStatus: string): Promise<void> => {
  const res = await fetch(`http://localhost:5500/api/orders/${orderId}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus }),
  });
  if (!res.ok) throw new Error("Failed to update order status");
};
