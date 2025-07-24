"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/services/api";
import { getAuthToken } from "@/utils/auth-utils/api";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { Star, Calendar, Package, MessageSquare } from "lucide-react";

interface Product {
  title: String;
  price: number;
  images: string[];
}

interface Review {
  _id: string;
  product: Product;
  rating: number;
  comment: string;
  images: string[];
  createdAt: string;
}

const ReviewHistory = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = getAuthToken();
        const res = await axiosInstance.get("/api/review-history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReviews(res.data);
      } catch (error) {
        toast.error("Failed to fetch review history");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const getImageUrl = (imagePath: string, type: "product" | "review") => {
    if (!imagePath) return "/default-product.jpg";

    // If it's already a full URL, return as-is
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // Remove any leading slashes to prevent double slashes in URL
    const cleanPath = imagePath.replace(/^\//, "");

    if (type === "product") {
      // Handle product images
      if (cleanPath.startsWith("uploads/")) {
        // If product image is in uploads directory
        return `${axiosInstance.defaults.baseURL}/${cleanPath}`;
      }
      const parts = cleanPath.split("/");
      if (parts.length === 2) {
        return `${axiosInstance.defaults.baseURL}/products/${parts[0]}/${parts[1]}`;
      }
      return `${axiosInstance.defaults.baseURL}/products/${cleanPath}`;
    }

    // For review images - prepend with /uploads
    // Check if path already includes uploads
    if (cleanPath.startsWith("uploads/")) {
      return `${axiosInstance.defaults.baseURL}/${cleanPath}`;
    }
    return `${axiosInstance.defaults.baseURL}/uploads/${cleanPath}`;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-6 bg-gray-300 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-16 bg-gray-300 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-red-400 to-red-600 rounded-xl shadow-lg">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              My Review History
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track all your product reviews and see how your feedback helps other
            customers make informed decisions.
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Reviews Yet
            </h3>
            <p className="text-gray-600 mb-6">
              You haven't submitted any reviews yet. Start shopping and share
              your experience!
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-400 to-red-600 text-white font-medium rounded-lg hover:from-red-500 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <Package className="w-4 h-4" />
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div
                key={review._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="p-6">
                  {/* Product Info */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative group">
                      {review.product.images?.length > 0 ? (
                        <Image
                          src={getImageUrl(review.product.images[0], "product")}
                          alt={`Product: ${review.product.title}`}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover shadow-md group-hover:shadow-lg transition-shadow duration-200"
                          unoptimized={true}
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center shadow-md">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-200"></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-gray-800 mb-1 truncate">
                        {review.product.title}
                      </h3>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-bold text-green-600">
                          LKR {review.product.price.toLocaleString()}
                        </span>
                        <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 rounded-full border border-yellow-200">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-yellow-700">
                            {review.rating}.0
                          </span>
                        </div>
                      </div>

                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 mb-3">
                        {renderStars(review.rating)}
                        <span className="ml-2 text-sm text-gray-500">
                          ({review.rating} out of 5)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Review Comment */}
                  <div className="mb-4">
                    <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-400">
                      <p className="text-gray-800 leading-relaxed">
                        "{review.comment}"
                      </p>
                    </div>
                  </div>

                  {/* Review Images */}
                  {review.images?.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        Review Photos ({review.images.length})
                      </h4>
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {review.images.map((img, idx) => (
                          <div
                            key={idx}
                            className="relative group flex-shrink-0"
                          >
                            <Image
                              src={getImageUrl(img, "review")}
                              alt={`Review image ${idx + 1} for ${
                                review.product.title
                              }`}
                              width={100}
                              height={100}
                              className="rounded-lg border-2 border-gray-200 object-cover shadow-sm group-hover:shadow-md transition-all duration-200 group-hover:border-blue-300"
                              unoptimized={true}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-200"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Review Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 pt-3 border-t border-gray-100">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Reviewed on{" "}
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ReviewHistory;