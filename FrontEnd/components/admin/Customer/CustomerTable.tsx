import { Customers } from "@/types/admin/customer";

interface Props {
  data: Customers[];
}

export default function CustomerTable({ data }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-md shadow-md">
        <thead className="bg-[#f4f4f4] text-gray-700 font-semibold">
          <tr>
            <th className="py-3 px-4 text-left">Customer ID</th>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Address</th>
            <th className="py-3 px-4 text-left">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {data.map((customer, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              <td className="py-3 px-4">{customer.cid}</td>
              <td className="py-3 px-4">{customer.name}</td>
              <td className="py-3 px-4">{customer.address}</td>
              <td className="py-3 px-4">{customer.phoneno}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
