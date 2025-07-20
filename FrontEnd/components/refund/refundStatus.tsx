"use client";

import React, { useState } from "react";
import axios from "axios";

interface RefundRequest {
  _id: string;
  productName: string;
  productId: string;
  requestDate: string;
  status: "Pending" | "Approved" | "Rejected";
  requestedAmount: number;
  notes?: string;
}

const RefundStatusCheck: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [requests, setRequests] = useState<RefundRequest[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const checkStatus = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/return-refund", {
        params: { email },
      });
      setRequests(res.data.requests || []);
    } catch (err) {
      alert("Failed to fetch refund requests.");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Check Refund Status</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-grow border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={checkStatus}
          disabled={!email || loading}
          className="bg-blue-600 text-white px-4 rounded disabled:bg-gray-400"
        >
          {loading ? "Checking..." : "Check Status"}
        </button>
      </div>

      {requests && requests.length === 0 && (
        <p>No refund requests found for this email.</p>
      )}

      {requests && requests.length > 0 && (
        <ul className="space-y-4">
          {requests.map((r: RefundRequest) => (
            <li key={r._id} className="border p-4 rounded shadow-sm">
              <p>
                <strong>Product:</strong> {r.productName} (ID: {r.productId})
              </p>
              <p>
                <strong>Request Date:</strong>{" "}
                {new Date(r.requestDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong>
                <span
                  className={`font-semibold ml-2 ${
                    r.status === "Approved"
                      ? "text-green-600"
                      : r.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {r.status}
                </span>
              </p>
              <p>
                <strong>Requested Amount:</strong> ${r.requestedAmount}
              </p>
              {r.notes && (
                <p>
                  <strong>Notes:</strong> {r.notes}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RefundStatusCheck;
