"use client";

import Sidebar from "@/components/customer-account/Sidebar";
import ReviewHistory from "@/components/review/ReviewHistory";

export default function CustomerReviewsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - 30% */}
      <aside className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/5 border-r border-gray-200 bg-white shadow-md">
        <Sidebar />
      </aside>

      {/* Review History - 70% */}
      <main className="w-full sm:w-2/3 md:w-3/4 lg:w-4/5 xl:w-4/5 p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">My Reviews</h1>
        <ReviewHistory />
      </main>
    </div>
  );
}