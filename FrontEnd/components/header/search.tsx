"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export default function SearchBar({ isOpen, onClose, initialQuery = "" }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery.length > 0) {
      router.push(`/shop?search=${encodeURIComponent(trimmedQuery)}`);
      setQuery("");          
      onClose();              // Optional: close the search bar if needed
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-0">
      <input
        type="text"
        id="search_field"
        className="w-64 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputRef}
      />
      <button
        type="submit"
        id="search_btn"
        className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 disabled:opacity-50"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
}
