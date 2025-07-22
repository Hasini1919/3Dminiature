// utils/Admin/fetchCustomers.ts
import { Customers } from "@/types/admin/customer";

export const fetchCustomers = async (): Promise<Customers[]> => {
  const res = await fetch("http://localhost:5500/api/customer"); // or the correct API path
  if (!res.ok) throw new Error("Failed to fetch customers");
  return res.json();
};
