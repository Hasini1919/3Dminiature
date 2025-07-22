"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAppContext } from "@/context/AppContext";

interface ProductDetail {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  advertisementDiscount?: number;
  discountedPrice?: number;
  averageRating: number;
  frameColor?: string[] | { name: string; code: string }[];
  themeColor?: string[] | { name: string; code: string }[];
  frameSize?: string[];
  sizePriceAdjustments?: Record<string, number>;
  estimatedDeliveryTime?: string;
  detailed_description: string;
  baseSize?: string;
}

interface ProductDetailsProps {
  product: ProductDetail;
  productId: string;
}

interface CustomizationData {
  frameColor: string;
  themeColor: string;
  size: string;
  domeType: string;
  lightSetup: string;
  uploadedImages: File[];
}

// Default size price adjustments (used as fallback)
const DEFAULT_SIZE_PRICE_ADJUSTMENTS: Record<string, number> = {
  A3: 12000,
  A4: 3200,
  "8*12": 3000,
  "12*16": 10000,
};

const calculateDiscountedPrice = (
  price: number,
  productDiscount?: number,
  advertisementDiscount?: number
): number => {
  const discount = advertisementDiscount ?? productDiscount ?? 0;
  return price - (price * discount) / 100;
};

const calculateArea = (size: string): number => {
  const [width, height] = size.split("*").map(Number);
  return width * height;
};

