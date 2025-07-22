// 'use client';

// import { useEffect, useState } from "react";
// import { fetchNewOrders, updateOrderStatus } from "@/utils/Admin/fetchNew";
// import { Order } from "@/types/admin/order";
// import OrderTable from "@/components/admin/Order/OrderTable";

// export default function NewOrders() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const getOrders = async () => {
//       try {
//         const data = await fetchNewOrders();
//         setOrders(data);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     getOrders();
//     const interval = setInterval(getOrders, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleStatusChange = async (orderId: string, newStatus: string) => {
//     try {
//       await updateOrderStatus(orderId, newStatus);
//       setOrders((prev) => prev.filter((o) => o._id !== orderId));
//     } catch (err) {
//       console.error("Error updating status:", err);
//     }
//   };

//   const filteredData = orders.filter((item) =>
//     Object.values(item).some((val) =>
//       val?.toString().toLowerCase().includes(search.toLowerCase())
//     )
//   );

//   return (
//     <div className="ml-60 mt-24 px-6 py-8 bg-gray-50 min-h-screen">
//       <h2 className="text-3xl font-bold text-[#256180] mb-6 text-center">New Orders</h2>

//       <div className="flex justify-end mb-6">
//         <input
//           type="text"
//           placeholder="Search by ID, CID, Category..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full max-w-md p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#256180] outline-none"
//         />
//       </div>

//       <OrderTable
//         data={filteredData}
//         onStatusChange={handleStatusChange}
//         headerColor="bg-[#256180]"
//         rowHoverColor="hover:bg-[#d5e9f4]"
//         selectBgColor="bg-[#acd6eb]"
//       />
//     </div>
//   );
// }
