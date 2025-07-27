"use client";
import Navbar from "@/components/Admin_sidebar/Slidebar"
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Order } from "@/types/admin/test/order";
import { fetchOrders, updateOrderStatus , updateOrderPaymentStatus } from "@/utils/Admin/test/fetchnew";

export default function OrderTable() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlStatus = searchParams.get("status") || "All";

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState(urlStatus);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setFilterStatus(urlStatus);
    fetchAndSetOrders(urlStatus);
  }, [urlStatus]);


  const onFilterChange = (newStatus: string) => {
    setFilterStatus(newStatus);
    if (newStatus === "All") {
      router.push("/Admin/test-Order");
    } else {
      router.push(`/Admin/test-Order?status=${encodeURIComponent(newStatus)}`);
    }
  };

  const fetchAndSetOrders = async (status: string) => {
    setLoading(true);
    try {
      const statusForFetch = status === "All" ? undefined : status;
      const data = await fetchOrders(statusForFetch);
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      // Add user notification here
    } finally {
      setLoading(false);
    }
  };
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      await fetchAndSetOrders(filterStatus);
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const handleTogglePayment = async (orderId: string, currentStatus: boolean) => {
    try {
      const updatedPayment = !currentStatus;
      await updateOrderPaymentStatus(orderId, updatedPayment); // You need to implement this
      await fetchAndSetOrders(filterStatus); // refresh UI
    } catch (error) {
      console.error("Failed to update payment status:", error);
    }
  };

  const handleViewOrderDetails = (orderId: string) => {
    router.push(`/Admin/order-customer/${orderId}`);
  };

  // Filter orders by orderNumber search
  const filteredOrders = orders
  .filter(order => 
    filterStatus === "All" ? true : order.status === filterStatus
  )
  .filter(order => 
    order.orderNumber.toLowerCase().includes(search.toLowerCase())
  );

  // Utility: get total quantity per order
  // Assuming order.items is an array of { quantity: number }
  // If your data is different, adjust accordingly.
  const getTotalQuantity = (order: Order) => {
    if (order.items && Array.isArray(order.items)) {
      return order.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    }
    // fallback if quantity is direct on order object
    return order.amount?.toFixed(2)
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Order Placed":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Processing":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "Canceled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 ml-0 sm:ml-64 md:ml-72">
        
        <div className="flex items-center justify-center pt-20">
        
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 ml-0 sm:ml-64 md:ml-72">
      <div className="p-3 sm:p-6 lg:p-8 max-w-full">
      <Navbar/>
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6 mt-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ">
            <div className="text-center sm:text-left ">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                Order Management
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Monitor and manage all customer orders
              </p>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-xl sm:text-2xl font-bold text-indigo-600">
                {filteredOrders.length}
              </p>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <label
                  htmlFor="statusFilter"
                  className="font-semibold text-gray-700 text-sm sm:text-base whitespace-nowrap"
                >
                  Filter Status:
                </label>
                <select
                  id="statusFilter"
                  value={filterStatus}
                  onChange={(e) => onFilterChange(e.target.value)}
                  className="border-2 border-gray-200 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-gray-700 bg-white
                           hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                           focus:border-indigo-500 transition-colors duration-200 cursor-pointer w-full sm:min-w-[140px]"
                >
                  <option value="All">All Orders</option>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </div>
            </div>

            <div className="relative w-full lg:w-auto">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by order number..."
                className="border-2 border-gray-200 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 pl-10 w-full lg:w-80 
                         hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                         focus:border-indigo-500 transition-colors duration-200 text-sm sm:text-base"
              />
              <svg
                className="absolute left-3 top-2.5 sm:top-3 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-[1000px] w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Order Number
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date &amp; Time
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12">
                      <div className="text-gray-400">
                        <svg
                          className="mx-auto h-12 w-12 mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <p className="text-lg font-medium text-gray-600 mb-1">No orders found</p>
                        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewOrderDetails(order._id)}
                          className="text-left font-mono text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-200"
                        >
                          {order.orderNumber}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleTogglePayment(order._id, order.payment)}
                          className={`text-sm font-semibold px-3 py-1 rounded-full transition-colors duration-200 ${order.payment ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}
                        >
                          {order.payment ? "Paid" : "Not Paid"}
                        </button>
                      </td>

                      <td className="px-6 py-4 text-center font-semibold text-gray-900">
                        {getTotalQuantity(order)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="text-lg font-bold text-gray-900">
                          Rs. {order.amount?.toFixed(2)}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="text-sm">
                          <div className="font-semibold text-gray-900">
                            {new Date(order.date).toLocaleDateString()}
                          </div>
                          <div className="text-gray-500">
                            {new Date(order.date).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          className={`border-2 rounded-lg px-3 py-2 text-sm font-semibold cursor-pointer
                            hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 
                            transition-all duration-200 ${getStatusBadgeColor(order.status)}`}
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Processing">Processing</option>
                          <option value="Completed">Completed</option>
                          <option value="Canceled">Canceled</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Card Layout */}
          <div className="block lg:hidden">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400">
                  <svg
                    className="mx-auto h-12 w-12 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-lg font-medium text-gray-600 mb-1">No orders found</p>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <div
                    key={order._id}
                    className="p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-150 rounded-lg mb-2"
                  >
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleViewOrderDetails(order._id)}
                        className="text-left font-mono text-base font-semibold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-200"
                      >
                        {order.orderNumber}
                      </button>

                      <div className="flex items-center justify-between text-sm sm:text-base text-gray-700">
                        <span
                          className={`font-semibold px-3 py-1 rounded-full ${order.payment ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}
                        >
                          {order.payment ? "Paid" : "Not Paid"}
                        </span>
                        <p className="font-semibold">Qty: {getTotalQuantity(order)}</p>
                        <p className="font-bold">Rs. {order.amount?.toFixed(2)}</p>
                      </div>

                      <div className="text-xs sm:text-sm text-gray-500">
                        <div className="font-medium text-gray-700">
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                        <div>
                          {new Date(order.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>

                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`border-2 rounded-lg px-3 py-2 text-sm font-semibold cursor-pointer
                          hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 
                          transition-all duration-200 w-full ${getStatusBadgeColor(order.status)}`}
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with Revenue Summary */}
          {filteredOrders.length > 0 && (
            <div className="bg-gray-50 border-t border-gray-200 px-4 sm:px-6 py-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
                <div className="text-sm text-gray-600 text-center sm:text-left">
                  Showing {filteredOrders.length} order
                  {filteredOrders.length !== 1 ? "s" : ""}
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    Total Revenue (Completed Orders)
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-green-600">
                    Rs.{" "}
                    {filteredOrders
                      .filter((o) => o.status === "Completed")
                      .reduce((sum, o) => sum + (o.amount || 0), 0)
                      .toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
