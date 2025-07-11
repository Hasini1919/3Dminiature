'use client';

import { useState, useEffect } from 'react';

interface Customers {
  name: string;
  cid: string;
  address: string;
  phoneno: string;


}

export default function CustomerDet() {
  const [data, setData] = useState<Customers[]>([]);
  const [search, setSearch] = useState("");


  const fetchCustomers = async () => {
    try {
      const res = await fetch("http://localhost:1000/api/customer");
      const datas = await res.json();
      setData(datas);
    } catch (error) {
      console.error("error fetching customers: ", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
    const interval = setInterval(fetchCustomers, 10000);
    return () => clearInterval(interval);

  }, []);


  // Filter data based on search input (search by ID, CID, Customization, Category)
  const filteredData = data.filter((item) =>
    Object.values(item).some(value =>
      value?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="overflow-x-auto p-4 m-4 mt-24 ml-60 ">
      <h2 className="w-full text-center text-2xl font-bold ml-6 text-[#c3953f]">
        Customers Details
      </h2>

      {/* Search Bar */}
      <div className="mb-4 text-right">
        <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-80 max-w-md p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300" />
      </div>

      <table className="w-full max-w-4xl mx-auto border border-green-900 shadow-md rounded-lg mt-3 bg-white">
        <thead>
          <tr className="bg-[#c3953f] text-white">
            <th className="p-2 border w-3/12">CID</th>
            <th className="p-2 border w-3/12">Name</th>
            <th className="p-2 border w-3/12">Address</th>
            <th className="p-2 border w-3/12">Phone Number</th>
            <th className="p-2 border w-3/12">Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length > 0 ? (filteredData.map((item) => (
            <tr key={item.cid} className="text-center hover:bg-[#f2f2d0]">
              <td className="p-2 border">{item.cid}</td>
              <td className="p-2 border">{item.name}</td>
              <td className="p-2 border">{item.address}</td>
              <td className="p-2 border">{item.phoneno}</td>
              <td className="p-2 border">
                <select className="rounded bg-[#f5f5b4] px-4 py-1" defaultValue="new">
                  <option value="new">New</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Delivered</option>
                </select>
              </td>
            </tr>))) : (
            <tr>
              <td colSpan={10} className="text-center p-4 text-gray-500">
                No results found
              </td>
            </tr>)}
        </tbody>
      </table>
    </div>
  );
};

