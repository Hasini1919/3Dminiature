"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const SearchBar = ({ isOpen, onClose, initialQuery = "" }: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="container mx-auto px-4 pt-20">
        <div className="bg-white rounded-lg shadow-lg p-4 max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-grow p-2 border-b-2 border-gray-300 focus:border-red-500 outline-none"
            />
            <button
              type="submit"
              className="ml-2 p-2 text-gray-600 hover:text-red-500"
            >
              <FiSearch size={24} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 p-2 text-gray-600 hover:text-red-500"
            >
              <FiX size={24} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
