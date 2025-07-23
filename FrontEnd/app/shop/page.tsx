"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";


import ProductsPage from "@/components/shop-components/ProductsPage";
import Advertising from "@/components/shop-components/Advertising";
import SearchBar from "@/components/search/SearchBar";

const ShopPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery);

  return (
    <>
      

      <div className="mt-10 flex justify-between items-center">
        <Advertising />
      </div>

      <SearchBar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        initialQuery={searchInput}
      />

      <ProductsPage searchQuery={searchQuery} />

    
    </>
  );
};

export default ShopPage;

