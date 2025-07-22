"use client";

import React, { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import { FaChevronDown, FaFilter, FaTh, FaThList } from "react-icons/fa";
import { FiGrid, FiList } from "react-icons/fi";
import Link from "next/link";
import axiosInstance from "@/services/api";

interface Advertisement {
  discountPercentage?: number;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  averageRating: number;
  category?: string;
  frameColor?: string;
  themeColor?: string;
  size?: string;
  discountPercentage?: number;
  advertisement?: Advertisement;
}

interface FilterParams {
  category?: string;
  frameColor?: string[];
  themeColor?: string[];
  frameSize?: string[];
  priceRange?: string;
  size?: string;
}

interface NewProductsProps {
  filterParams?: FilterParams;
  isFilterApplied?: boolean;
  resetTrigger?: number;
  searchQuery?: string;
}

const NewProducts = ({
  filterParams = {},
  isFilterApplied = false,
  resetTrigger = 0,
  searchQuery = "",
}: NewProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [showingRange, setShowingRange] = useState({ start: 0, end: 0 });
  const [sortBy, setSortBy] = useState("default");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [gridColumns, setGridColumns] = useState<2 | 3 | 4>(3); // Default to 3 columns
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterParams, sortBy, resetTrigger, searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [
    currentPage,
    sortBy,
    filterParams,
    isFilterApplied,
    resetTrigger,
    searchQuery,
  ]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.append("page", currentPage.toString());
      params.append("sortBy", sortBy);

      // Add search query if it exists
      if (searchQuery) {
        params.append("search", searchQuery);
      }

      // Add all active filters
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value) {
          if (Array.isArray(value)) {
            if (value.length > 0) {
              params.append(key, value.join(","));
            }
          } else {
            params.append(key, value.toString());
          }
        }
      });

      console.log("Fetching with params:", params.toString());

      const response = await axiosInstance.get(
        `/api/products?${params.toString()}`
      );

      const data = response.data;
      console.log("Received data:", data);

      setProducts(data.products || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotalProducts(data.pagination?.totalProducts || 0);
      setShowingRange({
        start: data.pagination?.showingStart || 0,
        end: data.pagination?.showingEnd || 0,
      });
    } catch (err) {
      setError((err as Error).message || "Failed to fetch products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const productsSection = document.getElementById("products-section");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleSortChange = (option: string) => {
    const backendSortOption =
      option === "rating"
        ? "rating"
        : option === "desc"
        ? "desc"
        : option === "asc"
        ? "asc"
        : "default";
    setSortBy(backendSortOption);
    setDropdownOpen(false);
  };

  const sortOptions = [
    { label: "Default sorting", value: "default" },
    { label: "Higher Ratings", value: "rating" },
    { label: "Price High to Low", value: "desc" },
    { label: "Price Low to High", value: "asc" },
  ];

  const getVisiblePages = () => {
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [1];
    const left = Math.max(2, currentPage - 1);
    const right = Math.min(totalPages - 1, currentPage + 1);

    if (left > 2) pages.push(-1);
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push(-1);
    pages.push(totalPages);

    return pages;
  };

  // Get grid classes based on column count
  const getGridClasses = () => {
    if (viewMode === "list") return "space-y-4";

    const baseClasses = "grid gap-3 sm:gap-4 md:gap-6";
    switch (gridColumns) {
      case 2:
        return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-2`;
      case 3:
        return `${baseClasses} grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3`;
      case 4:
        return `${baseClasses} grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4`;
      default:
        return `${baseClasses} grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3`;
    }
  };

  return (
    <div className="container px-4 sm:px-6 pt-5" id="products-section">
      {/* Header Section with enhanced styling */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pb-6 gap-4 border-b border-gray-200">
        <div className="flex flex-col">
          {searchQuery ? (
            <>
              <h2 className="font-bold text-2xl md:text-3xl text-gray-900 mb-1">
                Search Results
              </h2>
              <p className="text-gray-600">
                Showing results for{" "}
                <span className="font-semibold text-red-600">
                  "{searchQuery}"
                </span>
              </p>
            </>
          ) : (
            <>
              <h2 className="font-bold text-2xl md:text-3xl text-gray-900 mb-1">
                Tiny Frames
              </h2>
              <p className="text-gray-600">Discover our premium collection</p>
            </>
          )}
        </div>

        {/* Controls Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
          {/* Results info */}
          <div className="text-sm text-gray-600 font-medium order-4 sm:order-1">
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              {showingRange.start} - {showingRange.end} of {totalProducts} items
            </span>
          </div>

          {/* Grid Column Selector (only show in grid mode) */}
          {viewMode === "grid" && (
            <div className="flex bg-gray-100 rounded-lg p-1 order-3 sm:order-2">
              <button
                onClick={() => setGridColumns(2)}
                className={`px-3 py-2 rounded-md transition-all text-xs font-medium ${
                  gridColumns === 2
                    ? "bg-white shadow-sm text-red-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                2
              </button>
              <button
                onClick={() => setGridColumns(3)}
                className={`px-3 py-2 rounded-md transition-all text-xs font-medium ${
                  gridColumns === 3
                    ? "bg-white shadow-sm text-red-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                3
              </button>
              <button
                onClick={() => setGridColumns(4)}
                className={`px-3 py-2 rounded-md transition-all text-xs font-medium ${
                  gridColumns === 4
                    ? "bg-white shadow-sm text-red-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                4
              </button>
            </div>
          )}

          {/* View Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 order-2 sm:order-3">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-all ${
                viewMode === "grid"
                  ? "bg-white shadow-sm text-red-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FiGrid className="text-lg" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-all ${
                viewMode === "list"
                  ? "bg-white shadow-sm text-red-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FiList className="text-lg" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative order-1 sm:order-4" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-between space-x-3 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-red-300 transition-colors min-w-[180px]"
            >
              <span className="text-sm font-medium text-gray-700">
                {sortOptions.find((option) => option.value === sortBy)?.label ||
                  "Sort by"}
              </span>
              <FaChevronDown
                className={`text-gray-400 text-sm transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-xl rounded-lg border border-gray-200 w-full z-20 overflow-hidden">
                {sortOptions.map((option, index) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortChange(option.value)}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-red-50 hover:text-red-600 transition-colors ${
                      sortBy === option.value
                        ? "bg-red-50 text-red-600 font-medium"
                        : "text-gray-700"
                    } ${
                      index !== sortOptions.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Products Grid with responsive design */}
      <div className={`pt-6 ${getGridClasses()}`}>
        {loading ? (
          <div
            className={`${
              viewMode === "grid" ? "col-span-full" : ""
            } flex flex-col items-center justify-center py-16`}
          >
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-red-500"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-red-300 animate-spin animation-delay-150"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">
              Loading products...
            </p>
          </div>
        ) : error ? (
          <div
            className={`${
              viewMode === "grid" ? "col-span-full" : ""
            } text-center py-16`}
          >
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div
            className={`${
              viewMode === "grid" ? "col-span-full" : ""
            } text-center py-16`}
          >
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              {searchQuery
                ? `No products found matching "${searchQuery}" ${
                    isFilterApplied ? "with current filters" : ""
                  }`
                : isFilterApplied
                ? "No products match your filters. Try adjusting your criteria."
                : "No products available at the moment"}
            </p>
          </div>
        ) : (
          products.map((product) => (
            <Link
              key={product._id}
              href={`/shop/product/${product._id}`}
              className="group"
            >
              <ProductCard
                images={
                  product.images && product.images.length > 0
                    ? [
                        product.images[0].startsWith("http")
                          ? product.images[0]
                          : (() => {
                              const parts = product.images[0].split("/");
                              if (parts.length === 2) {
                                return `${
                                  axiosInstance.defaults.baseURL
                                }/products/${encodeURIComponent(
                                  parts[0]
                                )}/${encodeURIComponent(parts[1])}`;
                              }
                              return "/default-product.jpg";
                            })(),
                      ]
                    : ["/default-product.jpg"]
                }
                _id={product._id}
                title={product.name}
                desc={product.description}
                averageRating={product.averageRating}
                price={product.price}
                discountPercentage={product.discountPercentage || 0}
                advertisement={product.advertisement}
                product={product}
                className="h-full hover:scale-[1.02] transition-transform duration-300"
              />
            </Link>
          ))
        )}
      </div>
      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-300 text-gray-700 hover:border-red-300 hover:text-red-600"
              }`}
            >
              ← Previous
            </button>

            <div className="hidden sm:flex items-center gap-1">
              {getVisiblePages().map((page, index) =>
                page === -1 ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-3 py-2 text-gray-400"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-lg font-medium transition-all ${
                      currentPage === page
                        ? "bg-red-500 text-white shadow-md"
                        : "bg-white border border-gray-300 text-gray-700 hover:border-red-300 hover:text-red-600"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-300 text-gray-700 hover:border-red-300 hover:text-red-600"
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewProducts;
