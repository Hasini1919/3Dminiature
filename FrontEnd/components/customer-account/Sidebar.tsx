"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaUser,
  FaShoppingCart,
  FaClipboardList,
  FaCog,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaEdit,
} from "react-icons/fa";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ProfileSettings from "@/components/customer-account/ProfileSettings";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import LogoutButton from "@/components/auth-components/LogoutButton"; 
const Sidebar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const menuItems = [
    { name: "My Profile", href: "/customerAccount/profile", icon: <FaUser /> },
    { name: "My Orders", href: "/customerAccount/orders", icon: <FaShoppingCart /> },
    { name: "My Reviews", href: "/customerAccount/reviews", icon: <FaClipboardList /> },
    { name: "Settings", href: "/customerAccount/settings", icon: <FaCog /> },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-80 lg:w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-xl lg:shadow-lg transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Profile Section with Edit Button */}
          <div className="flex flex-col items-center mb-8 p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 relative">
            <div className="relative mb-4">
              <img
                src={
                  uploadedImageUrl ||
                  session?.user?.image ||
                  "/default-product.jpg"
                }
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-600 shadow-lg object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/default-product.jpg";
                }}
              />
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-red-500 rounded-full border-2 border-white dark:border-gray-600 flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                aria-label="Edit profile"
              >
                <FaEdit size={12} />
              </button>
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1 truncate max-w-full">
              Hello, {session?.user?.name?.split(" ")[0] || "Buddy"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-full">
              {session?.user?.email || "Welcome!"}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group ${
                      pathname.startsWith(item.href)
                        ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg transform scale-[1.02]"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:transform hover:scale-[1.02] hover:shadow-md"
                    }`}
                  >
                    <span
                      className={`text-lg transition-transform duration-200 ${
                        pathname.startsWith(item.href)
                          ? "scale-110"
                          : "group-hover:scale-110"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

       <div className="flex flex-col gap-3 -mt-4"> {/* Adjusted margin to move up */}
  {/* Home and Logout buttons row */}
  <div className="flex justify-between gap-3">
    {/* Home Button */}
    <Link href="/home">
      <div className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-medium shadow transition-all cursor-pointer transform hover:scale-[1.02]">
        <FaHome className="text-base" />
        <span>Home</span>
      </div>
    </Link>

    {/* Logout Button */}
    <button className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium shadow transition-all transform hover:scale-[1.02]">
      <FaSignOutAlt className="text-base" />
      <LogoutButton />
    </button>
  </div>

  {/* Theme Toggle Button - now in black */}
  <button
    className="w-full flex items-center justify-center gap-3 p-3 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    aria-label="Toggle theme"
  >
    <span className="text-lg">
      {theme === "dark" ? (
        <FaSun className="text-yellow-300" />
      ) : (
        <FaMoon className="text-gray-300" />
      )}
    </span>
    <span className="font-medium">
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </span>
  </button>
</div>
          

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              © {new Date().getFullYear()} Your App Name
            </p>
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Edit Profile</h3>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                aria-label="Close modal"
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <ProfileSettings
              onClose={() => setIsProfileModalOpen(false)}
              onImageUpload={(url) => setUploadedImageUrl(url)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;