export interface DashboardStats {
  revenue: number;
  newOrderCount: number;
  pendingOrderCount: number;
  completedOrderCount: number;
  cancelOrderCount?: number;
  refundCount?: number;
  customerCount: number;
}
