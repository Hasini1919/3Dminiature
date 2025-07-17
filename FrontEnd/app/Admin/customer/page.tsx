'use client';

import { useEffect, useState } from 'react';
import SearchBar from '@/components/admin/Customer/SearchBar';
import CustomerTable from '@/components/admin/Customer/CustomerTable';
import { fetchCustomers } from '@/utils/Admin/fetchCustomers';
import { Customers } from '@/types/admin/customer';

export default function CustomerDet() {
  const [data, setData] = useState<Customers[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getCustomers = async () => {
      const customers = await fetchCustomers();
      setData(customers);
    };

    getCustomers();
    const interval = setInterval(getCustomers, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredData = data.filter((item) =>
    Object.values(item).some(value =>
      value?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-24 ml-48">
      <h2 className="text-3xl font-extrabold text-center text-[#c3953f] mb-10">
        Customers Details
      </h2>

      <SearchBar search={search} setSearch={setSearch} />
      <CustomerTable data={filteredData} />
    </div>
  );
}
