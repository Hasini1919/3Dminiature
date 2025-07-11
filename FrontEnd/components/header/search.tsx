"use client"

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Search() {
  const [search, setSearch] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchPost = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    if ("key" in e && e.key !== "Enter") {
      return;
    }
    setSearch(true);
    if (!inputRef.current) return;
    const query = inputRef.current.value.trim();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?q=${query}`)
      .then((res) => res.json())
      .then((res) => setPosts(res))
      .finally(() => setSearch(false));
  }

  return (
    <div className="input-group flex items-center space-x-2">
      <input
        type="text"
        id="search_field"
        className="form-control w-40 px-4 py-2 rounded-md "
        placeholder="Search ..."
        onKeyDown={searchPost}
        disabled={search}
        ref={inputRef}
      />
      <button 
        onClick={searchPost}
        disabled={search}
        id="search_btn"
        className="btn px-3 py-2 rounded-md  text-black hover:bg-gray-200"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}
