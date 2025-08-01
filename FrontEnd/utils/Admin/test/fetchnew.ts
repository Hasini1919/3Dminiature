import axios from "axios";
import { Order } from "@/types/admin/test/order";

export const fetchOrders = async (status?: string): Promise<Order[]> => {
  const url = status
    ? `http://localhost:5500/api/orders?status=${encodeURIComponent(status)}`
    : "http://localhost:5500/api/orders";

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
};


export const updateOrderStatus = async (orderId: string, newStatus: string) => {
  const res = await fetch(`http://localhost:5500/api/orders/${orderId}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus }),
  });
  if (!res.ok) throw new Error("Failed to update status");
};


export const updateOrderPaymentStatus = async (orderId: string, paymentStatus: boolean) => {
  try {
    const response = await axios.put(
      `http://localhost:5500/api/orders/${orderId}/payment`,
      { payment: paymentStatus }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update payment status");
  }
};

