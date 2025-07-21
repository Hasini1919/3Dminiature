"use client";

import { useEffect, useState } from "react";
import { Order } from "@/types/admin/order"; // Adjust the path if needed
import { fetchAllOrders } from "@/utils/Admin/test/fetchcustomer"; // Adjust the path if needed

export default function CustomerTablePage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchAllOrders();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    loadOrders();
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.address.FirstName.toLowerCase().includes(search.toLowerCase()) ||
    order.address.LastName.toLowerCase().includes(search.toLowerCase()) ||
    order.address.PhoneNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pl-64 p-6 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Customer Details</h2>

        <input
          type="text"
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-indigo-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 border">Order No</th>
                <th className="px-4 py-3 border">Full Name</th>
                <th className="px-4 py-3 border">Phone</th>
                <th className="px-4 py-3 border">Address</th>
                <th className="px-4 py-3 border">Payment Method</th>
                <th className="px-4 py-3 border">Payment</th>
                <th className="px-4 py-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{order.orderNumber}</td>
                  <td className="px-4 py-2 border">
                    {order.address.FirstName} {order.address.LastName}
                  </td>
                  <td className="px-4 py-2 border">{order.address.PhoneNumber}</td>
                  <td className="px-4 py-2 border">
                    {order.address.HouseNo}, {order.address.Area},{" "}
                    {order.address.City}, {order.address.District},{" "}
                    {order.address.Provience}
                    <br />
                    <span className="text-xs text-gray-500">
                      {order.address.AnyInformation}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">{order.paymentMethod}</td>
                  <td className="px-4 py-2 border">
                    {order.payment ? "Paid" : "Unpaid"}
                  </td>
                  <td className="px-4 py-2 border capitalize">{order.status}</td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    No matching customer data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
