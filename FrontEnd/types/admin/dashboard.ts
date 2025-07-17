export interface DashboardStats {
    revenue: number | null;
    newOrderCount: number;
    pendingOrderCount: number;
    completedOrderCount: number;
    customerCount: number;
    refundCount?: number;
    cancelOrderCount?: number;
  }
  