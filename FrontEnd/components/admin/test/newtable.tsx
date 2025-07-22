"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Order } from "@/types/admin/test/order";
import { fetchOrders, updateOrderStatus } from "@/utils/Admin/test/fetchnew";

export default function OrderTable() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlStatus = searchParams.get("status") || "All";

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState(urlStatus);

  useEffect(() => {
    setFilterStatus(urlStatus);
    const loadOrders = async () => {
      setLoading(true);
      try {
        const statusForFetch = urlStatus === "All" ? undefined : urlStatus;
        const data = await fetchOrders(statusForFetch);
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, [urlStatus]);

  const onFilterChange = (newStatus: string) => {
    setFilterStatus(newStatus);
    if (newStatus === "All") {
      router.push("/Admin/test-Order");
    } else {
      router.push(`/Admin/test-Order?status=${encodeURIComponent(newStatus)}`);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const handleViewCustomer = (userId: string) => {
    router.push(`/Admin/customer/${userId}`);
  };

  // Navigate to order details page by order id
  const handleViewOrderDetails = (orderId: string) => {
    router.push(`/Admin/order_customer/${orderId}`);
  };

  // Navigate to design page by productId
  const handleViewDesigns = (orderId: string) => {
    router.push(`/Admin/test-Order/${orderId}`)}

  if (loading) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="p-6 max-w-full" style={{ marginLeft: 280 }}>
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">Order Table</h2>

      {/* Filter */}
      <div className="mb-6 flex items-center gap-3 flex-wrap">
        <label
          htmlFor="statusFilter"
          className="font-medium text-gray-700 whitespace-nowrap"
        >
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={filterStatus}
          onChange={(e) => onFilterChange(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-800 cursor-pointer
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                     transition duration-200 ease-in-out"
        >
          <option value="All">All</option>
          <option value="Order Placed">Order Placed</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>

      <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-md">
        <table className="min-w-[900px] w-full table-auto border-collapse text-left text-gray-800">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 border-b border-gray-300 cursor-pointer">Order No</th>
              <th className="px-6 py-3 border-b border-gray-300">Product Name</th>
              <th className="px-6 py-3 border-b border-gray-300 text-center">Qty</th>
              <th className="px-6 py-3 border-b border-gray-300 text-center">Frame Design</th>
              <th className="px-6 py-3 border-b border-gray-300 text-center">Customer</th>
              <th className="px-6 py-3 border-b border-gray-300 text-center">Amount (Rs.)</th>
              <th className="px-6 py-3 border-b border-gray-300 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-500 font-medium select-none">
                  No orders with this status.
                </td>
              </tr>
            ) : (
              orders.map((order) =>
                order.items.map((item, idx) => (
                  <tr key={`${order._id}_${idx}`} className="border-t border-gray-200 hover:bg-gray-50">
                    <td
                      className="px-6 py-3 font-mono underline text-purple-600 cursor-pointer"
                      onClick={() => handleViewOrderDetails(order._id)}
                    >
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-3 font-medium">{item.name}</td>
                    <td className="px-6 py-3 text-center">{item.quantity}</td>
                    <td className="px-6 py-3 text-center">
                      <button
                        onClick={() => handleViewDesigns(order._id)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition"
                      >
                        View
                      </button>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <button
                        onClick={() => handleViewCustomer(order.userId)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition"
                      >
                        View
                      </button>
                    </td>
                    <td className="px-6 py-3 text-center font-semibold">
                      Rs. {order.amount?.toFixed(2)}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="border border-gray-300 rounded px-3 py-1 text-sm cursor-pointer
                                   hover:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-400"
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )
            )}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 font-semibold">
              <td colSpan={5} className="text-right px-6 py-3">
                Total Revenue:
              </td>
              <td className="text-center px-6 py-3 font-semibold">
                Rs. {orders.reduce((sum, o) => sum + (o.amount || 0), 0).toFixed(2)}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
