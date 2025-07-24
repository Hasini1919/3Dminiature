"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RefundsPage() {
  const [refunds, setRefunds] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRefunds = async () => {
      const res = await fetch("http://localhost:5500/api/refund");
      const data = await res.json();
      setRefunds(data);
    };
    fetchRefunds();
  }, []);

  const handleNavigate = (orderId: string) => {
    router.push(`/Admin/orders/${orderId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Refund Requests</h1>
      <div className="overflow-x-auto bg-white shadow rounded-xl p-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Order #</th>
              <th className="py-2 px-4">Reason</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {refunds.map((refund: any) => (
              <tr key={refund._id} className="border-b hover:bg-slate-50">
                <td className="py-2 px-4">{refund.firstName} {refund.lastName}</td>
                <td className="py-2 px-4">{refund.email}</td>
                <td className="py-2 px-4">{refund.orderNum}</td>
                <td className="py-2 px-4">{refund.refundReason}</td>
                <td className="py-2 px-4">Rs. {refund.requestedAmount}</td>
                <td className="py-2 px-4 font-medium">{refund.status}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => handleNavigate(refund.orderId)}
                    className="text-blue-600 hover:underline"
                  >
                    View Order
                  </button>
                  <button className="text-green-600 hover:underline">Accept</button>
                  <button className="text-red-600 hover:underline">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
