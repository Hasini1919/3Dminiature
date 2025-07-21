"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentShippingSettings() {
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [shippingProvider, setShippingProvider] = useState("dhl");
  const [shippingRate, setShippingRate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Optional: Send to backend
    alert("Settings saved!");
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">Payment & Shipping</h1>
        <button
          onClick={() => router.back()}
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Payment Method */}
        <div>
          <h2 className="text-lg font-semibold text-indigo-600 mb-2">Payment Method</h2>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cash_on_delivery"
                checked={paymentMethod === "cash_on_delivery"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Cash on Delivery</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="credit_card"
                checked={paymentMethod === "credit_card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Credit/Debit Card</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>PayPal</span>
            </label>
          </div>
        </div>

        {/* Shipping Provider */}
        <div>
          <h2 className="text-lg font-semibold text-indigo-600 mb-2">Shipping Provider</h2>
          <select
            value={shippingProvider}
            onChange={(e) => setShippingProvider(e.target.value)}
            className="w-full border border-indigo-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="dhl">DHL</option>
            <option value="fedex">FedEx</option>
            <option value="ups">UPS</option>
            <option value="local">Local Courier</option>
          </select>
        </div>

        {/* Shipping Rate */}
        <div>
          <label className="block font-medium text-indigo-800 mb-2">Shipping Rate ($)</label>
          <input
            type="number"
            value={shippingRate}
            onChange={(e) => setShippingRate(e.target.value)}
            className="w-full border border-indigo-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter shipping rate"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
