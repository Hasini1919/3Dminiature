"use client";

import ProductsPage from "@/components/shop-components/ProductsPage";
import Advertising from "@/components/shop-components/Advertising";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useSearchParams, useRouter } from "next/navigation";
import SearchBar from "@/components/search/SearchBar";

const ShopPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery);

  return (
    <div>
      {/* Temporary search button - can be removed when navbar integration is complete */}
      <div className="container mx-auto px-4 py-4 flex justify-end">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          <FiSearch size={18} />
          Search Products
        </button>
      </div>

      {/* SearchBar component */}
      <SearchBar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        initialQuery={searchInput}
      />

      {/* Main content */}
      <ProductsPage searchQuery={searchQuery} />
      <Advertising />
    </div>
  );
};

export default ShopPage;
