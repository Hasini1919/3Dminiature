"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { AiFillCheckCircle } from 'react-icons/ai';
import { FiBarChart, FiBookmark, FiBox, FiDollarSign, FiPackage, } from 'react-icons/fi';

const Dashboard = () => {
    const [newOrderCount, setNewOrderCount] = useState<number>(100);

    //New Order count 
    useEffect(() => {
        const fetchNewOrderCount = async () => {
            try {
                const res = await fetch("http://localhost:5500/api/order-stats/count-new");
                const data = await res.json();
                setNewOrderCount(data.count);
            } catch (error) {
                console.error("Error fetching new order count", error);
            }
        };
        fetchNewOrderCount();
    }, []);

    //Pending Order Count
    const [pendingOrderCount, setPendingOrderCount] = useState<number>(0);

    useEffect(() => {
        const fetchPendingOrderCount = async () => {
            try {
                const res = await fetch("http://localhost:5500/api/pending-stats/count-pending");
                const data = await res.json();
                setPendingOrderCount(data.count);
            } catch (error) {
                console.error("Error fetching completed order count", error);
            }
        };
        fetchPendingOrderCount();
    }, []);

    // Completed Order Count
    const [comOrderCount, setcomOrderCount] = useState<number>(0);

    useEffect(() => {
        const fetchcomOrderCount = async () => {
            try {
                const res = await fetch("http://localhost:5500/api/completed-stats/count-completed");
                const data = await res.json();
                setcomOrderCount(data.count);
            } catch (error) {
                console.error("Error fetching completed order count", error);
            }
        };
        fetchcomOrderCount();
    }, []);

    //Customer Count
    const [customerCount, setCustomerCount] = useState<number>(0);

    useEffect(() => {
        const fetchCustomerCount = async () => {
            try {
                const res = await fetch("http://localhost:5500/api/customer/count");
                const data = await res.json();
                setCustomerCount(data.count);
            } catch (error) {
                console.error("Error fetching customer count", error);
            }
        };
        fetchCustomerCount();
    }, []);

    //Total revenue

    const [revenue, setRevenue] = useState<number | null>(null);
    useEffect(() => {
        const fetchRevenue = async () => {
            try {
                const res = await fetch("http://localhost:5500/api/orders-completed/revenue");
                const data = await res.json();
                setRevenue(data.revenue);
            } catch (err) {
                console.error("Failed to fetch revenue", err);

            }
        };
        fetchRevenue();
    }, []);

    return (
        <div className="flex flex-wrap justify-center items-center h-screen bg-gradient-to-r p-4">
            <h3 className="w-full text-left text-xl font-bold mt-20 ml-72 text-[#9e9e9e]">Hi Hasini,</h3>
            <p className="w-full text-left text-xs font-bold ml-72 text-[#9e9e9e]">Welcome back.</p>
            <div className="grid grid-cols-3 mt-6 gap-5 ml-52">

                <div className="w-80 h-44 shadow-[0_20px_20px_rgba(0,0,0,0.05)] rounded-lg bg-white m-14  transition duration-300 p-4 flex flex-col justify-between">

                    {/* First Row: Green circle + Revenue */}
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <p className="text-black text-2xl font-semibold">Revenue</p>
                    </div>

                    {/* Second Row: Revenue amount + icon */}
                    <div className="flex items-center justify-between">
                        <p className="font-bold text-gray-400 ml-2">
                            Last available report: <span className="font-bold text-black text-2xl">${revenue}</span>
                        </p>
                        <FiDollarSign className="text-black text-2xl animate-bounce" />
                    </div>

                    {/* Third Row: Button */}
                    <div className="flex justify-center mt-2">
                        <button className="px-20 py-2 bg-blue-900 text-white text-[14px] rounded-lg shadow-md hover:bg-[#256180] transition duration-300">
                            View Dashboard
                        </button>
                    </div>
                </div>

                <div className="w-80 h-44 shadow-[0_20px_20px_rgba(0,0,0,0.05)] rounded-lg bg-white m-14  transition duration-300 p-4 flex flex-col justify-between">

                    {/* First Row: Yellow circle + No of Orders */}
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <p className="text-black text-2xl font-semibold">No of Orders</p>
                    </div>

                    {/* Second Row: Order total + icon */}
                    <div className="flex items-center justify-between">
                        <p className="font-bold text-gray-400 ml-8">
                            Last available report: <span className="font-bold text-black text-2xl">{newOrderCount + pendingOrderCount + comOrderCount}</span>
                        </p>
                        <FiBox className="text-black text-2xl animate-pulse" />
                    </div>

                    {/* Third Row: Button */}
                    <div className="flex justify-center mt-2">
                        <button className="px-20 py-2 bg-blue-900 text-white text-[14px] rounded-lg shadow-md hover:bg-[#256180] transition duration-300">
                            View Dashboard
                        </button>
                    </div>
                </div>

                <div className="w-80 h-44 shadow-[0_20px_20px_rgba(0,0,0,0.05)] rounded-lg bg-white m-14  transition duration-300 p-4 flex flex-col justify-between">

                    {/* First Row: Blue dot + Title */}
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <p className="text-black text-2xl font-semibold">No of Customers</p>
                    </div>

                    {/* Second Row: Count + Icon */}
                    <div className="flex items-center justify-between">
                        <p className="font-bold text-gray-400 ml-8">
                            Last available report: <span className="font-bold text-black text-2xl">{customerCount}</span>
                        </p>
                        <FiBarChart className="text-black text-2xl animate-pulse" />
                    </div>

                    {/* Third Row: Button */}
                    <div className="flex justify-center mt-2">
                        <button className="px-20 py-2 bg-blue-900 text-white text-[14px] rounded-lg hover:bg-[#256180] shadow-md hover:bg-[#256180]transition duration-300">
                            View Dashboard
                        </button>
                    </div>
                </div>
                <Link href="/Admin/order/new" className="block">
                    <div className="w-80 h-44 shadow-[0_20px_20px_rgba(0,0,0,0.05)] rounded-lg bg-white m-14  transition duration-300 p-4 flex flex-col justify-between">

                        {/* First Row: Green circle + New Orders */}
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <p className="text-black text-2xl font-semibold">New Orders</p>
                        </div>

                        {/* Second Row: Report info + icon */}
                        <div className="flex items-center justify-between">
                            <p className="font-bold text-gray-400 ml-8">
                                Last available report: <span className="font-bold text-black text-2xl">{newOrderCount}</span>
                            </p>
                            <FiPackage className="text-black text-2xl animate-bounce" />
                        </div>

                        {/* Third Row: Button */}
                        <div className="flex justify-center mt-2">
                            <button className="px-20 py-2 bg-blue-900 text-white text-[14px] rounded-lg shadow-md hover:bg-[#256180] transition duration-300">
                                View Dashboard
                            </button>
                        </div>
                    </div>
                </Link>

                <Link href="/Admin/order/pending" className="block">
                    <div className="w-80 h-44 shadow-[0_20px_20px_rgba(0,0,0,0.05)] rounded-lg bg-white m-14  transition duration-300 p-4 flex flex-col justify-between">

                        {/* First Row */}
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <p className="text-black text-2xl font-semibold">Pending Orders</p>
                        </div>

                        {/* Second Row */}
                        <div className="flex items-center justify-between">
                            <p className="font-bold text-gray-400 ml-8">
                                Last available report: <span className="font-bold text-black text-2xl">{pendingOrderCount}</span>
                            </p>
                            <FiBookmark className="text-black text-2xl animate-pulse" />
                        </div>

                        {/* Third Row */}
                        <div className="flex justify-center mt-2">
                            <button className="px-20 py-2 bg-blue-900 text-white text-[14px] rounded-lg shadow-md hover:bg-[#256180] transition duration-300">
                                View Dashboard
                            </button>
                        </div>

                    </div>
                </Link>

                <Link href="/Admin/order/completed" className="block">
                    <div className="w-80 h-44 shadow-[0_20px_20px_rgba(0,0,0,0.05)] rounded-lg bg-white m-14  transition duration-300 p-4 flex flex-col justify-between">

                        {/* First Row */}
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-700 rounded-full"></div>
                            <p className="text-black text-2xl font-semibold">Completed Orders</p>
                        </div>

                        {/* Second Row */}
                        <div className="flex items-center justify-between">
                            <p className="font-bold text-gray-400 ml-8">
                                Last available report: <span className="font-bold text-black text-2xl">{comOrderCount}</span>
                            </p>
                            <AiFillCheckCircle className="text-black text-2xl animate-ping" />
                        </div>

                        {/* Third Row */}
                        <div className="flex justify-center mt-2">
                            <button className="px-20 py-2 bg-blue-900 text-white text-[14px] rounded-lg shadow-md hover:bg-[#256180] transition duration-300">
                                View Dashboard
                            </button>
                        </div>

                    </div>
                </Link>
            </div>
        </div>

    );
}

export default Dashboard
