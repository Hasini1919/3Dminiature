"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Order } from "@/types/admin/order";
import { fetchAllOrders } from "@/utils/Admin/test/fetchcustomer";
import Navbar from "@/components/Admin_sidebar/Slidebar";

type GroupedCustomer = {
  userId: string;
  fullName: string;
  phone: string;
  address: string;
  email: string;
  totalOrders: number;
  placedCount: number;
  processedCount: number;
  completedCount: number;
  canceledCount: number;
};

export default function CustomerTablePage() {
  const router = useRouter();
  const [groupedCustomers, setGroupedCustomers] = useState<GroupedCustomer[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const orders: Order[] = await fetchAllOrders();
        const groupedMap: Record<string, GroupedCustomer> = {};

        orders.forEach((order) => {
          const userId = order.userId;
          const status = order.status?.toLowerCase();

          if (!groupedMap[userId]) {
            groupedMap[userId] = {
              userId,
              fullName: `${order.address.FirstName} ${order.address.LastName}`,
              phone: order.address.PhoneNumber,
              address: `${order.address.City}, ${order.address.District}, ${order.address.Provience}`,
              email: order.address.Email || "-",
              totalOrders: 1,
              placedCount: status === "order placed" ? 1 : 0,
              processedCount: status === "processing" ? 1 : 0,
              completedCount: status === "completed" ? 1 : 0,
              canceledCount: status === "canceled" ? 1 : 0,
            };
          } else {
            groupedMap[userId].totalOrders += 1;
            if (status === "order placed") groupedMap[userId].placedCount += 1;
            if (status === "processing") groupedMap[userId].processedCount += 1;
            if (status === "completed") groupedMap[userId].completedCount += 1;
            if (status === "canceled") groupedMap[userId].canceledCount += 1;
          }
        });

        setGroupedCustomers(Object.values(groupedMap));
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    loadOrders();
  }, []);

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-amber-200 text-amber-900 px-1 rounded font-medium">{part}</span>
      ) : (
        part
      )
    );
  };

  const filtered = groupedCustomers.filter(
    (c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />
      <div className="pl-72 p-8 py-20 w-full">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-slate-800 mb-2">Customer Management</h1>
                <p className="text-slate-600 text-lg">Track and manage customer orders and activities</p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg">
                {filtered.length} Customers
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search customers by name or phone number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-slate-50 hover:bg-white"
              />
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-200 bg-slate-50">
              <h3 className="text-2xl font-bold text-slate-800">Customer Details</h3>
              <p className="text-slate-600 mt-1">Detailed view of all customer information and order statistics</p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-r border-slate-200">Customer Info</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-r border-slate-200">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-r border-slate-200">Location</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider border-r border-slate-200">Total Orders</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider border-r border-slate-200">Placed</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider border-r border-slate-200">Processing</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-emerald-700 uppercase tracking-wider border-r border-slate-200">Completed</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-red-700 uppercase tracking-wider">Canceled</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {filtered.map((cust, index) => (
                    <tr
                      key={cust.userId}
                      onClick={() => router.push(`/Admin/customer/${cust.userId}`)}
                      className={`cursor-pointer hover:bg-blue-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-25'}`}
                    >
                      <td className="px-6 py-5 border-r border-slate-100">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                              {cust.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-lg font-semibold text-slate-900">
                              {highlightMatch(cust.fullName, search)}
                            </div>
                            <div className="text-sm text-slate-500">ID: {cust.userId.slice(0, 8)}...</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 border-r border-slate-100">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-slate-900">
                            {highlightMatch(cust.phone, search)}
                          </div>
                          <div className="text-sm text-slate-500">{cust.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-5 border-r border-slate-100">
                        <div className="text-sm text-slate-900 max-w-xs truncate" title={cust.address}>
                          {cust.address}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center border-r border-slate-100">{cust.totalOrders}</td>
                      <td className="px-6 py-5 text-center border-r border-slate-100">{cust.placedCount}</td>
                      <td className="px-6 py-5 text-center border-r border-slate-100">{cust.processedCount}</td>
                      <td className="px-6 py-5 text-center border-r border-slate-100">{cust.completedCount}</td>
                      <td className="px-6 py-5 text-center">{cust.canceledCount}</td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-center py-10 text-slate-600">
                        No customers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
