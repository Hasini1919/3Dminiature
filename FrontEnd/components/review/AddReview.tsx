"use client";
import { useState } from "react";
import axiosInstance from "@/services/api";
import { getUserIdFromToken } from "@/utils/auth";

const AddReview = ({ productId }: { productId: string }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = getUserIdFromToken();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return alert("Login required");

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
      alert("Review added!");
      // Reset form
      setRating(0);
      setComment("");
      setImages(null);
    } catch (err) {
      console.error("Review error:", err);
      alert("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({
    rating,
    onRatingChange,
  }: {
    rating: number;
    onRatingChange: (rating: number) => void;
  }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={`text-2xl transition-colors duration-200 hover:scale-110 transform ${
              star <= rating
                ? "text-yellow-400"
                : "text-gray-300 hover:text-yellow-200"
            }`}
          >
            ★
          </button>
        ))}
        <span className="ml-3 text-sm text-gray-600">
          {rating > 0 ? `${rating} out of 5 stars` : "Select a rating"}
        </span>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
        <h2 className="text-xl font-semibold text-white">Write a Review</h2>
        <p className="text-red-100 text-sm mt-1">
          Share your experience with this product
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Rating Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Your Rating <span className="text-red-600">*</span>
          </label>
          <StarRating rating={rating} onRatingChange={setRating} />
        </div>

        {/* Comment Section */}
        <div className="space-y-2">
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700"
          >
            Review Comment <span className="text-red-600">*</span>
          </label>
          <textarea
            id="comment"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 resize-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell others about your experience with this product..."
            required
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Minimum 10 characters</span>
            <span className="text-xs text-gray-500">{comment.length}/500</span>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="space-y-2">
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700"
          >
            Add Photos (Optional)
          </label>
          <div className="relative">
            <input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages(e.target.files)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-700 hover:file:bg-red-100 file:cursor-pointer cursor-pointer border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            {images && images.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                {images.length} image{images.length > 1 ? "s" : ""} selected
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500">
            Upload up to 5 photos. Max 5MB each.
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => {
              setRating(0);
              setComment("");
              setImages(null);
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
          >
            Clear
          </button>
          <button
            type="submit"
            disabled={
              isSubmitting || rating === 0 || comment.trim().length < 10
            }
            className={`px-6 py-2 text-sm font-medium text-white rounded-md transition-all duration-200 ${
              isSubmitting || rating === 0 || comment.trim().length < 10
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform hover:scale-105"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting...</span>
              </div>
            ) : (
              "Submit Review"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
