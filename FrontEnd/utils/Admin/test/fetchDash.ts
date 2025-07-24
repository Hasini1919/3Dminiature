import { DashboardStats } from "@/types/admin/dashboard";

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const res = await fetch("http://localhost:5500/api/dashboard-stats");
  if (!res.ok) throw new Error("Failed to fetch dashboard stats");
  const data = await res.json();
  return {
    revenue: data.totalRevenue ?? 0,
    newOrderCount: data.orderPlacedCount ?? 0,
    pendingOrderCount: data.processingCount ?? 0,
    completedOrderCount: data.completedCount ?? 0,
    cancelOrderCount: data.canceledCount ?? 0,
    refundCount: data.refundCount ?? 0,
    customerCount: data.totalCustomers ?? 0,
  };
};
