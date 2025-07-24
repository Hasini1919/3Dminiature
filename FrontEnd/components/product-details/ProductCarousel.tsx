"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "../shop-components/ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import axiosInstance from "@/services/api";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imagess: string[];
  rating: number;
  averageRating: number;
  discountPercentage?: number;
}

interface ProductCarouselProps {
  productId: string;
  title?: string;
  className?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  productId,
  title = "YOU MIGHT ALSO LIKE",
  className = "",
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  //  Fetch related products from the correct backend endpoint
  useEffect(() => {
    const fetchProductWithRelated = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get(
          `/api/product-details/${productId}`
        );

        const data = response.data;
        

        //  Set only relatedProducts
        setProducts(data.relatedProducts || []);
        setCurrentIndex(0); // Reset carousel index on product change
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch related products"
        );
        console.error("Fetch error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProductWithRelated();
  }, [productId]);
  
  // Update visible products
  useEffect(() => {
    const endIndex = Math.min(currentIndex + itemsPerPage, products.length);
    setVisibleProducts(products.slice(currentIndex, endIndex));
  }, [currentIndex, products]);

  const nextSlide = () => {
    if (currentIndex + itemsPerPage < products.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    } else {
      const lastPageStart = Math.max(
        0,
        products.length - (products.length % itemsPerPage || itemsPerPage)
      );
      setCurrentIndex(lastPageStart);
    }
  };

  if (loading) {
    return (
      <div className={`w-full py-8 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
            {title}
          </h2>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            <span className="ml-4 text-gray-600 text-lg">
              Loading related products...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`w-full py-8 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
            {title}
          </h2>
          <div className="text-center bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="text-red-500 text-lg mb-2">⚠️ {error}</div>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className={`w-full py-12 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800 relative">
          {title}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-red-500 rounded-full mt-2"></div>
        </h2>

        <div className="relative">
          {/* Navigation Buttons */}
          {products.length > itemsPerPage && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl p-3 rounded-full transition-all duration-300 hover:scale-110 border border-gray-200"
                aria-label="Previous products"
              >
                <FaChevronLeft className="text-gray-700 w-5 h-5" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl p-3 rounded-full transition-all duration-300 hover:scale-110 border border-gray-200"
                aria-label="Next products"
              >
                <FaChevronRight className="text-gray-700 w-5 h-5" />
              </button>
            </>
          )}

          {/* Product Grid */}
          <div
            className={`${
              products.length < 3
                ? "flex justify-center flex-wrap gap-6 mx-8 sm:mx-12"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-8 sm:mx-12"
            }`}
          >
            {visibleProducts.map((product) => (
              <div
                key={product._id}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <Link
                  href={`/shop/product/${product._id}`}
                  className="group block"
                >
                  <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
                    <ProductCard
                      images={
                        product.imagess && product.imagess.length > 0
                          ? [
                              product.imagess[0].startsWith("http")
                                ? product.imagess[0]
                                : (() => {
                                    const parts = product.imagess[0].split("/");
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
                      desc={product.description}
                      averageRating={product.averageRating} // or product.averageRating ?? undefined if unsure
                      title={product.name}
                      price={product.price}
                      discountPercentage={product.discountPercentage || 0}
                      className="shadow-none transition-transform duration-300 group-hover:scale-105"
                      product={product}
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          {products.length > itemsPerPage && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({
                length: Math.ceil(products.length / itemsPerPage),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * itemsPerPage)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / itemsPerPage) === index
                      ? "bg-red-500 w-6"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
