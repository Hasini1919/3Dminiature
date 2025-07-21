// 'use client';

// import { useEffect, useState } from 'react';
// import { Order } from "@/types/admin/order";
// import { fetchPendingOrders, updateOrderStatus } from '@/utils/Admin/fetchPending';
// import OrderTable from "@/components/admin/Order/OrderTable";

// export default function PendingOrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [search, setSearch] = useState("");

//   const loadOrders = async () => {
//     try {
//       const data = await fetchPendingOrders();
//       setOrders(data);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };

//   const handleStatusChange = async (orderId: string, newStatus: string) => {
//     try {
//       await updateOrderStatus(orderId, newStatus);
//       setOrders(prev => prev.filter(order => order._id !== orderId));
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   useEffect(() => {
//     loadOrders();
//     const interval = setInterval(loadOrders, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   const filteredOrders = orders.filter(order =>
//     Object.values(order).some(value =>
//       value?.toString().toLowerCase().includes(search.toLowerCase())
//     )
//   );

//   return (
//     <div className="ml-60 mt-24 px-6 py-8 bg-gray-50 min-h-screen">
//       <h2 className="text-3xl font-bold text-[#a82f45] mb-6 text-center">Pending Orders</h2>

//       <div className="flex justify-end mb-6">
//         <input
//           type="text"
//           placeholder="Search by ID, CID, Category..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full max-w-md p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#a82f45] outline-none"
//         />
//       </div>

//       <OrderTable
//         data={filteredOrders}
//         onStatusChange={handleStatusChange}
//         headerColor="bg-[#a82f45]"
//         rowHoverColor="hover:bg-red-100"
//         selectBgColor="bg-red-300"
//       />
//     </div>
//   );
// }
