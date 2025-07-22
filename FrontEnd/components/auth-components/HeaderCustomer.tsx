"use client";

import { useSession, signOut } from "next-auth/react";
import { FaUser } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const Header = () => {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // While loading session, don’t flash anything
  if (status === "loading") return null;

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">🖼️ 3D Miniature</h1>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="text-gray-700 hover:text-black focus:outline-none"
        >
          <FaUser size={24} />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10">
            {!session ? (
              <div className="flex flex-col">
                <Link
                  href="/authentication/login?callbackUrl=/customerAccount/profile"
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  href="/authentication/signup?callbackUrl=/customerAccount/profile"
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex flex-col">
                <Link
                  href="/customerAccount/profile"
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="px-4 py-2 text-left hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
