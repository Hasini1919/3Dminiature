"use client";

import { useAppContext } from "@/context/AppContext";
import React, { useState } from "react";

interface CustomizationData {
  frameColor: string;
  themeColor: string;
  size: string;
  customText: string;
  uploadedImages: File[]; // Multiple images
}

const Orders = () => {
  const { addToCart, getCartCount,setIsBuyNow} = useAppContext();

  const [customization, setCustomization] = useState<CustomizationData>({
    frameColor: "Black",
    themeColor: "Classic",
    size: "A4",
    customText: "add more new color mixed ",
    uploadedImages: [],
  });

  const handleAddToCart = () => {
    const productId = "67d26fbd3befb0318b3ec766";
    const quantity = 1;
    

    if (customization.uploadedImages.length === 0) {
      alert("Please select at least one image.");
      return;
    }
    setIsBuyNow(false);

    addToCart(
      productId,
      customization.size,
      customization.frameColor,
      customization.themeColor,
      customization.uploadedImages, 
      quantity,
      customization.customText
    );
  };

  const handleBuyNowClick = () => {
    const productId = "67d26fbd3befb0318b3ec766";
    const quantity = 1;

    if (customization.uploadedImages.length === 0) {
      alert("Please select at least one image.");
      return;
    }
    
    
    setIsBuyNow(true);

    addToCart(
      productId,
      customization.size,
      customization.frameColor,
      customization.themeColor,
      customization.uploadedImages, 
      quantity,
      customization.customText
    );
  };
    

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4 h-dhv">
      <div className="w-full max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Your Images (Max: 5)
        </label>

       
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files || []).slice(0, 5); 
            setCustomization((prev) => ({
              ...prev,
              uploadedImages: files,
            }));
          }}
          className="border rounded p-2 w-full"
        />
      </div>

      {/* Buttons */}
      <button
        onClick={handleAddToCart}
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
      >
        Add To Cart
      </button>

      <button
        onClick={handleBuyNowClick}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Buy Now
      </button>

      {/* Cart Count */}
      <div className="mt-8 text-lg font-semibold text-gray-700">
        Total Items in Cart: {getCartCount()}
      </div>
    </div>
  );
};

export default Orders;
