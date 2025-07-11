'use client';

import { useState, useEffect } from 'react';

interface Order {
  id: string;
  name: string;
  cid: string;
  category: string;
  frameColor: string;
  theme: string;
  size: string;
  customization?: string;
  price: number;
  status: string;


}

export default function ComOrder() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");


  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5500/api/updates/Completed")
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []
  );



  //change pending to other status
  const handleStatusChange = async (orderId: string, completedStatus: string) => {
    try {
      const res = await fetch(`http://localhost:5500/api/updates/${orderId}/final`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: completedStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");

      //remove in filter when new to pending
      setOrders((prevOrders) => prevOrders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };


  // Filter data based on search input (search by ID, CID, Customization, Category)
  const filteredData = orders.filter((item) =>
    Object.values(item).some(value =>
      value?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="overflow-x-auto p-4 m-4 mt-24 ml-60">
      <h2 className="w-full text-center text-2xl font-bold ml-6 text-emerald-600">Completed Orders</h2>

      {/* Search Bar */}
      <div className="mb-4 text-right">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80 max-w-md p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300"
        />


      </div>

      <table className="w-full max-w-4xl mx-auto border border-green-900 shadow-md rounded-lg mt-3 bg-white">
        <thead>
          <tr className="bg-emerald-700 text-white">
            <th className="p-2 border w-2/12">PID</th>
            <th className="p-2 border w-2/12">Name</th>
            <th className="p-2 border w-2/12">CID</th>
            <th className="p-2 border w-2/12">Category</th>
            <th className="p-2 border w-2/12">Frame Color</th>
            <th className="p-2 border w-2/12">Theme Color</th>
            <th className="p-2 border w-2/12">Frame Size</th>
            <th className="p-2 border w-2/12">Customization</th>
            <th className="p-2 border w-2/12">Price</th>
            <th className="p-2 border w-2/12">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <tr key={item.id} className="text-center hover:bg-green-100">
                <td className="p-2 border">{item.id}</td>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.cid}</td>
                <td className="p-2 border">{item.category}</td>
                <td className="p-2 border">{item.frameColor}</td>
                <td className="p-2 border">{item.theme}</td>
                <td className="p-2 border">{item.size}</td>
                <td className="p-2 border">{item.customization}</td>
                <td className="p-2 border">{item.price}</td>
                <td className="p-2 border">
                  <select className="rounded bg-green-300 px-4 py-1" value={item.status} onChange={(e) => handleStatusChange(item.id, e.target.value)}>
                    <option value="completed">Completed</option>
                    <option value="new">New</option>
                    <option value="pending">Pending</option>

                  </select>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} className="text-center p-4 text-gray-500">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};


