"use client";

import { useState } from "react";
import { createCoupon } from "@/utils/Admin/test/createCoup";

export default function AddCouponPage() {
  const [form, setForm] = useState({
    code: "",
    discountType: "percentage",
    discountValue: 0,
    validFrom: "",
    validTo: "",
    minPurchaseAmount: 0,
    maxUses: null,
    active: true,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let val: string | number | boolean | null = value;

    if (type === "number") val = parseFloat(value);
    if (name === "maxUses" && val === "") val = null;
    if (type === "checkbox") val = (e.target as HTMLInputElement).checked;

    setForm({ ...form, [name]: val });
  };

  const resetForm = () => {
    setForm({
      code: "",
      discountType: "percentage",
      discountValue: 0,
      validFrom: "",
      validTo: "",
      minPurchaseAmount: 0,
      maxUses: null,
      active: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createCoupon(form);

    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage("✅ Coupon created successfully!");
      resetForm();

      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">🎁 Add New Coupon</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Coupon Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
            <input
              type="text"
              name="code"
              placeholder="E.g. SAVE10"
              value={form.code}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Discount Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
            <select
              name="discountType"
              value={form.discountType}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>

          {/* Discount Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value</label>
            <input
              type="number"
              name="discountValue"
              placeholder="E.g. 15 (for 15%) or 100"
              value={form.discountValue}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Valid From</label>
              <input
                type="date"
                name="validFrom"
                value={form.validFrom}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Valid To</label>
              <input
                type="date"
                name="validTo"
                value={form.validTo}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Min Purchase */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Purchase Amount (₹)</label>
            <input
              type="number"
              name="minPurchaseAmount"
              value={form.minPurchaseAmount}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Max Uses */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Uses (optional)</label>
            <input
              type="number"
              name="maxUses"
              value={form.maxUses ?? ""}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Active Toggle */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="text-sm font-medium text-gray-700">Active</label>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition"
            >
              Save Coupon
            </button>
          </div>

          {/* Feedback Message */}
          {message && (
            <div className="text-sm text-green-600 font-medium mt-2">{message}</div>
          )}
        </form>
      </div>
    </div>
  );
}