const getBaseSize = (sizes: string[]): string => {
  if (!sizes || sizes.length === 0) return "";
  return sizes.reduce((smallest, current) => {
    return calculateArea(current) < calculateArea(smallest)
      ? current
      : smallest;
  }, sizes[0]);
};

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  productId,
}) => {
  const [customization, setCustomization] = useState<CustomizationData>({
    frameColor: "",
    themeColor: "",
    size: product.baseSize || "",
    domeType: "single",
    lightSetup: "",
    uploadedImages: [],
  });
  const [customText, setCustomText] = useState("");
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
    const {addToCart,user,isBuyNow,setIsBuyNow}=useAppContext();

  // Get effective size price adjustments (uses backend if available, otherwise falls back to defaults)
  const getSizeAdjustments = () => {
    return product.sizePriceAdjustments || DEFAULT_SIZE_PRICE_ADJUSTMENTS;
  };

  // Calculate and update price whenever relevant values change
  useEffect(() => {
    const calculatePrice = () => {
      try {
        // Get available frame sizes
        const availableSizes =
          product.frameSize || Object.keys(DEFAULT_SIZE_PRICE_ADJUSTMENTS);

        // Determine base size (smallest by area)
        const effectiveBaseSize =
          product.baseSize || getBaseSize(availableSizes);

        if (!effectiveBaseSize || !availableSizes) {
          setCurrentPrice(0);
          return;
        }

        // Get size adjustments
        const sizeAdjustments = getSizeAdjustments();

        // Get base price (product.price is for the base size)
        const basePrice = calculateDiscountedPrice(
          product.price,
          product.discount,
          product.advertisementDiscount
        );

        // Set default size to base size if not selected
        if (!customization.size && effectiveBaseSize) {
          setCustomization((prev) => ({ ...prev, size: effectiveBaseSize }));
        }

        // Calculate size adjustment
        const selectedSize = customization.size || effectiveBaseSize;
        const sizeAdjustment =
          selectedSize === effectiveBaseSize
            ? 0
            : sizeAdjustments[selectedSize] || 0;

        // Calculate add-ons
        const domeAdjustment = customization.domeType === "double" ? 1000 : 0;
        const lightAdjustment = customization.lightSetup ? 1000 : 0;

        // Calculate final price
        const calculatedPrice =
          (basePrice + sizeAdjustment + domeAdjustment + lightAdjustment) *
          quantity;

        setCurrentPrice(calculatedPrice);
      } catch (err) {
        console.error("Price calculation error:", err);
        setCurrentPrice(0);
      }
    };

    calculatePrice();
  }, [
    product.price,
    product.discount,
    product.advertisementDiscount,
    product.baseSize,
    product.frameSize,
    product.sizePriceAdjustments,
    customization.size,
    customization.domeType,
    customization.lightSetup,
    quantity,
  ]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    if (customization.uploadedImages.length + files.length > 5) {
      setError("You can upload a maximum of 5 images");
      return;
    }

    const validFiles = files.filter(
      (file) => file.type.match("image.*") && file.size <= 20 * 1024 * 1024
    );

    if (validFiles.length !== files.length) {
      setError("Only image files under 20MB are allowed");
    }

    const newPreviewUrls = validFiles.map((file) => URL.createObjectURL(file));
    setCustomization((prev) => ({
      ...prev,
      uploadedImages: [...prev.uploadedImages, ...validFiles],
    }));
    setPreviewImages((prev) => [...prev, ...newPreviewUrls]);
    setError(null);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previewImages[index]);
    setCustomization((prev) => ({
      ...prev,
      uploadedImages: prev.uploadedImages.filter((_, i) => i !== index),
    }));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!customization.frameColor && product.frameColor) {
      errors.frameColor = "Please select a frame color";
    }

    if (!customization.themeColor && product.themeColor) {
      errors.themeColor = "Please select a theme color";
    }

    if (!customization.size) {
      errors.size = "Please select a frame size";
    }

    if (customization.uploadedImages.length === 0) {
      errors.images = "Please upload at least one image";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddToCart = () => {
    if (!validateForm()) return;

    // Proceed with adding to cart
    console.log("Adding to cart:", {
      productId,
      customization,
      quantity,
      price: currentPrice,
    });
  };

  addToCart(
    productId,
    customization.size,
    customization.frameColor,
    customization.themeColor,
    customization.uploadedImages,
    quantity,
    false,
    customText 
  );
  toast.success("Product added to cart!");

  const handleBuyNow = () => {
    if (!validateForm()) return;

    // Proceed with buy now
    console.log("Buying now:", {
      productId,
      customization,
      quantity,
      price: currentPrice,
    });

    try {
      setIsBuyNow(true);
      addToCart(
        productId,
        customization.size,
        customization.frameColor,
        customization.themeColor,
        customization.uploadedImages,
        quantity,
        true,
        customText
      );
    } catch (error) {
      toast.error("Failed to process Buy Now.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Product Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
          {product.name}
        </h1>

        {/* Rating - Only show if rating exists */}
        {product.averageRating && product.averageRating > 0 && (
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.averageRating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-base text-gray-600 font-medium">
              {product.averageRating.toFixed(1)}/5.0
            </span>
          </div>
        )}

        {/* Price Display */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-3">
              <span className="text-red-600 font-bold text-xl">
                {`LKR ${currentPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
              </span>

              {(product.discount || product.advertisementDiscount) && (
                <span className="line-through text-gray-500 text-sm">
                  {`LKR ${product.price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                </span>
              )}

              {(product.discount || product.advertisementDiscount) && (
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {`${product.advertisementDiscount ?? product.discount}% OFF`}
                </span>
              )}
            </div>

            <div className="text-xs text-gray-600 flex flex-wrap gap-2">
              {customization.size && (
                <span className="bg-white px-2 py-1 rounded">
                  Size: {customization.size}
                </span>
              )}
              {customization.domeType === "double" && (
                <span className="bg-white px-2 py-1 rounded">
                  Double Dome (+LKR 1,000)
                </span>
              )}
              {customization.lightSetup && (
                <span className="bg-white px-2 py-1 rounded">
                  Light Setup (+LKR 1,000)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customization Options */}

      {/* Product Details */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
          <span className="w-1 h-5 bg-red-600 rounded-full mr-2"></span>
          Product Details
        </h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          {product.detailed_description}
        </p>
      </div>

      {/* Quantity and Delivery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Quantity */}
        <div className="p-3 bg-white rounded-lg border">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Quantity
          </label>
          <div className="flex items-center w-fit">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-50 text-gray-700 hover:bg-gray-100 text-lg font-semibold"
            >
              −
            </button>
            <span className="px-4 py-1 border-t border-b border-gray-300 bg-white text-gray-700 font-medium min-w-[50px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-50 text-gray-700 hover:bg-gray-100 text-lg font-semibold"
            >
              +
            </button>
          </div>
        </div>

        {/* Delivery */}
        {product.estimatedDeliveryTime && (
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center">
              <svg
                className="h-5 w-5 text-green-600 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-sm font-medium text-green-800">
                  Estimated Delivery
                </p>
                <p className="text-xs text-green-700">
                  {product.estimatedDeliveryTime}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Customization Options */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="w-1 h-5 bg-red-600 rounded-full mr-2"></span>
          Customize Your Frame
        </h3>

        {/* Frame Color */}
        {product.frameColor && product.frameColor.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Frame Color <span className="text-red-600">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {product.frameColor.map((colorOption: any, index: number) => {
                const colorName =
                  typeof colorOption === "string"
                    ? colorOption
                    : colorOption.name;
                const colorCode =
                  typeof colorOption === "string"
                    ? colorOption.toLowerCase()
                    : colorOption.code;

                return (
                  <button
                    key={`frame-${index}-${colorName}`}
                    type="button"
                    onClick={() =>
                      setCustomization((prev) => ({
                        ...prev,
                        frameColor: colorName,
                      }))
                    }
                    className={`flex items-center space-x-2 px-3 py-2 border rounded-md text-sm font-medium transition-all ${
                      customization.frameColor === colorName
                        ? "border-red-600 bg-red-50 text-red-700 shadow-md"
                        : "border-gray-300 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: colorCode || "#ffffff" }}
                    ></span>
                    <span className="capitalize">{colorName}</span>
                  </button>
                );
              })}
            </div>
            {validationErrors.frameColor && (
              <p className="mt-1 text-xs text-red-600">
                {validationErrors.frameColor}
              </p>
            )}
          </div>
        )}

        {/* Size */}
        {product.frameSize && product.frameSize.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Size <span className="text-red-600">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {product.frameSize.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() =>
                    setCustomization((prev) => ({ ...prev, size }))
                  }
                  className={`px-4 py-2 border rounded-md text-sm font-medium transition-all ${
                    customization.size === size
                      ? "border-red-600 bg-red-50 text-red-700 shadow-md"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {validationErrors.size && (
              <p className="mt-1 text-xs text-red-600">
                {validationErrors.size}
              </p>
            )}
          </div>
        )}

        {/* Theme Color */}
        {product.themeColor && product.themeColor.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Theme Color <span className="text-red-600">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {product.themeColor.map((colorOption: any, index: number) => {
                const colorName =
                  typeof colorOption === "string"
                    ? colorOption
                    : colorOption.name;
                const colorCode =
                  typeof colorOption === "string"
                    ? colorOption.toLowerCase()
                    : colorOption.code;

                return (
                  <button
                    key={`theme-${index}-${colorName}`}
                    type="button"
                    onClick={() =>
                      setCustomization((prev) => ({
                        ...prev,
                        themeColor: colorName,
                      }))
                    }
                    className={`flex items-center space-x-2 px-3 py-2 border rounded-md text-sm font-medium transition-all ${
                      customization.themeColor === colorName
                        ? "border-red-600 bg-red-50 text-red-700 shadow-md"
                        : "border-gray-300 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: colorCode || "#ffffff" }}
                    ></span>
                    <span className="capitalize">{colorName}</span>
                  </button>
                );
              })}
            </div>
            {validationErrors.themeColor && (
              <p className="mt-1 text-xs text-red-600">
                {validationErrors.themeColor}
              </p>
            )}
          </div>
        )}

        {/* Custom Text */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Add Custom Text (Optional)
          </label>
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm resize-none"
            placeholder="Enter your custom message here..."
            rows={3}
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Upload Your Images (Min 1, Max 5){" "}
            <span className="text-red-600">*</span>
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors bg-gray-50">
            <div className="space-y-1">
              <svg
                className="mx-auto h-8 w-8 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer font-medium text-red-600 hover:text-red-500"
                >
                  Browse files
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
                <span> or drag and drop</span>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 20MB</p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}

          {/* Preview Images */}
          {previewImages.length > 0 && (
            <div className="mt-3">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Uploaded Images ({previewImages.length}/5)
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {previewImages.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-16 object-cover rounded-md border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors text-xs opacity-0 group-hover:opacity-100"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {validationErrors.images && (
            <p className="mt-1 text-xs text-red-600">
              {validationErrors.images}
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAddToCart}
          className="flex-1 px-6 py-3 border border-red-600 rounded-lg text-base font-semibold text-red-600 bg-white hover:bg-red-50 transition-colors"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 px-6 py-3 border border-transparent rounded-lg text-base font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
