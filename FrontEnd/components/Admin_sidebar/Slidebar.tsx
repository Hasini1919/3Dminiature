'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  FiMenu,
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiChevronDown,
  FiBell,
  FiFolder,
  FiBarChart,
  FiSettings,
  FiLogOut,
  FiUser,
  FiX,
  FiSearch,
  FiMail,
  FiHome,
  FiTrendingUp
} from 'react-icons/fi';
import axios from 'axios';

interface Notification {
  _id: string;
  type: string;
  message: string;
  seen: boolean;
  createdAt: string;
}

export default function ModernAdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [showOnlyUnseen, setShowOnlyUnseen] = useState(false);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("http://localhost:5500/api/notifications");
        const data = await res.json();
        setNotifications(data);
      } catch {
        setNotifications([]);
      }
    };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // every 10s
    return () => clearInterval(interval);
  }, []);

  // Fetch profile image
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5500/api/admin/profile');
        const imagePath = res.data.picture?.replace(/^src\//, '');
        setProfileImage(`http://localhost:5500/${imagePath}`);
      } catch (err) {
        console.error('Failed to load profile picture:', err);
      }
    };

    fetchProfile();
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const unseenCount = notifications.filter((n) => !n.seen).length;
  const isActive = (path: string) => pathname.toLowerCase().includes(path.toLowerCase());

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/authentication/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: FiHome, href: '/Admin/dashboard', active: isActive('/Admin/dashboard') },
    { name: 'Orders', icon: FiShoppingCart, href: '/Admin/test-Order', active: isActive('/Admin/test-order') },
    { name: 'Customers', icon: FiUsers, href: '/Admin/customer', active: isActive('/Admin/customer') },
  ];

  const handleSingleNotificationClick = async (id: string) => {
    try {
      await fetch(`http://localhost:5500/api/notifications/seen/${id}`, {
        method: "PATCH",
      });
      // Refresh notifications
      const updated = await fetch("http://localhost:5500/api/notifications");
      const data = await updated.json();
      setNotifications(data);
    } catch (err) {
      console.error("Error marking as seen", err);
    }
  };
  
  const handleMarkAllAsSeen = async () => {
    try {
      await fetch("http://localhost:5500/api/notifications/mark-all-seen", {
        method: "PATCH",
      });
      // Refresh notifications
      const updated = await fetch("http://localhost:5500/api/notifications");
      const data = await updated.json();
      setNotifications(data);
    } catch (err) {
      console.error("Error marking all as seen", err);
    }
  };

  return (
    <div>
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 shadow-lg backdrop-blur-md bg-white/95 z-50">
        <div className="flex items-center justify-between px-4 lg:px-6 h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              aria-label="Toggle Menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Logo */}
            <div className="relative w-[140px] h-[35px] hidden sm:block">
              <Image
                src="/logo1.jpg"
                alt="Admin Panel"
                fill
                priority
                sizes="140px"
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 relative"
              >
                <FiBell size={20} />
                {unseenCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold px-1.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center">
                    {unseenCount > 99 ? '99+' : unseenCount}
                  </span>
                )}
              </button>

              {/* Enhanced Notifications Dropdown */}
              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-60">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                      <p className="text-sm text-gray-500">{unseenCount} unread notifications</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowOnlyUnseen(!showOnlyUnseen);
                        }}
                        className={`text-xs px-2 py-1 rounded ${
                          showOnlyUnseen ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {showOnlyUnseen ? 'Show All' : 'Unseen Only'}
                      </button>
                      {unseenCount > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAllAsSeen();
                          }}
                          className="ml-2 text-sm text-red-600 hover:text-red-700 font-medium"
                        >
                          Mark all
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications
                        .filter(n => !showOnlyUnseen || !n.seen)
                        .slice(0, 5)
                        .map((notification) => (
                          <div
                            key={notification._id}
                            onClick={() => handleSingleNotificationClick(notification._id)}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                              !notification.seen ? 'bg-red-50' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div
                                className={`w-2 h-2 rounded-full mt-2 ${
                                  !notification.seen ? 'bg-red-600' : 'bg-gray-300'
                                }`}
                              ></div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-800">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {new Date(notification.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        <FiBell className="mx-auto mb-2" size={24} />
                        <p>No notifications</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <Link
                      href="/Admin/notification"
                      onClick={() => setNotificationOpen(false)}
                      className="block text-center text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      View All Notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 p-1 hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                <img
                  src={profileImage || '/dp.jpg'}
                  alt="Admin Profile"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-red-200"
                />
                <FiChevronDown className={`text-gray-600 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} size={16} />
              </button>

              {/* Profile Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-60">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <img
                        src={profileImage || '/dp.jpg'}
                        alt="Admin"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        {/* Profile details if needed */}
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <Link
                      href="/Admin/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <FiUser className="mr-3" size={16} />
                      Profile Settings
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FiLogOut className="mr-3" size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-64px)] w-64 bg-gradient-to-b from-white via-gray-50 to-white border-r border-gray-200 shadow-xl transform transition-transform duration-300 ease-in-out z-45 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <FiBarChart className="text-white" size={20} />
            </div>
            <div>
              <h2 className="font-bold text-lg text-gray-800">Admin Panel</h2>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    item.active
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'hover:bg-red-50 text-gray-700 hover:text-red-600'
                  }`}
                >
                  <Icon size={20} className={`${item.active ? 'text-white' : 'group-hover:text-red-600'}`} />
                  <span className="font-medium">{item.name}</span>
                  {item.active && <div className="w-2 h-2 bg-white rounded-full ml-auto"></div>}
                </Link>
              );
            })}

            {/* Products Dropdown */}
            <div>
              <button
                onClick={() => setProductOpen(!productOpen)}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-red-50 text-gray-700 hover:text-red-600 group"
              >
                <FiBox size={20} className="group-hover:text-red-600" />
                <span className="font-medium flex-1 text-left">Products</span>
                <FiChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${productOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {productOpen && (
                <div className="ml-8 mt-2 space-y-1">
                  <Link
                    href="/Admin/Product/Add"
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                      isActive('/admin/product/add')
                        ? 'bg-red-600 text-white'
                        : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                    }`}
                  >
                    Add Product
                  </Link>
                  <Link
                    href="/Admin/Product/Table"
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                      isActive('/admin/product/table')
                        ? 'bg-red-600 text-white'
                        : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                    }`}
                  >
                    Product Table
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">System Status</p>
                <p className="text-xs text-gray-600">All systems operational</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}