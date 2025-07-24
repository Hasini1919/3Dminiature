"use client";

import React from "react";
import Sidebar from "@/components/customer-account/Sidebar";
import Orders from "@/components/customer-account/orders";

const OrdersPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Sidebar Section */}
      <div className="w-64 border-r border-gray-200 dark:border-gray-700 min-h-screen bg-white dark:bg-gray-800">
        <Sidebar />
      </div>

      {/* Orders Section */}
      <div className="flex-1 p-6 overflow-auto">
        <Orders />
      </div>
    </div>
  );
};

export default OrdersPage;