"use client";

import { useState, useEffect, useCallback } from "react";
import FilterSection from "./FilterSection";
import NewProducts from "./NewProducts";
import { useSearchParams, useRouter } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";

export interface FilterParams {
  category?: string;
  frameColor?: string[];
  themeColor?: string[];
  frameSize?: string[];
  priceRange?: string;
  size?: string;
}

interface ProductsPageProps {
  searchQuery?: string;
}

export default function ProductsPage({ searchQuery = "" }: ProductsPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearchQuery = searchParams.get("search") || "";
  
  // Initialize filterParams from URL
  const [filterParams, setFilterParams] = useState<FilterParams>(() => {
    const params: FilterParams = {};
    const category = searchParams.get("category");
    const frameColor = searchParams.get("frameColor");
    const themeColor = searchParams.get("themeColor");
    const frameSize = searchParams.get("frameSize");
    const priceRange = searchParams.get("priceRange");
    const size = searchParams.get("size");

    if (category) params.category = category;
    if (frameColor) params.frameColor = frameColor.split(",");
    if (themeColor) params.themeColor = themeColor.split(",");
    if (frameSize) params.frameSize = frameSize.split(",");
    if (priceRange) params.priceRange = priceRange;
    if (size) params.size = size;

    return params;
  });

  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(urlSearchQuery);

  // Update URL and filter applied state when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (urlSearchQuery) params.set("search", urlSearchQuery);
    if (filterParams.category) params.set("category", filterParams.category);
    if (filterParams.frameColor?.length) 
      params.set("frameColor", filterParams.frameColor.join(","));
    if (filterParams.themeColor?.length)
      params.set("themeColor", filterParams.themeColor.join(","));
    if (filterParams.frameSize?.length)
      params.set("frameSize", filterParams.frameSize.join(","));
    if (filterParams.priceRange)
      params.set("priceRange", filterParams.priceRange);
    if (filterParams.size) params.set("size", filterParams.size);

    // Update filter applied state
    setIsFilterApplied(
      !!filterParams.category ||
      !!filterParams.frameColor?.length ||
      !!filterParams.themeColor?.length ||
      !!filterParams.frameSize?.length ||
      !!filterParams.priceRange ||
      !!filterParams.size
    );

    // Update URL without page reload
    router.replace(`/shop?${params.toString()}`, { scroll: false });
  }, [filterParams, urlSearchQuery, router]);

  // Handle filter changes
  const handleFilterChange = useCallback((params: FilterParams) => {
    setFilterParams(prev => {
      const newParams = { ...prev, ...params };

      // Remove empty/undefined parameters
      Object.keys(newParams).forEach(key => {
        const paramKey = key as keyof FilterParams;
        if (
          newParams[paramKey] === undefined ||
          newParams[paramKey] === "" ||
          (Array.isArray(newParams[paramKey]) && newParams[paramKey]?.length === 0)
        ) {
          delete newParams[paramKey];
        }
      });

      return newParams;
    });
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilterParams({});
    // Preserve search query if it exists
    const newUrl = urlSearchQuery ? `/shop?search=${urlSearchQuery}` : "/shop";
    router.push(newUrl);
  }, [urlSearchQuery, router]);

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      // Update URL with search query (preserves existing filters)
      const params = new URLSearchParams();
      params.set("search", searchInput.trim());
      
      // Add current filters to URL
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value) {
          if (Array.isArray(value)) {
            params.set(key, value.join(","));
          } else {
            params.set(key, value);
          }
        }
      });

      router.push(`/shop?${params.toString()}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <form onSubmit={handleSearchSubmit} className="flex items-center p-4">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products..."
                className="flex-grow p-3 border-b-2 border-gray-300 focus:border-red-500 outline-none text-lg"
                autoFocus
              />
              <button
                type="submit"
                className="ml-2 p-2 text-gray-600 hover:text-red-500"
              >
                <FiSearch size={24} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchInput(urlSearchQuery); 
                }}
                className="ml-2 p-2 text-gray-600 hover:text-red-500"
              >
                <FiX size={24} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-4 p-4 container mx-auto">
        <div className="md:w-1/4 bg-gray-50 rounded-lg sticky top-4 h-fit">
          <FilterSection
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            initialValues={filterParams} 
          />
        </div>
        <div className="md:w-3/4">
          <NewProducts
            filterParams={filterParams}
            isFilterApplied={isFilterApplied}
            searchQuery={urlSearchQuery || searchQuery}
          />
        </div>
      </div>
    </div>
  );
}