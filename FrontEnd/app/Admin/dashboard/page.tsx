"use client";
import Navbar from "@/components/Admin_sidebar/Slidebar"
import { useEffect, useState } from "react";
import { fetchDashboardStats } from "@/utils/Admin/test/fetchDash";
import DashboardCard from "@/components/admin/DashboardCard";
import { FiDollarSign, FiBox, FiBarChart, FiPackage, FiBookmark } from "react-icons/fi";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { DashboardStats } from "@/types/admin/dashboard";
import { MdRequestQuote } from "react-icons/md";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    revenue: 0,
    newOrderCount: 0,
    pendingOrderCount: 0,
    completedOrderCount: 0,
    cancelOrderCount: 0,
    refundCount: 0,
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
    stats.newOrderCount + stats.pendingOrderCount + stats.completedOrderCount + (stats.cancelOrderCount ?? 0);

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 min-h-screen">
        {/* Content Container with proper responsive margins */}
        <div className="px-4 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8 
                        ml-0 sm:ml-16 md:ml-20 lg:ml-48 xl:ml-64 
                        mt-16 sm:mt-20 lg:mt-16 
                        bg-gradient-to-br from-slate-50 via-white to-slate-100">

          {/* Header Section */}
          <div className="mb-8 lg:mb-10">
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-2 truncate">
                  Dashboard Overview
                </h1>
                <p className="text-slate-600 text-sm sm:text-base lg:text-lg">
                  Monitor your business performance and key metrics
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="inline-flex items-center px-3 py-2 sm:px-4 bg-white rounded-lg shadow-sm border border-slate-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium text-slate-700">Live Data</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid - Optimized for all screen sizes */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 
                          gap-4 sm:gap-6 lg:gap-8 mb-8 lg:mb-10">

            {/* Revenue Card - Always featured */}
            <div className="xs:col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1">
              <DashboardCard
                title="Total Revenue"
                value={stats.revenue !== null ? `Rs. ${stats.revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "Rs. 0.00"}
                icon={<FiDollarSign className="w-5 h-5 sm:w-6 sm:h-6" />}
                dotColor="bg-emerald-500"
              />
            </div>

            {/* Total Orders */}
            <div className="xs:col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
              <DashboardCard
                title="Total Orders"
                value={totalOrders.toLocaleString()}
                icon={<FiBox className="w-5 h-5 sm:w-6 sm:h-6" />}
                dotColor="bg-blue-500"
              />
            </div>

            {/* Customers */}
            <div className="xs:col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
              <DashboardCard
                title="Total Customers"
                value={stats.customerCount.toLocaleString()}
                icon={<FiBarChart className="w-5 h-5 sm:w-6 sm:h-6" />}
                dotColor="bg-purple-500"
              />
            </div>

            {/* Orders Placed */}
            <div className="xs:col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
              <DashboardCard
                title="Orders Placed"
                value={stats.newOrderCount.toLocaleString()}
                icon={<FiPackage className="w-5 h-5 sm:w-6 sm:h-6" />}
                dotColor="bg-blue-500"
                link={`/Admin/test-Order?status=${encodeURIComponent("Order Placed")}`}
              />
            </div>

            {/* Processing */}
            <div className="xs:col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
              <DashboardCard
                title="Processing"
                value={stats.pendingOrderCount.toLocaleString()}
                icon={<FiBookmark className="w-5 h-5 sm:w-6 sm:h-6" />}
                dotColor="bg-amber-500"
                link={`/Admin/test-Order?status=${encodeURIComponent("Processing")}`}
              />
            </div>

            {/* Completed */}
            <div className="xs:col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
              <DashboardCard
                title="Completed"
                value={stats.completedOrderCount.toLocaleString()}
                icon={<AiFillCheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />}
                dotColor="bg-emerald-500"
                link={`/Admin/test-Order?status=${encodeURIComponent("Completed")}`}
              />
            </div>

            {/* Canceled */}
            <div className="xs:col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
              <DashboardCard
                title="Canceled"
                value={(stats.cancelOrderCount ?? 0).toLocaleString()}
                icon={<MdCancel className="w-5 h-5 sm:w-6 sm:h-6" />}
                dotColor="bg-red-500"
                link={`/Admin/test-Order?status=${encodeURIComponent("Canceled")}`}
              />
            </div>


            {/* Refunds */}
            <div className="xs:col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
              <DashboardCard
                title="Refunds"
                value={(stats.refundCount ?? 0).toLocaleString()}
                icon={<MdRequestQuote className="text-xl" />}
                dotColor="bg-pink-500"
                link="/Admin/refunds" // 👈 adjust path as per your route
              />
            </div>
          </div>

          {/* Quick Stats Summary - Enhanced Responsive Design */}
          <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-4">Quick Summary</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">

              {/* Success Rate */}
              <div className="p-3 sm:p-4 bg-slate-50 rounded-lg text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-600">
                  {stats.completedOrderCount > 0 ? Math.round((stats.completedOrderCount / totalOrders) * 100) : 0}%
                </div>
                <div className="text-xs sm:text-sm text-slate-600 mt-1">Success Rate</div>
              </div>

              {/* In Progress */}
              <div className="p-3 sm:p-4 bg-slate-50 rounded-lg text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-amber-600">
                  {stats.pendingOrderCount > 0 ? Math.round((stats.pendingOrderCount / totalOrders) * 100) : 0}%
                </div>
                <div className="text-xs sm:text-sm text-slate-600 mt-1">In Progress</div>
              </div>

              {/* New Orders */}
              <div className="p-3 sm:p-4 bg-slate-50 rounded-lg text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
                  {stats.newOrderCount > 0 ? Math.round((stats.newOrderCount / totalOrders) * 100) : 0}%
                </div>
                <div className="text-xs sm:text-sm text-slate-600 mt-1">New Orders</div>
              </div>

              {/* Canceled */}
              <div className="p-3 sm:p-4 bg-slate-50 rounded-lg text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600">
                  {(stats.cancelOrderCount ?? 0) > 0 ? Math.round(((stats.cancelOrderCount ?? 0) / totalOrders) * 100) : 0}%
                </div>
                <div className="text-xs sm:text-sm text-slate-600 mt-1">Canceled</div>
              </div>

              {/* Refunds */}
              <div className="p-3 sm:p-4 bg-slate-50 rounded-lg text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-pink-600">
                  {(stats.refundCount ?? 0) > 0 ? Math.round(((stats.refundCount ?? 0) / totalOrders) * 100) : 0}%
                </div>
                <div className="text-xs sm:text-sm text-slate-600 mt-1">Refunds</div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




