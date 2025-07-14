
"use client";

interface Notification {
  _id: string;
  type: string;
  message: string;
  seen: boolean;
  createdAt: string;
}

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiBox, FiShoppingCart, FiUsers, FiLogOut, FiChevronDown, FiBell, FiSettings, FiFolder } from "react-icons/fi";

const Slidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetch('http://localhost:5500/api/notifications')
      .then(res => res.json())
      .then(data => setNotifications(data));

  }, []);

  const unseenCount = notifications.filter(n => !n.seen).length;


  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white  border-r border-white  p-3 z-20 flex items-center   shadow">
        {/* Logo */}
        <div className=" mt-3">
          <div className="relative w-[150px] md:w-[150px] h-[40px]">
            <Image
              src="/logo1.jpg"
              alt="Logo"
              fill
              priority
              sizes="(max-width: 768px) 100px, 150px"
              className="object-contain hidden md:block"
            />

          </div>


          {/* <Image src="/logo2.jpg" alt="Logo" width={100} height={40} className="rounded-full md:hidden mx-auto h-auto w-auto" /> */}
        </div>

        {/* Sidebar Toggle Button (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-700"
          aria-label="Toggle Sidebar"
        >
          <FiMenu size={24} />
        </button>



        {/* Navbar Icons (Right side) */}
        <div className="ml-auto flex items-center">
          <Link href='/Admin/notification' className="relative">
            <FiBell className="text-gray-500 mx-3 cursor-pointer" size={20} />
            {unseenCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full ">
                {unseenCount}
              </span>
            )}
          </Link>
          <FiSettings className="text-gray-500 mx-3 cursor-pointer" size={20} />
          <img src="/dp.jpg" alt="dp" className="text-gray-500 mx-3 cursor-pointer rounded-full object-cover size-10"></img>



        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-20 left-0 h-screen w-48 bg-gradient-to-b bg-[#a82f45]  backdrop-blur-md backdrop-saturate-150 border-r border-white/20  text-white  transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 flex flex-col space-y-10 `}
      >



        {/* Dashboard */}

        <Link href="/Admin/dashboard" onClick={() => setIsOpen(false)}>
          <span
            className={`flex items-center p-3 rounded ${pathname === "/Dashboard" ? "border border-white" : "hover:bg-transparent hover:bg-gray-700"}`}
          >
            <FiFolder className="mr-2" /> Dashboard
          </span>
        </Link>

        {/* Products (Collapsible) */}
        <div>
          <button
            className="flex items-center w-full p-3    hover:bg-gray-700"
            onClick={() => setProductOpen(!productOpen)}
            aria-expanded={productOpen ? "true" : "false"}
            aria-controls="product-menu"
          >
            <FiBox className="mr-2" /> Products
            <FiChevronDown className={` ml-auto transform ${productOpen ? "rotate-180" : ""}`} />
          </button>
          {productOpen && (
            <div id="product-menu" className="ml-6 space-y-2">
              <Link href="/Admin/Product/Add" onClick={() => setIsOpen(false)}>
                <span className={`block p-2 hover:bg-gray-700 ${pathname === "/Product/Add" ? "border border-white" : ""}`}>Add Product</span>
              </Link>
              <Link href="/Admin/Product/Table" onClick={() => setIsOpen(false)}>
                <span className={`block p-2 hover:bg-gray-700 rounded ${pathname === "/Product/Table" ? "border border-white" : ""}`}>Product Table</span>
              </Link>
            </div>
          )}
        </div>

        {/* Orders (Collapsible) */}
        <div>
          <button
            className="flex items-center w-full p-3 hover:bg-gray-700 rounded"
            onClick={() => setOrderOpen(!orderOpen)}
            aria-expanded={orderOpen ? "true" : "false"}
            aria-controls="order-menu"
          >
            <FiShoppingCart className="mr-2" /> Orders
            <FiChevronDown className={`ml-auto transform ${orderOpen ? "rotate-180" : ""}`} />
          </button>
          {orderOpen && (
            <div id="order-menu" className="ml-6 space-y-2">
              <Link href="/Admin/order/new" onClick={() => setIsOpen(false)}>
                <span className={`block p-2 hover:bg-gray-700 rounded ${pathname === "/Order/New" ? "border border-white" : ""}`}>
                  New Orders

                </span>
              </Link>
              <Link href="/Admin/order/pending" onClick={() => setIsOpen(false)}>
                <span className={`block p-2 hover:bg-gray-700 rounded ${pathname === "/Order/Pending" ? "border border-white" : ""}`}>Pending Orders</span>
              </Link>
              <Link href="/Admin/order/completed" onClick={() => setIsOpen(false)}>
                <span className={`block p-2 hover:bg-gray-700 rounded ${pathname === "/Order/Completed" ? "border border-white" : ""}`} >Completed Orders</span>
              </Link>
            </div>
          )}
        </div>

        {/* Customers */}
        <Link href="/Admin/customer" onClick={() => setIsOpen(false)}>
          <span className={`flex items-center p-3 rounded ${pathname === "/Customer" ? "border border-white" : "hover:bg-gray-700"}`}>
            <FiUsers className="mr-2" /> Customers
          </span>
        </Link>

        {/* Logout */}
        <Link href="/Admin/logout" onClick={() => setIsOpen(false)}>
          <span className="flex items-center p-3 hover:bg-red-700 rounded mt-4">
            <FiLogOut className="mr-2" /> Logout
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Slidebar;
