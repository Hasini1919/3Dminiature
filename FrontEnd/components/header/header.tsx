"use client";

import Link from "next/link";
import SearchBar from "./search";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import { useWishlist } from "@/context/WishlistContext";
import { AiFillHeart } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getCartCount } = useAppContext();
  const cartCount = getCartCount();
  const { count } = useWishlist();
  const { status } = useSession();
  const router = useRouter();

  const pathname = usePathname();

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

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    if (status === "authenticated") {
      router.push("/customerAccount/profile");
    } else {
      router.push("/authentication/login?callbackUrl=/customerAccount/profile");
    }
  };

  const handleLoginClick = () => {
    setIsDropdownOpen(false);
    router.push("/authentication/login?callbackUrl=/home");
  };

  const handleSignUpClick = () => {
    setIsDropdownOpen(false);
    router.push("/authentication/signup");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#c22638] shadow-lg backdrop-blur-sm text-white">
      <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white group-hover:border-black transition-all duration-300 shadow-md">
              <img
                src="/logo.jpg"
                alt="Tiny treasures logo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="font-bold text-lg hidden sm:inline-block group-hover:text-orange-400 transition-all duration-300 tracking-wide">
              Tiny Treasure
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {[
              { name: "Home", path: "/" },
              { name: "Shop", path: "/shop" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="relative group hover:text-gray-800 transition"
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gray-800 group-hover:w-full transition-all duration-300 ease-in-out"></span>
              </Link>
            ))}
          </div>

          {/* Search (Desktop) */}
          <div className="hidden md:block w-1/4">
            <SearchBar
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 relative" ref={dropdownRef}>
            {/* User Icon + Dropdown */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="group p-2 rounded-full hover:bg-white/10 transition relative"
              title="Account"
            >
              <FaUser size={18} className="group-hover:text-gray-200" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-12 bg-white text-black rounded-md shadow-md w-44 z-50">
                <div className="flex flex-col text-sm">
                  {/* My Profile (always shown, redirects based on auth status) */}
                  <button
                    onClick={handleProfileClick}
                    className="px-4 py-2 text-left hover:bg-gray-100"
                  >
                    My Profile
                  </button>

                  {/* Login (only shown when not authenticated) */}
                  {status !== "authenticated" && (
                    <button
                      onClick={handleLoginClick}
                      className="px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Login
                    </button>
                  )}

                  {/* Sign Up (always shown) */}
                  <button
                    onClick={handleSignUpClick}
                    className="px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            )}

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="group p-2 rounded-full transition relative"
              title="Wishlist"
            >
              <AiFillHeart className="w-6 h-6" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-xs px-2 py-1 rounded-full">
                  {count}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/card"
              className="group p-2 rounded-full transition relative"
              title="Cart"
            >
              <FaShoppingCart size={18} className="group-hover:text-gray-800" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-1 bg-black text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search (Mobile) */}
        <div className="md:hidden mt-2">
          <SearchBar
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
        </div>
      </nav>
    </header>
  );
}
