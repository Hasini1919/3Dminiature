"use client";

import React, { useState } from "react";
import Top from "@/components/user-history/manubar";
import OrderList from "@/components/user-history/filter-orders";

interface Filters {
  from: string;
  to: string;
  status: string[];
}

const Orders: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    from: '',
    to: '',
    status: ['Pending', 'Shipped', 'Cancelled', 'Order Placed'],
  });

  const handleDateFilter = (from: string, to: string) => {
    setFilters({
      from,
      to,
      status: ['Pending', 'Shipped', 'Cancelled', 'Order Placed'],
    });
  };

  const isDateFilterActive = filters.from !== '' && filters.to !== '';

  const endpoint = isDateFilterActive
    ? "/api/order/filter-by-date"
    : "/api/order/pendingOrders";

  const params: Record<string, string | string[]> = isDateFilterActive
    ? { from: filters.from, to: filters.to, status: filters.status }
    : { status: filters.status };

  return (
    <div className="grid grid-rows-12 h-dvh p-4 shadow-md bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="row-span-1">
        <Top onFilter={handleDateFilter} />
      </div>
      <div className="row-span-11 p-8 h-full overflow-y-auto space-y-3">
        <OrderList endpoint={endpoint} params={params} />
      </div>
    </div>
  );
};

export default Orders;