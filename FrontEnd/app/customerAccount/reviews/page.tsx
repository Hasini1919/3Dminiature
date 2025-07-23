"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/customer-account/Sidebar";
import axiosInstance from "@/services/api";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaCalendarAlt,
} from "react-icons/fa";

interface Review {
  _id: string;
  user: {
    name: string;
  };
  product: {
    name: string;
    image: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

const ReviewsPage = () => {
  const [activeTab, setActiveTab] = useState<"toBeReviewed" | "history">("toBeReviewed");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "history") {
      setLoading(true);
      axiosInstance
        .get("/api/reviews/my-reviews") // assumes you're fetching logged-in user's reviews
        .then((res) => setReviews(res.data))
        .catch((err) => console.error("Error fetching user reviews:", err))
        .finally(() => setLoading(false));
    }
  }, [activeTab]);

  const renderStars = (rating: number) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    for (let i = 0; i < full; i++) stars.push(<FaStar key={`f-${i}`} className="text-yellow-400" />);
    if (half) stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    for (let i = 0; i < empty; i++) stars.push(<FaRegStar key={`e-${i}`} className="text-gray-300" />);
    return stars;
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 p-5 gap-5">
      <Sidebar />
      <main className="flex-1 p-5 rounded-lg shadow-md bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white">My Reviews</h1>

        <div className="flex border-b border-gray-200 dark:border-gray-600 mb-6">
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === "toBeReviewed"
                ? "border-b-4 border-orange-500 text-orange-500"
                : "text-gray-500 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("toBeReviewed")}
          >
            To Be Reviewed
          </button>
          <button
            className={`px-4 py-2 font-semibold ml-5 ${
              activeTab === "history"
                ? "border-b-4 border-orange-500 text-orange-500"
                : "text-gray-500 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>
        </div>

        {activeTab === "toBeReviewed" && (
          <div className="flex flex-col items-center justify-center mt-10 h-96 text-center text-gray-600 dark:text-gray-400">
            <div className="text-4xl mb-3">🙂🙁</div>
            <p>You don’t have any purchases to review</p>
          </div>
        )}

        {activeTab === "history" && (
          <div>
            {loading ? (
              <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
            ) : reviews.length === 0 ? (
              <div className="flex flex-col items-center justify-center mt-10 h-96 text-center text-gray-600 dark:text-gray-400">
                <div className="text-4xl mb-3">📝</div>
                <p>You haven’t reviewed any purchases yet</p>
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm bg-white dark:bg-gray-800"
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <img
                        src={review.product.image}
                        alt={review.product.name}
                        className="w-16 h-16 rounded-md object-cover border"
                      />
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                          {review.product.name}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                          <FaCalendarAlt className="w-3 h-3" />
                          <span>{formatDate(review.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      {renderStars(review.rating)}
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {review.rating.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-200">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ReviewsPage;
