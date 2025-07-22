"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const RefundStatusPanel = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const email = localStorage.getItem("userEmail") || "";
        const orderNum = localStorage.getItem("orderNumber") || "";

        if (!email || !orderNum) {
          setError("Missing email or order number.");
          setLoading(false);
          return;
        }

        const res = await axios.post("/api/refund-status", {
          email,
          orderNum,
        });

        if (res.data?.status) {
          setStatus(res.data.status);
        } else {
          setError("No refund request found.");
        }
      } catch (err) {
        setError("Server error.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const renderMessagePanel = () => {
    switch (status) {
      case "Approved":
        return (
          <div className="bg-green-100 text-green-700 p-4 mt-4 rounded shadow text-center">
            Your refund request has been <strong>Approved</strong>.
          </div>
        );
      case "Pending":
        return (
          <div className="bg-yellow-100 text-yellow-800 p-4 mt-4 rounded shadow text-center">
            Your refund request is <strong>Pending</strong>.
          </div>
        );
      case "Rejected":
        return (
          <div className="bg-red-100 text-red-700 p-4 mt-4 rounded shadow text-center">
            Your refund request has been <strong>Rejected</strong>.
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-lg rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-center">Your Refund Status</h2>

      {loading && <p className="text-center">Checking status...</p>}
      {error && <div className="text-center text-red-600">{error}</div>}
      {!loading && !error && status && renderMessagePanel()}
    </div>
  );
};

export default RefundStatusPanel;
