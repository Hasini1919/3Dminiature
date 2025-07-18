"use client";

import { useState, useEffect, useCallback } from "react";
import { Range } from "react-range";

export interface FilterParams {
  category?: string;
  frameColor?: string[];
  themeColor?: string[];
  frameSize?: string[];
  priceRange?: string;
  size?: string;
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
  // Initialize state from initialValues if provided
  const [priceRange, setPriceRange] = useState<[number, number]>(
    initialValues.priceRange
      ? (initialValues.priceRange.split(",").map(Number) as [number, number])
      : [1000, 7000]
  );

  const [selectedFrameColors, setSelectedFrameColors] = useState<string[]>(
    initialValues.frameColor || []
  );

  const [selectedThemeColors, setSelectedThemeColors] = useState<string[]>(
    initialValues.themeColor || []
  );

  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    initialValues.frameSize || []
  );

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialValues.category || null
  );

  const frameColors = [
    { name: "Black", code: "#000000" },
    { name: "Brown", code: "#8B4513" },
    { name: "Red", code: "#FF0000" },
  ];

  const themeColors = [
    { name: "Blue", code: "#0000FF" },
    { name: "Pink", code: "#FFC0CB" },
    { name: "Green", code: "#008000" },
  ];

  const sizes = ["A4", "A3", "8*15"];
  const categories = ["Wedding", "Birthday", "Graduation", "Baby", "Family"];

  // Memoize the filter updates to prevent unnecessary effect triggers
  const updateFilters = useCallback(() => {
    const filters: FilterParams = {};

    // Only include filters that have values
    if (selectedCategory) filters.category = selectedCategory;
    if (selectedFrameColors.length > 0)
      filters.frameColor = selectedFrameColors;
    if (selectedThemeColors.length > 0)
      filters.themeColor = selectedThemeColors;
    if (selectedSizes.length > 0) filters.frameSize = selectedSizes;
    filters.priceRange = `${priceRange[0]},${priceRange[1]}`;

    onFilterChange(filters);
  }, [
    selectedCategory,
    selectedFrameColors,
    selectedThemeColors,
    selectedSizes,
    priceRange,
    onFilterChange,
  ]);

  useEffect(() => {
    updateFilters();
  }, [updateFilters]);

  const toggleFilter = <T,>(
    currentValues: T[],
    value: T,
    setter: (values: T[]) => void
  ) => {
    const newValues = currentValues.includes(value)
      ? [] // Clear all selections for this filter group
      : [value]; // Select only this value (single selection)
    setter(newValues);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values as [number, number]);
  };

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedFrameColors([]);
    setSelectedThemeColors([]);
    setSelectedSizes([]);
    setPriceRange([1000, 7000]);
    if (onClearFilters) onClearFilters();
  };

  return (
    <div className="w-80 ml-5 p-5 space-y-4 mb-5 sticky top-5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold underline">Filters</h1>
        <button
          onClick={clearAllFilters}
          className="text-red-500 hover:text-red-600 text-sm font-medium"
        >
          Clear all
        </button>
      </div>

      {/* Categories Section */}
      <div>
        <h2 className="font-semibold text-black text-l mb-2">Category</h2>
        <ul className="space-y-1">
          {categories.map((category) => (
            <li
              key={category}
              className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${
                selectedCategory === category
                  ? "text-red-600 font-semibold"
                  : "hover:text-gray-200 text-gray-600"
              }`}
              onClick={() => handleCategorySelect(category)}
            >
              <span>{category}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range Section */}
      <div className="space-y-3">
        <h2 className="font-semibold text-black">Price Range (LKR)</h2>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            min="1000"
            max="7000"
            value={priceRange[0]}
            onChange={(e) =>
              handlePriceRangeChange([Number(e.target.value), priceRange[1]])
            }
            className="w-20 p-1 border border-gray-300 rounded text-center"
          />
          <span>-</span>
          <input
            type="number"
            min="1000"
            max="7000"
            value={priceRange[1]}
            onChange={(e) =>
              handlePriceRangeChange([priceRange[0], Number(e.target.value)])
            }
            className="w-20 p-1 border border-gray-300 rounded text-center"
          />
        </div>
      </div>

      <div className="mt-4">
        <Range
          step={1000}
          min={1000}
          max={7000}
          values={priceRange}
          onChange={handlePriceRangeChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "5px",
                width: "80%",
                backgroundColor: "#e5e7eb",
                borderRadius: "9999px",
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props: { key, ...restProps }, isDragged }) => (
            <div
              key={key}
              {...restProps}
              style={{
                ...restProps.style,
                height: "15px",
                width: "15px",
                backgroundColor: "#dc2626",
                borderRadius: "9999px",
                boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
                outline: "none",
              }}
            />
          )}
        />
        <p className="text-left text-gray-500 mt-2">
          LKR {priceRange[0]} - LKR {priceRange[1]}
        </p>
      </div>

      {/* Frame Colors - Multi-select */}
      <div>
        <h2 className="font-semibold text-black mb-2">Frame Colors</h2>
        <div className="flex flex-col gap-3">
          {frameColors.map((frameColor) => (
            <div
              key={frameColor.name}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() =>
                toggleFilter(
                  selectedFrameColors,
                  frameColor.name,
                  setSelectedFrameColors
                )
              }
            >
              <div
                className={`w-6 h-6 rounded-full transition-all ${
                  selectedFrameColors.includes(frameColor.name)
                    ? "ring-2 ring-offset-2 ring-red-600 transform scale-105"
                    : ""
                }`}
                style={{ backgroundColor: frameColor.code }}
              />
              <span
                className={`${
                  selectedFrameColors.includes(frameColor.name)
                    ? "font-semibold text-red-600"
                    : "text-gray-600 hover:text-gray-200"
                }`}
              >
                {frameColor.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Theme Colors - Multi-select */}
      <div className="mt-4">
        <h2 className="font-semibold text-black mb-2">Theme Colors</h2>
        <div className="flex flex-col gap-3">
          {themeColors.map((themeColor) => (
            <div
              key={themeColor.name}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() =>
                toggleFilter(
                  selectedThemeColors,
                  themeColor.name,
                  setSelectedThemeColors
                )
              }
            >
              <div
                className={`w-6 h-6 rounded-full transition-all ${
                  selectedThemeColors.includes(themeColor.name)
                    ? "ring-2 ring-offset-2 ring-red-600 transform scale-105"
                    : ""
                }`}
                style={{ backgroundColor: themeColor.code }}
              />
              <span
                className={`${
                  selectedThemeColors.includes(themeColor.name)
                    ? "font-semibold text-red-600"
                    : "text-gray-600 hover:text-gray-200"
                }`}
              >
                {themeColor.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes - Multi-select */}
      <div className="mt-4">
        <h2 className="font-semibold text-black mb-2">Size</h2>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() =>
                toggleFilter(selectedSizes, size, setSelectedSizes)
              }
              className={`px-3 py-1 rounded-full transition-colors ${
                selectedSizes.includes(size)
                  ? "bg-red-600 text-white shadow-md font-semibold"
                  : "bg-gray-200 text-gray-700 hover:text-gray-300"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;


// This code defines a FilterSection component that allows users to filter products based on various criteria such as category, price range, frame color, theme color, and size. It uses React hooks for state management and includes a range slider for price selection. The component also provides a clear all filters button to reset the selections.
//             onFilterChange={handleFilterChange}