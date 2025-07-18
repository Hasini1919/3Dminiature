"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import axiosInstance from "@/services/api";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  rating: number;
  category?: string;
  frameColor?: string;
  themeColor?: string;
  size?: string;
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
  const [sortBy, setSortBy] = useState("rating");
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        : "rating";
    setSortBy(backendSortOption);
    setDropdownOpen(false);
  };

  const sortOptions = [
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

  return (
    <div className="container px-4 sm:px-6 pt-5" id="products-section">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 gap-4">
        {searchQuery ? (
          <h2 className="font-bold text-2xl">
            Search Results for: "{searchQuery}"
          </h2>
        ) : (
          <h2 className="font-bold text-2xl">Tiny Frames</h2>
        )}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="text-lg text-gray-500 whitespace-nowrap font-semibold">
            Showing {showingRange.start} - {showingRange.end} of {totalProducts}{" "}
            Frames <span className="ml-6 text-black font-bold">SortBy :</span>
          </div>
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-between w-full sm:w-auto space-x-2 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              <span>
                {sortOptions.find((option) => option.value === sortBy)?.label ||
                  "Sort by"}
              </span>
              <FaChevronDown
                className={`transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-gray-200 shadow-lg rounded-md border w-48 z-10">
                <ul>
                  {sortOptions.map((option) => (
                    <li
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className="px-4 py-2 cursor-pointer hover:bg-red-600 font-medium rounded-md hover:text-white"
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-8">
        {loading ? (
          <div className="col-span-full flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-red-500 border-solid"></div>
          </div>
        ) : error ? (
          <div className="col-span-full text-red-500 text-center py-10">
            {error}
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-full text-center py-10">
            {searchQuery
              ? `No products found matching "${searchQuery}" ${
                  isFilterApplied ? "with current filters" : ""
                }`
              : isFilterApplied
              ? "No products match your filters. Try adjusting your criteria."
              : "No products available"}
          </div>
        ) : (
          products.map((product) => (
            <div key={product._id}>
              <Link href={`/shop/product/${product._id}`} className="group">
                {" "}
                <ProductCard
                  image={
                    product.image && product.image.length > 0
                      ? [
                          product.image[0].startsWith("http")
                            ? product.image[0]
                            : (() => {
                                const parts = product.image[0].split("/");
                                if (parts.length === 2) {
                                  // parts[0] = folderName, parts[1] = imageName
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
                  title={product.name}
                  desc={product.description}
                  rating={product.rating}
                  price={product.price}
                  className="shadow-none transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-5 pb-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            &larr; Prev
          </button>

          {getVisiblePages().map((page, index) =>
            page === -1 ? (
              <span key={`ellipsis-${index}`} className="px-2">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === page
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
};

export default NewProducts;
