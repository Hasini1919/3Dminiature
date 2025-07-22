import { Order } from "@/types/admin/test/order"; // Adjust path if needed
import { getOrdersByUserId } from "@/utils/Admin/test/fetchcustomer"; // Your fetch util
import React from "react";

type CustomerPageProps = {
  params: {
    id: string;
  };
};

export default async function CustomerPage({ params }: CustomerPageProps) {
  const userId = params.id;

  const orders: Order[] = await getOrdersByUserId(userId);

  if (!orders || orders.length === 0) {
    return (
      <div className="pl-72 pt-6">
        <h2 className="text-lg font-semibold text-gray-700">No customer data found.</h2>
      </div>
    );
  }

  const { address } = orders[0];

  return (
    <div className="pl-72 pt-6 pr-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Customer Details</h2>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl border border-gray-200 space-y-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Full Name</p>
          <p className="text-base font-medium text-gray-900">
            {address.FirstName} {address.LastName}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Phone Number</p>
          <p className="text-base font-medium text-gray-900">{address.PhoneNumber || "-"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">House No.</p>
          <p className="text-base font-medium text-gray-900">{address.HouseNo || "-"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Area</p>
          <p className="text-base font-medium text-gray-900">{address.Area || "-"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">City</p>
          <p className="text-base font-medium text-gray-900">{address.City || "-"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">District</p>
          <p className="text-base font-medium text-gray-900">{address.District || "-"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Province</p>
          <p className="text-base font-medium text-gray-900">{address.Provience || "-"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Additional Info</p>
          <p className="text-base font-medium text-gray-900">{address.AnyInformation || "-"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Total Amount Paid</p>
          <p className="text-base font-medium text-gray-900">
            ₹{" "}
            {orders.reduce((sum: number, order: Order) => sum + order.amount, 0).toFixed(2)}
          </p>
        </div>

      </div>
    </div>
  );
}
