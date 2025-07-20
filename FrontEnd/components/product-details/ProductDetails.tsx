"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ProductDetail {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  advertisementDiscount?: number;
  discountedPrice?: number;
  rating: number;
  frameColorOptions?: string[] | { name: string; code: string }[];
  themeColorOptions?: string[] | { name: string; code: string }[];
  sizeOptions?: string[];
  estimatedDeliveryTime?: string;
  detailed_description: string;
}

interface ProductDetailsProps {
  product: ProductDetail;
  productId: string;
}

interface CustomizationData {
  frameColor: string;
  themeColor: string;
  size: string;
  uploadedImages: File[];
}

const  calculateDiscountedPrice = (
  price: number,
  productDiscount?: number,
  advertisementDiscount?: number
): number => {
  const discount = advertisementDiscount ?? productDiscount ?? 0;
  return price - (price * discount) / 100;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, productId }) => {
  const [customization, setCustomization] = useState<CustomizationData>({
    frameColor: "",
    themeColor: "",
    size: "",
    uploadedImages: [],
  });
  const [customText, setCustomText] = useState("");
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [discountedPrice, setDiscountedPrice] = useState<number>(product.price);

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

useEffect(() => {
  const price = calculateDiscountedPrice(
    product.price,
    product.discount,
    product.advertisementDiscount
  );
  setDiscountedPrice(price);
}, [product.price, product.discount, product.advertisementDiscount]);


  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Product Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {product.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center mb-6">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-6 h-6 ${
                  i < Math.floor(product.rating)
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
          <span className="ml-3 text-lg text-gray-600 font-medium">
            {product.rating?.toFixed(1) ?? "0.0"}/5.0{" "}
          </span>
        </div>

        {/* Price */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          {product.discount || product.advertisementDiscount ? (
            <div className="flex items-center space-x-2">
              <span className="text-red-500 font-bold text-lg">
                LKR {discountedPrice.toFixed(2)}
              </span>
              <span className="line-through text-gray-500 text-sm">
                LKR {product.price.toFixed(2)}
              </span>
              {product.discount && product.discount > 0 && (
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                  {product.discount}% off
                </span>
              )}
            </div>
          ) : (
            <div className="text-lg font-bold">
              LKR {product.price.toFixed(2)}
            </div>
          )}
        </div>
      </div>

      {/* Detail Description */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <span className="w-1 h-6 bg-red-500 rounded-full mr-3"></span>
          Product Details
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {product.detailed_description}
        </p>
      </div>

      {/* Quantity and Delivery Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Quantity Selector */}
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Quantity
          </label>
          <div className="flex items-center">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 border border-gray-300 rounded-l-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              -
            </button>
            <span className="px-6 py-2 border-t border-b border-gray-300 bg-white text-gray-700 font-medium">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 border border-gray-300 rounded-r-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              +
            </button>
          </div>
        </div>

        {/* Delivery Info */}
        {product.estimatedDeliveryTime && (
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center">
              <svg
                className="h-6 w-6 text-green-600 mr-3"
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
                <p className="text-sm text-green-700">
                  {product.estimatedDeliveryTime}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Customization Options */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <span className="w-1 h-6 bg-red-500 rounded-full mr-3"></span>
          Customize Your Frame
        </h2>

        {/* Frame Color */}
        {product.frameColorOptions && product.frameColorOptions.length > 0 && (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Frame Color
            </label>
            <div className="flex flex-wrap gap-3">
              {product.frameColorOptions.map(
                (colorOption: any, index: number) => {
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
                      className={`flex items-center space-x-3 px-4 py-3 border rounded-lg text-sm font-medium transition-all duration-200 ${
                        customization.frameColor === colorName
                          ? "border-red-500 bg-red-50 text-red-700 shadow-md"
                          : "border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400"
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full border-2 border-gray-300"
                        style={{ backgroundColor: colorCode || "#ffffff" }}
                      ></span>
                      <span className="capitalize">{colorName}</span>
                    </button>
                  );
                }
              )}
            </div>
          </div>
        )}

        {/* Theme Color */}
        {product.themeColorOptions && product.themeColorOptions.length > 0 && (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Theme Color
            </label>
            <div className="flex flex-wrap gap-3">
              {product.themeColorOptions.map(
                (colorOption: any, index: number) => {
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
                      className={`flex items-center space-x-3 px-4 py-3 border rounded-lg text-sm font-medium transition-all duration-200 ${
                        customization.themeColor === colorName
                          ? "border-red-500 bg-red-50 text-red-700 shadow-md"
                          : "border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400"
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full border-2 border-gray-300"
                        style={{ backgroundColor: colorCode || "#ffffff" }}
                      ></span>
                      <span className="capitalize">{colorName}</span>
                    </button>
                  );
                }
              )}
            </div>
          </div>
        )}

        {/* Size */}
        {product.sizeOptions && product.sizeOptions.length > 0 && (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Size
            </label>
            <div className="flex flex-wrap gap-3">
              {product.sizeOptions.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() =>
                    setCustomization((prev) => ({ ...prev, size }))
                  }
                  className={`px-6 py-3 border rounded-lg text-sm font-medium transition-all duration-200 ${
                    customization.size === size
                      ? "border-red-500 bg-red-50 text-red-700 shadow-md"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Custom Text */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Add Custom Text (Optional)
          </label>
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
            placeholder="Enter your custom message here..."
            rows={4}
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Upload Your Images (Max 5)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors duration-200">
            <div className="space-y-2">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
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
              <div className="flex text-sm text-gray-600 justify-center">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500"
                >
                  <span>Upload files</span>
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
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 20MB</p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Preview Uploaded Images */}
          {previewImages.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Your Images ({previewImages.length}/5)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {previewImages.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Uploaded preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="px-8 py-3 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors duration-200 transform hover:scale-105">
          Add to Cart
        </button>
        <button className="px-8 py-3 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 transform hover:scale-105">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
