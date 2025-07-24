"use client";
import { useState } from "react";
import axiosInstance from "@/services/api";
import { getUserIdFromToken } from "@/utils/auth";
import toast from "react-hot-toast";

// AddReview Modal Component
const AddReview = ({
  productId,
  isOpen,
  onClose,
  onReviewAdded,
}: {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
  onReviewAdded: () => void;
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = getUserIdFromToken();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return toast.error("Login required");
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("user", userId);
    formData.append("product", productId);
    formData.append("rating", rating.toString());
    formData.append("comment", comment);

    if (images && images.length > 0) {
      Array.from(images).forEach((file) => formData.append("images", file));
    }

    try {
      await axiosInstance.post("/api/reviews/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Review added successfully!");
      // Reset form
      setRating(0);
      setComment("");
      setImages(null);
      onReviewAdded(); // Refresh reviews data
      onClose(); // Close modal after successful submission
    } catch (err) {
      console.error("Review error:", err);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearForm = () => {
    setRating(0);
    setComment("");
    setImages(null);
  };

  const handleCancel = () => {
    clearForm();
    onClose();
  };

  const StarRating = ({
    rating,
    onRatingChange,
  }: {
    rating: number;
    onRatingChange: (rating: number) => void;
  }) => {
    return (
      <div className="flex items-center justify-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={`text-4xl transition-all duration-300 hover:scale-125 transform focus:outline-none ${
              star <= rating
                ? "text-yellow-400 drop-shadow-lg"
                : "text-gray-300 hover:text-yellow-200"
            }`}
          >
            ★
          </button>
        ))}
        <span className="ml-4 text-lg text-gray-700 font-medium">
          {rating > 0 ? `${rating} out of 5 stars` : "Click to rate"}
        </span>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="max-w-3xl w-full mx-auto bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden transform transition-all duration-500 scale-100 animate-slideUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 px-6 py-4 relative">
          <button
            onClick={handleCancel}
            className="absolute top-3 right-4 text-red-100 hover:text-white transition-all duration-200 focus:outline-none hover:bg-red-500 hover:bg-opacity-30 rounded-full p-1"
          >
            <svg
              className="w-5 h-5"
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

          <div className="text-center">
            <h2 className="text-xl font-bold text-white mb-1">
              Share Your Experience
            </h2>
            <p className="text-red-100 text-sm">
              Help others by writing an honest review
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 max-h-[400px] overflow-y-auto"
        >
          {/* Rating Section */}
          <div className="space-y-3">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                How would you rate this product?
              </h3>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-red-50 p-4 rounded-xl border border-gray-200">
              <StarRating rating={rating} onRatingChange={setRating} />
            </div>
          </div>

          {/* Comment Section */}
          <div className="space-y-3">
            <div className="text-center mb-2">
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                Tell us about your experience
              </h3>
            </div>

            <div className="relative">
              <textarea
                id="comment"
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 resize-none bg-gray-50 focus:bg-white text-gray-800"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review here... What did you like about this product?"
                required
                maxLength={500}
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-500 bg-white px-2 py-1 rounded border">
                {comment.length}/500
              </div>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">
                Minimum 10 characters required
              </span>
              <span
                className={`font-medium ${
                  comment.length >= 10 ? "text-green-600" : "text-red-500"
                }`}
              >
                {comment.length >= 10
                  ? "✓ Valid"
                  : `${10 - comment.length} more needed`}
              </span>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-3">
            <div className="text-center">
              <h3 className="text-base font-bold text-gray-800 mb-1">
                Add Photos (Optional)
              </h3>
            </div>

            <div className="relative">
              <input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setImages(e.target.files)}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 file:cursor-pointer cursor-pointer border-2 border-dashed border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-gray-50 p-3 hover:bg-gray-100 transition-all duration-200"
              />

              {images && images.length > 0 && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-green-700 font-semibold">
                      {images.length} image{images.length > 1 ? "s" : ""}{" "}
                      selected
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
              <p className="text-xs text-blue-700">
                <strong>Photo Guidelines:</strong> Upload up to 5 clear photos.
                Max 5MB each. JPG, PNG formats supported.
              </p>
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={
                isSubmitting || rating === 0 || comment.trim().length < 10
              }
              className={`px-6 py-2 text-sm font-bold text-white rounded-lg transition-all duration-200 ${
                isSubmitting || rating === 0 || comment.trim().length < 10
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 shadow-md hover:shadow-lg"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Publishing...</span>
                </div>
              ) : (
                "Publish Review"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Write Review Section Component
const WriteReviewSection = ({
  productId,
  onReviewAdded,
}: {
  productId: string;
  onReviewAdded?: () => void;
}) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const openReviewModal = () => setIsReviewModalOpen(true);
  const closeReviewModal = () => setIsReviewModalOpen(false);

  const handleReviewAdded = () => {
    if (onReviewAdded) {
      onReviewAdded(); // Refresh parent component if callback provided
    }
    closeReviewModal();
  };

  return (
    <div className="w-full">
      {/* Write Review Section */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 via-red-700 to-red-500 px-6 py-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Write a Review
            </h2>
            <p className="text-gray-300">
              Share your thoughts and help others make informed decisions
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center">
            {/* Star Rating Display */}
            <div className="flex justify-center items-center space-x-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-3xl text-gray-300">
                  ★
                </span>
              ))}
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Share Your Experience
            </h3>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Your review helps other customers make informed purchasing
              decisions.
            </p>

            {/* Write Review Button */}
            <button
              onClick={openReviewModal}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-lg rounded-2xl hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-300 transform hover:scale-105 shadow-xl group"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Write Your Review
            </button>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <AddReview
        productId={productId}
        isOpen={isReviewModalOpen}
        onClose={closeReviewModal}
        onReviewAdded={handleReviewAdded}
      />

      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default WriteReviewSection;
