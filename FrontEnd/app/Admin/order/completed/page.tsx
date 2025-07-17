'use client';

import { useState, useEffect } from 'react';
import { Order } from '@/types/admin/order';
import { fetchCompletedOrders, updateOrderStatus } from '@/utils/Admin/fetchCompleted';
import OrderTable from '@/components/admin/Order/OrderTable';

export default function ComOrder() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");

  const loadOrders = async () => {
    try {
      const data = await fetchCompletedOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    loadOrders();
    const interval = setInterval(loadOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.filter(order => order.id !== orderId));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredData = orders.filter((item) =>
    Object.values(item).some(value =>
      value?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="ml-60 px-6 py-6 mt-24 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold text-emerald-700 mb-6 text-center">Completed Orders</h2>

      <div className="mb-6 flex justify-end">
        <input
          type="text"
          placeholder="Search by ID, CID, Category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none"
        />
      </div>

      <OrderTable
        data={filteredData}
        onStatusChange={handleStatusChange}
        headerColor="bg-emerald-700"
        rowHoverColor="hover:bg-emerald-50"
        selectBgColor="bg-emerald-300"
      />
    </div>
  );
}
