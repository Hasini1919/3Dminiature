"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import SearchBar from "./SearchBar";

const SearchIcon = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsSearchOpen(true)}
        className="p-2 text-gray-600 hover:text-red-500"
      >
        <FiSearch size={20} />
      </button>
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default SearchIcon;
