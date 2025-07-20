"use client";

import Link from "next/link";
import SearchBar from "./search";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { BiGitCompare } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getCartCount } = useAppContext();
  const cartCount = getCartCount();

  return (
    <header className="sticky top-0 z-50 bg-[#c22638] shadow-lg backdrop-blur-sm  text-white">
      <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white group-hover:border-yellow-300 transition-all duration-300 shadow-md">
              <img
                src="/logo.jpg"
                alt="Tiny treasures logo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="font-bold text-lg hidden sm:inline-block group-hover:text-yellow-200 transition-all duration-300 tracking-wide">
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
                className="relative group hover:text-yellow-200 transition"
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300 ease-in-out"></span>
              </Link>
            ))}
          </div>

          {/* Search (Desktop) */}
          <div className="hidden md:block w-1/4">
            <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {/* Login */}
            <Link
              href="/authentication/login"
              className="group p-2 rounded-full hover:bg-white/10 transition relative"
              title="Login"
            >
              <FaUser size={18} className="group-hover:text-yellow-300" />
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="group p-2 rounded-full hover:bg-white/10 transition relative"
              title="Wishlist"
            >
              <AiFillHeart size={18} className="group-hover:text-yellow-300" />
            </Link>

            {/* Compare */}
            <Link
              href="/compare"
              className="group p-2 rounded-full hover:bg-white/10 transition relative"
              title="Compare"
            >
              <BiGitCompare size={20} className="group-hover:text-yellow-300" />
            </Link>

            {/* Cart */}
            <Link
              href="/card"
              className="group p-2 rounded-full hover:bg-white/10 transition relative"
              title="Cart"
            >
              <FaShoppingCart size={18} className="group-hover:text-yellow-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-700 text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search (Mobile) */}
        <div className="md:hidden mt-2">
          <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </div>
      </nav>
    </header>
  );
}

