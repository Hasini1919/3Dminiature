import React from "react";

interface Props {
  search: string;
  setSearch: (val: string) => void;
}

export default function SearchBar({ search, setSearch }: Props) {
  return (
    <div className="mb-6">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name, address, etc..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-300"
      />
    </div>
  );
}
