export async function getOrdersByUserId(userId: string) {
    try {
      const res = await fetch(`http://localhost:5500/api/orders/user/${userId}`, {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch user orders");
      }
  
      return await res.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
  // utils/Admin/fetchAllOrders.ts
import axios from "axios";
import { Order } from "@/types/admin/order"; // TypeScript type for safety

export async function fetchAllOrders(): Promise<Order[]> {
  const response = await axios.get("http://localhost:5500/api/orders");
  return response.data;
}
