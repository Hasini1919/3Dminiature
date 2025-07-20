"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/services/api";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaUser,
  FaCalendarAlt,
  FaImages,
} from "react-icons/fa";

interface ProductReview {
  _id: string;
  user: {
    name: string;
  };
  rating: number;
  comment: string;
  images: string[];
  createdAt: string;
}

const ProductReviews = ({ productId }: { productId: string }) => {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(1); // Show 1 review initially

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get(
          `/api/reviews/product/${productId}`
        );
        setReviews(res.data as ProductReview[]);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  const ratingCount = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const sizeClasses = {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    };

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar
          key={`full-${i}`}
          className={`${sizeClasses[size]} text-yellow-400`}
        />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt
          key="half"
          className={`${sizeClasses[size]} text-yellow-400`}
        />
      );
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStar
          key={`empty-${i}`}
          className={`${sizeClasses[size]} text-gray-300`}
        />
      );
    }

    return stars;
  };

  const displayedReviews = showAllReviews
    ? reviews
    : reviews.slice(0, visibleReviews);
  const hasMoreReviews = reviews.length > visibleReviews;

  const handleShowMore = () => {
    setShowAllReviews(true);
  };

  const handleShowLess = () => {
    setShowAllReviews(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="mt-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 h-32 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">
          Customer Reviews
        </h3>
        <p className="text-gray-600">
          {reviews.length === 0
            ? "No reviews yet. Be the first to review this product!"
            : `Based on ${reviews.length} review${
                reviews.length > 1 ? "s" : ""
              }`}
        </p>
      </div>

      {reviews.length > 0 && (
        <>
          {/* Rating Summary */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Average Rating */}
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-3">
                  <span className="text-5xl font-bold text-gray-900">
                    {averageRating.toFixed(1)}
                  </span>
                  <div className="text-left">
                    <div className="flex space-x-1 mb-1">
                      {renderStars(averageRating, "lg")}
                    </div>
                    <p className="text-sm text-gray-600">out of 5 stars</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  Average rating from {reviews.length} customer
                  {reviews.length > 1 ? "s" : ""}
                </p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {ratingCount.map(({ star, count }) => {
                  const percent = (count / (reviews.length || 1)) * 100;
                  return (
                    <div key={star} className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1 w-12 text-sm font-medium">
                        <span>{star}</span>
                        <FaStar className="w-3 h-3 text-yellow-400" />
                      </span>
                      <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8 text-right font-medium">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Reviews List with Controlled Height */}
          <div
            className={`${
              showAllReviews ? "max-h-96 overflow-y-auto" : ""
            } space-y-6`}
          >
            {displayedReviews.map((review) => (
              <div
                key={review._id}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {getInitials(review.user.name)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">
                        {review.user.name}
                      </h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <FaCalendarAlt className="w-3 h-3" />
                        <span>{formatDate(review.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-1 rounded-full">
                    <div className="flex space-x-1">
                      {renderStars(review.rating, "sm")}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {review.rating}.0
                    </span>
                  </div>
                </div>

                {/* Review Content */}
                <p className="text-gray-700 leading-relaxed mb-4">
                  {review.comment}
                </p>

                {/* Review Images */}
                {review.images && review.images.length > 0 && (
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <FaImages className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 font-medium">
                        Customer Photos ({review.images.length})
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {review.images.map((img, i) => (
                        <div
                          key={i}
                          className="relative group cursor-pointer"
                          onClick={() =>
                            setSelectedImage(
                              `${axiosInstance.defaults.baseURL}${img}`
                            )
                          }
                        >
                          <img
                            src={`${axiosInstance.defaults.baseURL}${img}`}
                            alt={`Review image ${i + 1}`}
                            className="w-full h-20 sm:h-24 object-cover rounded-lg border border-gray-200 group-hover:opacity-75 transition-opacity duration-200"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-200" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Show More/Less Buttons */}
          <div className="flex justify-center mt-8">
            {!showAllReviews && hasMoreReviews && (
              <button
                onClick={handleShowMore}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <span>Show More Reviews</span>
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                  +{reviews.length - visibleReviews}
                </span>
              </button>
            )}

            {showAllReviews && (
              <button
                onClick={handleShowLess}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Show Less Reviews
              </button>
            )}
          </div>
        </>
      )}

      {/* Empty State */}
      {reviews.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FaStar className="w-12 h-12 text-gray-400" />
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            No Reviews Yet
          </h4>
          <p className="text-gray-600 max-w-md mx-auto">
            Be the first to share your experience with this product. Your review
            helps other customers make informed decisions.
          </p>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt="Review image"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
            >
              <svg
                className="w-6 h-6"
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
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
