"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductImageGallery from "@/components/product-details/ProductImageGallery";
import ProductDetails from "@/components/product-details/ProductDetails";
import ProductCarousel from "@/components/product-details/ProductCarousel";
import axiosInstance from "@/services/api";
import axios from "axios";
import CustomerReviewsSection from "@/components/review/AddReview";

interface ProductDetail {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  averageRating: number;
  images: string[];
  frameColorOptions?: string[] | { name: string; code: string }[];
  themeColorOptions?: string[] | { name: string; code: string }[];
  sizeOptions?: string[];
  sizePrices?: { size: string; price: number }[];
  estimatedDeliveryTime?: string;
  detailed_description: string;
  baseSize?: string;
}

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get(`/api/product-details/${id}`, {
          timeout: 10000,
        });
        const productData = response.data;
        console.log("Product data received:", productData);

        // Process images - handle both string and array formats
        let images: string[] = [];

        if (productData.images) {
          if (Array.isArray(productData.images)) {
            // If image is already an array
            images = productData.images.filter(
              (img: string) => img && img.trim() !== ""
            );
          } else if (typeof productData.images === "string") {
            // If image is a string, add it to array
            images = [productData.images];
          }
        }

        // Add additional images if they exist
        if (
          productData.additionalImages &&
          Array.isArray(productData.additionalImages)
        ) {
          const additionalImages = productData.additionalImages.filter(
            (img: string) => img && img.trim() !== "" && !images.includes(img)
          );
          images = [...images, ...additionalImages];
        }

        console.log("Final processed images:", images);

        // Ensure required customization options come from database
       if (
         !Array.isArray(productData.frameColor) ||
         productData.frameColor.length === 0 ||
         !Array.isArray(productData.themeColor) ||
         productData.themeColor.length === 0 ||
         !Array.isArray(productData.frameSize) ||
         productData.frameSize.length === 0
       ) {
         console.warn(
           "Some customization options are missing or empty for product:",
           productData._id
         );
       }

        setProduct({
          ...productData,
          images: images,
          frameColorOptions: productData.frameColor,
          themeColorOptions: productData.themeColor,
          sizeOptions: productData.frameSizes,
          sizePrices: productData.sizePrices || [],
          baseSize: productData.baseSize,
        });
      } catch (err) {
        console.error("Error fetching product:", err);

        if (axios.isAxiosError(err)) {
          if (err.code === "ECONNABORTED") {
            setError("Request timeout. Please try again.");
          } else if (err.response && err.response.status === 404) {
            setError("Product not found.");
          } else if (err.response && err.response.status >= 500) {
            setError("Server error. Please try again later.");
          } else {
            setError("Failed to load product. Please try again.");
          }
        } else if (
          err instanceof Error &&
          err.message.includes("customization")
        ) {
          setError("Product configuration error. Please contact support.");
        } else {
          setError("Network error. Please check your connection.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    } else {
      setError("Invalid product ID");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center p-8 max-w-md bg-white rounded-2xl shadow-xl">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all hover:scale-105"
            >
              Try Again
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The requested product could not be found.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Product Images
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({product.images.length} images
                {product.images.length !== 1 ? "s" : ""})
              </span>
            </h2>
            <ProductImageGallery images={product.images} product={product} />
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <ProductDetails product={product} productId={id} />
          </div>
        </div>

        {/* Related Products */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <ProductCarousel productId={id} />
        </div>

        {/* Customer Reviews Section */}
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12 mb-8 bg-gray-50">
          <CustomerReviewsSection productId={product._id} />
        </div>
      </div>
    </div>
  );
}
