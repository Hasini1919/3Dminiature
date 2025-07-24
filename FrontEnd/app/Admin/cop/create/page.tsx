/////////// i use here

"use client";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    setMessage("");

    const result = await createCoupon(form);

    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage("✅ Coupon created successfully!");
      resetForm();

      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage("");
        router.back(); // replace with your target route
      }, 3000);
    }


    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="flex justify-start">

      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <button
            onClick={() => router.back()} // OR router.push("/Admin/Product/Add")
            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>


        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-semibold text-gray-900">Create New Coupon</h1>
                <p className="text-sm text-gray-600 mt-1">Set up promotional discount codes for your customers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {message && (
          <div className={`mb-6 rounded-lg p-4 ${message.includes('error') || message.includes('Error')
            ? 'bg-red-50 border border-red-200'
            : 'bg-green-50 border border-green-200'
            }`}>
            <div className={`text-sm ${message.includes('error') || message.includes('Error')
              ? 'text-red-800'
              : 'text-green-800'
              }`}>
              {message}
            </div>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Coupon Details</h2>
            {/* <p className="text-sm text-gray-600 mt-1">Configure the coupon settings and restrictions</p> */}
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              {/* Basic Information Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    placeholder="Enter unique coupon code (e.g., SAVE10)"
                    value={form.code}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  />
                  {/* <p className="text-xs text-gray-500 mt-1">Use uppercase letters and numbers for best results</p> */}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Type
                  </label>
                  <select
                    name="discountType"
                    value={form.discountType}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="percentage">Percentage Discount</option>
                    <option value="fixed">Fixed Amount Discount</option>
                  </select>
                </div>
              </div>

              {/* Discount Value */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Value
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="discountValue"
                      placeholder={form.discountType === 'percentage' ? '0' : '100'}
                      value={form.discountValue}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-12"
                      required
                      min="0"
                      step={form.discountType === 'percentage' ? '1' : '0.01'}
                      max={form.discountType === 'percentage' ? '100' : undefined}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-sm">
                        {form.discountType === 'percentage' ? '%' : 'Rs.'}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {form.discountType === 'percentage'
                      ? 'Enter percentage value (1-100)'
                      : 'Enter fixed discount amount in rupees'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Purchase Amount
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="minPurchaseAmount"
                      placeholder="0"
                      value={form.minPurchaseAmount}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                      min="0"
                      step="0.01"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-sm">Rs</span>
                    </div>
                  </div>
                  {/* <p className="text-xs text-gray-500 mt-1">Minimum cart value required to use this coupon</p> */}
                </div>
              </div>

              {/* Validity Period */}
              <div>
                {/* <h2 className="text-sm font-medium text-gray-900 mb-3">Validity Period</h2> */}
                <br />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valid From
                    </label>
                    <input
                      type="date"
                      name="validFrom"
                      value={form.validFrom}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valid To
                    </label>
                    <input
                      type="date"
                      name="validTo"
                      value={form.validTo}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Usage Limits */}
              <div>
                <br />
                {/* <h3 className="text-sm font-medium text-gray-900 mb-3">Usage Settings</h3> */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Uses
                    </label>
                    <input
                      type="number"
                      name="maxUses"
                      placeholder="Leave empty for unlimited uses"
                      value={form.maxUses ?? ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      min="1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Total number of times this coupon can be used</p>
                  </div>

                  <div className="flex items-center space-x-3 pt-8">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="active"
                        checked={form.active}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-700">
                        Active Status
                      </label>
                    </div>
                    <div className="text-xs text-gray-500">
                      {form.active ? '✅ Coupon will be active' : '❌ Coupon will be inactive'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2.5 px-6 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Coupon...
                    </span>
                  ) : (
                    'Create Coupon'
                  )}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
                >
                  Reset Form
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}