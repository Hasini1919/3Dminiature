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

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery.length > 0) {
      router.push(`/shop?search=${encodeURIComponent(trimmedQuery)}`);
      setQuery("");
      onClose();
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center bg-white shadow-md rounded-full overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 transition duration-300 ease-in-out"
    >
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputRef}
        className="w-64 px-5 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
      />
      <button
        type="submit"
        className="px-4 py-2  text-orange-400  transition-all duration-200"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
}
