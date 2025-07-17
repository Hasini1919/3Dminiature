'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiMenu,
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiChevronDown,
  FiBell,
  FiFolder,
} from "react-icons/fi";

interface Notification {
  _id: string;
  type: string;
  message: string;
  seen: boolean;
  createdAt: string;
}

const Slidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("http://localhost:5500/api/notifications")
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch(() => setNotifications([]));
  }, []);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const unseenCount = notifications.filter((n) => !n.seen).length;

  const isActive = (path: string) => pathname.toLowerCase().includes(path.toLowerCase());

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/authentication/login");
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 p-4 z-30 flex items-center shadow-sm">
        <div className="relative w-[150px] h-[40px] hidden md:block">
          <Image
            src="/logo1.jpg"
            alt="Logo"
            fill
            priority
            sizes="(max-width: 768px) 100px, 150px"
            className="object-contain"
          />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 ml-2 text-gray-700 hover:bg-gray-100 rounded-md"
          aria-label="Toggle Sidebar"
        >
          <FiMenu size={24} />
        </button>

        <div className="ml-auto flex items-center space-x-4">
          <Link href="/Admin/notification" className="relative text-gray-600 hover:text-gray-900">
            <FiBell size={22} className="cursor-pointer" />
            {unseenCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-semibold px-1.5 rounded-full select-none">
                {unseenCount}
              </span>
            )}
          </Link>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <img
              src="/dp.jpg"
              alt="User Profile"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-9 h-9 rounded-full object-cover cursor-pointer"
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50">
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <Link
                      href="/Admin/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/Admin/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-64px)] w-48 bg-gradient-to-b from-[#a82f45] to-[#7a1e33]
          backdrop-blur-md backdrop-saturate-150 border-r border-white/20 text-white flex flex-col space-y-6
          transition-transform duration-300 z-20 ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}
      >
        <Link
          href="/Admin/dashboard"
          onClick={() => setIsOpen(false)}
          className={`flex items-center px-4 py-3 rounded hover:bg-white/10 transition ${
            isActive("/admin/dashboard") ? "bg-white/20 font-semibold" : ""
          }`}
        >
          <FiFolder className="mr-3" /> Dashboard
        </Link>

        {/* Products */}
        <div>
          <button
            onClick={() => setProductOpen(!productOpen)}
            className="flex items-center justify-between w-full px-4 py-3 hover:bg-white/10 rounded transition"
          >
            <span className="flex items-center">
              <FiBox className="mr-3" /> Products
            </span>
            <FiChevronDown
              className={`transition-transform ${productOpen ? "rotate-180" : "rotate-0"}`}
            />
          </button>
          {productOpen && (
            <nav className="ml-8 flex flex-col space-y-1 mt-1">
              <Link
                href="/Admin/Product/Add"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded hover:bg-white/20 transition ${
                  isActive("/admin/product/add") ? "bg-white/30 font-semibold" : ""
                }`}
              >
                Add Product
              </Link>
              <Link
                href="/Admin/Product/Table"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded hover:bg-white/20 transition ${
                  isActive("/admin/product/table") ? "bg-white/30 font-semibold" : ""
                }`}
              >
                Product Table
              </Link>
            </nav>
          )}
        </div>

        {/* Orders */}
        <div>
          <button
            onClick={() => setOrderOpen(!orderOpen)}
            className="flex items-center justify-between w-full px-4 py-3 hover:bg-white/10 rounded transition"
          >
            <span className="flex items-center">
              <FiShoppingCart className="mr-3" /> Orders
            </span>
            <FiChevronDown
              className={`transition-transform ${orderOpen ? "rotate-180" : "rotate-0"}`}
            />
          </button>
          {orderOpen && (
            <nav className="ml-8 flex flex-col space-y-1 mt-1">
              <Link
                href="/Admin/order/new"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded hover:bg-white/20 transition ${
                  isActive("/admin/order/new") ? "bg-white/30 font-semibold" : ""
                }`}
              >
                New Orders
              </Link>
              <Link
                href="/Admin/order/pending"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded hover:bg-white/20 transition ${
                  isActive("/admin/order/pending") ? "bg-white/30 font-semibold" : ""
                }`}
              >
                Pending Orders
              </Link>
              <Link
                href="/Admin/order/completed"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded hover:bg-white/20 transition ${
                  isActive("/admin/order/completed") ? "bg-white/30 font-semibold" : ""
                }`}
              >
                Completed Orders
              </Link>
            </nav>
          )}
        </div>

        <Link
          href="/Admin/customer"
          onClick={() => setIsOpen(false)}
          className={`flex items-center px-4 py-3 rounded hover:bg-white/10 transition ${
            isActive("/admin/customer") ? "bg-white/20 font-semibold" : ""
          }`}
        >
          <FiUsers className="mr-3" /> Customers
        </Link>
      </aside>
    </div>
  );
};

export default Slidebar;
