"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductImageGallery from "@/components/product-details/ProductImageGallery";
import ProductDetails from "@/components/product-details/ProductDetails";
import ProductCarousel from "@/components/product-details/ProductCarousel";
import axiosInstance from "@/services/api";
import axios from "axios";

interface ProductDetail {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  rating: number;
  image: string[];
  frameColorOptions?: string[] | { name: string; code: string }[];
  themeColorOptions?: string[] | { name: string; code: string }[];
  sizeOptions?: string[];
  estimatedDeliveryTime?: string;
  detailed_description: string;
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

        const response = await axiosInstance.get(
          `/api/product-details/${id}`,
          { timeout: 10000 }
        );

        const productData = response.data;
        console.log("Product data received:", productData);

        // Process images - handle both string and array formats
        let images: string[] = [];

        if (productData.image) {
          if (Array.isArray(productData.image)) {
            // If image is already an array
            images = productData.image.filter(
              (img : string) => img && img.trim() !== ""
            );
          } else if (typeof productData.image === "string") {
            // If image is a string, add it to array
            images = [productData.image];
          }
        }

        // Add additional images if they exist
        if (
          productData.additionalImages &&
          Array.isArray(productData.additionalImages)
        ) {
          const additionalImages = productData.additionalImages.filter(
            (img : string) => img && img.trim() !== "" && !images.includes(img)
          );
          images = [...images, ...additionalImages];
        }

        console.log("Final processed images:", images);

        setProduct({
          ...productData,
          image: images,
          frameColorOptions: productData.frameColorOptions || [
            { name: "Black", code: "#000000" },
            { name: "Brown", code: "#8B4513" },
            { name: "Red", code: "#FF0000" },
          ],
          themeColorOptions: productData.themeColorOptions || [
            { name: "Blue", code: "#0000FF" },
            { name: "Pink", code: "#FFC0CB" },
            { name: "Green", code: "#008000" },
          ],
          sizeOptions: productData.sizeOptions || ["A4", "A3", "8x15"],
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
                ({product.image.length} image
                {product.image.length !== 1 ? "s" : ""})
              </span>
            </h2>
            <ProductImageGallery image={product.image} />
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
      </div>
    </div>
  );
}
