import { DashboardStats } from "@/types/admin/dashboard";

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const [revenueRes, newRes, pendingRes, completedRes, customerRes] = await Promise.all([
    fetch("http://localhost:5500/api/orders-completed/revenue"),
    fetch("http://localhost:5500/api/order-stats/count-new"),
    fetch("http://localhost:5500/api/pending-stats/count-pending"),
    fetch("http://localhost:5500/api/completed-stats/count-completed"),
    fetch("http://localhost:5500/api/customer/count"),
  ]);

  const [revenue, newCount, pendingCount, completedCount, customerCount] = await Promise.all([
    revenueRes.json(),
    newRes.json(),
    pendingRes.json(),
    completedRes.json(),
    customerRes.json(),
  ]);

  return {
    revenue: revenue.revenue ?? 0,
    newOrderCount: newCount.count ?? 0,
    pendingOrderCount: pendingCount.count ?? 0,
    completedOrderCount: completedCount.count ?? 0,
    customerCount: customerCount.count ?? 0,
  };
};
