"use client";

import { useState, useEffect, useCallback } from "react";
import { Range } from "react-range";

export interface FilterParams {
  category?: string;
  frameColor?: string[];
  priceRange?: string;
}

interface FilterSectionProps {
  onFilterChange: (filters: FilterParams) => void;
  onClearFilters?: () => void;
  initialValues?: FilterParams;
}

const FilterSection = ({
  onFilterChange,
  onClearFilters,
  initialValues = {},
}: FilterSectionProps) => {
  // Mobile menu state
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Initialize state from initialValues if provided
  const [priceRange, setPriceRange] = useState<[number, number]>(
    initialValues.priceRange
      ? (initialValues.priceRange.split(",").map(Number) as [number, number])
      : [1000, 7000]
  );

  // Applied price range (only changes when Filter button is clicked)
  const [appliedPriceRange, setAppliedPriceRange] = useState<[number, number]>(
    initialValues.priceRange
      ? (initialValues.priceRange.split(",").map(Number) as [number, number])
      : [1000, 7000]
  );

  const [selectedFrameColors, setSelectedFrameColors] = useState<string[]>(
    initialValues.frameColor || []
  );

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialValues.category || null
  );

  const frameColors = [
    { name: "Black", code: "#1a1a1a" },
    { name: "White", code: "#ffffff" },
    { name: "Wood", code: "#d2b48c" },
  ];

  const categories = ["Wedding", "Birthday", "Graduation", "Baby", "Family"];

  // Memoize the filter updates to prevent unnecessary effect triggers
  const updateFilters = useCallback(() => {
    const filters: FilterParams = {};

    // Always include category, even if null (this allows proper undo behavior)
    filters.category = selectedCategory || undefined;

    // Always include frame colors array, even if empty (this allows proper undo behavior)
    filters.frameColor = selectedFrameColors;

    // Use applied price range, not the temporary one
    filters.priceRange = `${appliedPriceRange[0]},${appliedPriceRange[1]}`;

    onFilterChange(filters);
  }, [
    selectedCategory,
    selectedFrameColors,
    appliedPriceRange,
    onFilterChange,
  ]);

  // Trigger filter updates when category or frame colors change, not price range
  useEffect(() => {
    updateFilters();
  }, [updateFilters]);

  const toggleFrameColor = (color: string) => {
    setSelectedFrameColors((prev) => {
      if (prev.includes(color)) {
        // If deselecting and this was the last color, return empty array
        return prev.filter((c) => c !== color);
      } else {
        // Add the new color
        return [...prev, color];
      }
    });
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values as [number, number]);
  };

  // Handle price filter button click
  const applyPriceFilter = () => {
    setAppliedPriceRange(priceRange);
  };

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedFrameColors([]);
    setPriceRange([1000, 7000]);
    setAppliedPriceRange([1000, 7000]);
    if (onClearFilters) onClearFilters();
  };

  // Check if price range has changed from applied range
  const isPriceRangeChanged =
    priceRange[0] !== appliedPriceRange[0] ||
    priceRange[1] !== appliedPriceRange[1];

  const FilterContent = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-red-600 uppercase tracking-wide">
          Filters
        </h1>
        <button
          onClick={clearAllFilters}
          className="text-sm text-gray-500 hover:text-red-600 transition-colors font-medium uppercase tracking-wider"
        >
          Clear all
        </button>
      </div>

      {/* Categories Section */}
      <div className="pb-6 border-b border-gray-200">
        <h3 className="text-base font-bold text-red-600 uppercase tracking-wide mb-4">
          Category
        </h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category}
                onChange={() => handleCategorySelect(category)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-4 transition-all ${
                  selectedCategory === category
                    ? "border-black bg-black"
                    : "border-gray-300 group-hover:border-gray-400"
                }`}
              >
                {selectedCategory === category && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <span
                className={`text-sm transition-colors ${
                  selectedCategory === category
                    ? "text-black font-medium"
                    : "text-gray-600 group-hover:text-gray-900"
                }`}
              >
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Section */}
      <div className="pb-6 border-b border-gray-200">
        <h3 className="text-base font-bold text-red-600 uppercase tracking-wide mb-6">
          Filter By Price
        </h3>

        <div className="mb-6">
          <Range
            step={100}
            min={1000}
            max={7000}
            values={priceRange}
            onChange={handlePriceRangeChange}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-1 w-full bg-gray-300 relative"
                style={{
                  ...props.style,
                }}
              >
                <div
                  className="h-full bg-red-600 absolute"
                  style={{
                    left: `${((priceRange[0] - 1000) / (7000 - 1000)) * 100}%`,
                    right: `${
                      100 - ((priceRange[1] - 1000) / (7000 - 1000)) * 100
                    }%`,
                  }}
                />
                {children}
              </div>
            )}
            renderThumb={({ props: { key, ...restProps }, index }) => (
              <div
                key={key}
                {...restProps}
                className="h-4 w-4 bg-red-600 rounded-none transform rotate-45 shadow-md focus:outline-none"
                style={{
                  ...restProps.style,
                }}
              />
            )}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Price:{" "}
            <span className="font-medium text-gray-800">
              LKR {priceRange[0]}
            </span>
          </span>
          <span className="text-sm text-gray-600">—</span>
          <span className="text-sm text-gray-600">
            <span className="font-medium text-gray-800">
              LKR {priceRange[1]}
            </span>
          </span>
          <button
            onClick={applyPriceFilter}
            disabled={!isPriceRangeChanged}
            className={`px-4 py-1 text-sm font-medium uppercase tracking-wider transition-colors ${
              isPriceRangeChanged
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Filter
          </button>
        </div>
      </div>

      {/* Frame Colors Section */}
      <div className="pb-6">
        <h3 className="text-base font-bold text-red-600 uppercase tracking-wide mb-4">
          Frame Colors
        </h3>
        <div className="space-y-3">
          {frameColors.map((frameColor) => (
            <label
              key={frameColor.name}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedFrameColors.includes(frameColor.name)}
                onChange={() => toggleFrameColor(frameColor.name)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 border-2 rounded flex items-center justify-center mr-4 transition-all ${
                  selectedFrameColors.includes(frameColor.name)
                    ? "border-black bg-black"
                    : "border-gray-300 group-hover:border-gray-400"
                }`}
              >
                {selectedFrameColors.includes(frameColor.name) && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full mr-3 border ${
                    frameColor.name === "White"
                      ? "border-gray-300"
                      : "border-gray-200"
                  }`}
                  style={{ backgroundColor: frameColor.code }}
                />
                <span
                  className={`text-sm transition-colors ${
                    selectedFrameColors.includes(frameColor.name)
                      ? "text-black font-medium"
                      : "text-gray-600 group-hover:text-gray-900"
                  }`}
                >
                  {frameColor.name}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setIsMobileOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="px-4">
                <FilterContent />
              </div>
            </div>
          </div>
          <div
            className="flex-shrink-0 w-14"
            onClick={() => setIsMobileOpen(false)}
          />
        </div>
      )}

      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block w-74 flex-shrink-0 pr-6 ml-9">
        <div className="sticky top-4 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <FilterContent />
        </div>
      </div>

      {/* Mobile overlay backdrop */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default FilterSection;
