"use client";

import ProductsPage from "@/components/shop-components/ProductsPage";
import Advertising from "@/components/shop-components/Advertising";
import React, { useState } from "react";
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
      <div className="mt-10 flex justify-between items-center">
        {/* Advertising component */}
        <Advertising />
      </div>

      {/* SearchBar component */}
      <SearchBar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        initialQuery={searchInput}
      />

      {/* Main content */}
      <ProductsPage searchQuery={searchQuery} />
    </div>
  );
};

export default ShopPage;
