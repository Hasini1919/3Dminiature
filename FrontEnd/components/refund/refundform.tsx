"use client";

import React, { useState } from "react";
import axios from "axios";

const RefundForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    requestDate: "",
    productName: "",
    orderNum: "",
    refundReason: "",
    invoice: "",
    readPolicy: "",
    eligible: "",
    requestedAmount: "",
    notes: "",
    agreed: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;
    const name = target.name;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setFormData({
        ...formData,
        [name]: target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) return alert("You must agree to the terms.");

    try {
      await axios.post("http://localhost:5500/api/refund", formData);
      alert("✅ Submitted successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        requestDate: "",
        productName: "",
        orderNum: "",
        refundReason: "",
        invoice: "",
        readPolicy: "",
        eligible: "",
        requestedAmount: "",
        notes: "",
        agreed: false,
      });
    } catch (err) {
      console.error("Failed to submit form:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white shadow-xl p-10 rounded-2xl border">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Refund Request Form
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First Name */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label htmlFor="firstName" className="font-semibold text-left">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm"
          />
        </div>

        {/* Last Name */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label htmlFor="lastName" className="font-semibold text-left">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm"
          />
        </div>

        {/* Email */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label htmlFor="email" className="font-semibold text-left">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm"
          />
        </div>

        {/* Request Date */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label htmlFor="requestDate" className="font-semibold text-left">
            Request Date
          </label>
          <input
            type="date"
            id="requestDate"
            name="requestDate"
            required
            value={formData.requestDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm"
          />
        </div>

        {/* Refund Reason Dropdown */}
<div className="grid grid-cols-2 gap-4 items-start">
  <label htmlFor="refundReason" className="font-semibold text-left pt-2">
    Reason for Refund
  </label>
  <select
    id="refundReason"
    name="refundReason"
    value={formData.refundReason}
    onChange={(e) =>
      setFormData({ ...formData, refundReason: e.target.value })
    }
    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  >
    <option value="" disabled>
      Select a reason
    </option>
    <option value="Wrong item received">Wrong item received</option>
    <option value="Item arrived damaged">Item arrived damaged</option>
    <option value="Product not as described">Product not as described</option>
    <option value="Changed my mind">Changed my mind</option>
    <option value="Size/fit issue">Size/fit issue</option>
    <option value="Order arrived late">Order arrived late</option>
    <option value="Other">Other</option>
  </select>
</div>


        {/* Product Name */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label htmlFor="productName" className="font-semibold text-left">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            required
            value={formData.productName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm"
          />
        </div>

        {/* order ID */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label htmlFor="orderNum" className="font-semibold text-left">
            Order No
          </label>
          <input
            type="text"
            id="orderNum"
            name="orderNum"
            required
            value={formData.orderNum}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm"
          />
        </div>

        <div className="mb-6">
        <label className="block font-semibold text-lg mb-4 text-left">
          Please answer the following:
        </label>

        <div className="grid grid-cols-[1fr_80px_80px] gap-4 text-sm font-medium mb-2 items-center">
          <div></div>
          <div className="bg-blue-50 px-4 py-2 rounded-md text-center font-semibold">Yes</div>
          <div className="bg-blue-50 px-4 py-2 rounded-md text-center font-semibold">No</div>
        </div>

        {[
          { name: "invoice", text: "Do you have the invoice?" },
          { name: "readPolicy", text: "Have you read the refund policy?" },
          { name: "eligible", text: "Based on the refund policy,are you eligible for a refund?" },
        ].map((q) => (
          <div
            key={q.name}
            className="grid grid-cols-[1fr_80px_80px] gap-4 items-center mb-2"
          >
            <div className="bg-blue-50 text-left px-4 py-2 rounded-md font-semibold ">
                       {q.text}
                   </div>

            <div className="text-center">
              <input
                type="radio"
                name={q.name}
                value="yes"
                checked={formData[q.name as keyof typeof formData] === "yes"}
                onChange={handleChange}
                required
              />
            </div>

            <div className="text-center">
              <input
                type="radio"
                name={q.name}
                value="no"
                checked={formData[q.name as keyof typeof formData] === "no"}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        ))}
      </div>

        {/* Requested Amount */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label
            htmlFor="requestedAmount"
            className="font-semibold text-left"
          >
            Requested Amount
          </label>
          <input
            type="number"
            id="requestedAmount"
            name="requestedAmount"
            value={formData.requestedAmount}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm"
          />
        </div>

        {/* Notes */}
        <div className="grid grid-cols-2 gap-4 items-start">
          <label htmlFor="notes" className="font-semibold text-left pt-2">
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm"
          ></textarea>
        </div>

       {/* Checkbox Agreement */}
<div className="flex items-start mt-6 mb-4">
  <input
    type="checkbox"
    name="agreed"
    checked={formData.agreed}
    onChange={handleChange}
    required
    className="mt-1 mr-2"
  />
  <label className="text-sm font-medium text-left">
    I agree the refunded money will be sent back to the account I previously paid with.
  </label>
</div>


        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default RefundForm;
