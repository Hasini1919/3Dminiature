"use client";

import { useState, useEffect, useCallback } from "react";
import FilterSection from "./FilterSection";
import NewProducts from "./NewProducts";
import { useSearchParams, useRouter } from "next/navigation";
import { FiSearch, FiX, FiFilter } from "react-icons/fi";

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
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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
    setFilterParams((prev) => {
      const newParams = { ...prev, ...params };

      // Remove empty/undefined parameters
      Object.keys(newParams).forEach((key) => {
        const paramKey = key as keyof FilterParams;
        if (
          newParams[paramKey] === undefined ||
          newParams[paramKey] === "" ||
          (Array.isArray(newParams[paramKey]) &&
            newParams[paramKey]?.length === 0)
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
    <div className="min-h-screen bg-white">
      {/* Enhanced Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Search Products
              </h3>
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search for frames, categories, brands..."
                    className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none text-lg transition-all"
                    autoFocus
                  />
                  <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                </div>
              </form>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchInput(urlSearchQuery);
                  }}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSearchSubmit}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden">
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX className="text-xl text-gray-600" />
              </button>
            </div>
            <div className="p-4">
              <FilterSection
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                initialValues={filterParams}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Header with Filter Button */}
      <div className="md:hidden sticky top-0 z-30 bg-white border-b border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 flex-1 p-3 bg-gray-100 rounded-lg text-left text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <FiSearch className="text-lg" />
            <span>Search products...</span>
          </button>
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="ml-3 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors relative"
          >
            <FiFilter className="text-lg" />
            {isFilterApplied && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold text-black">
                !
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-4 p-3 container mx-auto max-w-8xl">

          <FilterSection
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            initialValues={filterParams}
          />

        {/* Products Section */}
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
