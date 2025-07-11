"use client"

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Search() {
  const [searching, setSearching] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchPost = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    if ("key" in e && e.key !== "Enter") return;

    setSearching(true);
    const query = inputRef.current?.value.trim();
    if (!query) {
      setSearching(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?q=${query}`)
      .then((res) => res.json())
      .then((res) => setPosts(res))
      .finally(() => setSearching(false));
  };

  return (
    <div className="flex items-center space-x-0">
      <input
        type="text"
        id="search_field"
        className="w-64 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search..."
        onKeyDown={searchPost}
        disabled={searching}
        ref={inputRef}
      />
      <button
        onClick={searchPost}
        disabled={searching}
        id="search_btn"
        className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 disabled:opacity-50"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}
