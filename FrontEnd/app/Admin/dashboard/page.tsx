"use client";

import { useEffect, useState } from "react";
import { fetchDashboardStats } from "@/utils/Admin/dashboard";
import DashboardCard from "@/components/admin/DashboardCard";
import { FiDollarSign, FiBox, FiBarChart, FiPackage, FiBookmark } from "react-icons/fi";
import { AiFillCheckCircle } from "react-icons/ai";
import { DashboardStats } from "@/types/admin/dashboard";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    revenue: null,
    newOrderCount: 0,
    pendingOrderCount: 0,
    completedOrderCount: 0,
    customerCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };
    fetchData();
  }, []);

  const totalOrders =
    stats.newOrderCount + stats.pendingOrderCount + stats.completedOrderCount;

  return (
    <div className="min-h-screen px-8 py-24 ml-48 bg-gray-50">
      <h1 className="text-4xl font-extrabold mb-12 text-[#c3953f] tracking-wide">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <DashboardCard
          title="Revenue"
          value={stats.revenue !== null ? `$${stats.revenue.toFixed(2)}` : "$0.00"}
          icon={<FiDollarSign />}
          dotColor="bg-green-500"
        />
        <DashboardCard
          title="No of Orders"
          value={totalOrders}
          icon={<FiBox />}
          dotColor="bg-yellow-500"
        />
        <DashboardCard
          title="Customers"
          value={stats.customerCount}
          icon={<FiBarChart />}
          dotColor="bg-blue-500"
        />
        <DashboardCard
          title="New Orders"
          value={stats.newOrderCount}
          icon={<FiPackage />}
          dotColor="bg-blue-500"
          link="/Admin/order/new"
        />
        <DashboardCard
          title="Pending Orders"
          value={stats.pendingOrderCount}
          icon={<FiBookmark />}
          dotColor="bg-yellow-500"
          link="/Admin/order/pending"
        />
        <DashboardCard
          title="Completed Orders"
          value={stats.completedOrderCount}
          icon={<AiFillCheckCircle />}
          dotColor="bg-green-700"
          link="/Admin/order/completed"
        />
      </div>
    </div>
  );
}
