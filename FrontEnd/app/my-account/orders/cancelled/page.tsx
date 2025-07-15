"use client";
import React, { useState } from "react";
import Top from "@/components/user-history/manubar";
import OrderList from "@/components/user-history/filter-orders";

const Cancelled = () => {
  const [filters, setFilters] = useState({
    from: '',
    to: '',
    status: ['Cancelled'],
  });

  const handleDateFilter = (from: string, to: string) => {
    setFilters({
      from,
      to,
      status: [ 'Cancelled'],
    });
  };
   console.log(filters);
 
  const isDateFilterActive = filters.from && filters.to;
  const endpoint = isDateFilterActive
    ? "/api/order/filter-by-date"
    : "/api/order/pendingOrders";

  const params: Record<string, string | string[]> = isDateFilterActive
    ? { from: filters.from, to: filters.to,status:filters.status }
    : { status: filters.status };
  console.log(endpoint,params);
  return (
    <div className="grid grid-rows-12 h-dvh p-4 shadow-md">
      <div className="row-span-1">
        <Top onFilter={handleDateFilter} />
      </div>
      <div className="row-span-11 p-8 h-full overflow-y-auto space-y-3">
        <OrderList endpoint={endpoint} params={params} />
      </div>
    </div>
  );
};

export default Cancelled;