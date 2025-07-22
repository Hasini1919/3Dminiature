"use client";
import { useState } from "react";
import Sidebar from "@/components/customer-account/Sidebar";

const Reviews = () => {
  const [activeTab, setActiveTab] = useState("toBeReviewed");

  return (
    <div className="flex min-h-screen p-5 gap-5">

      <Sidebar />

    
      <main className="flex-1 p-5 rounded-lg shadow-md bg-gray-50">
        <h1 className="text-2xl font-bold mb-5">My Reviews</h1>

       
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === "toBeReviewed"
                ? "border-b-4 border-orange-500 text-orange-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("toBeReviewed")}
          >
            To Be Reviewed
          </button>
          <button
            className={`px-4 py-2 font-semibold ml-5 ${
              activeTab === "history"
                ? "border-b-4 border-orange-500 text-orange-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>
        </div>

     
        <div className="flex flex-col items-center justify-center mt-10 h-96 text-center">
          {activeTab === "toBeReviewed" ? (
            <>
              <div className="text-4xl mb-3">🙂🙁</div>
              <p className="text-gray-600 text-lg">
                You don’t have any purchases to review
              </p>
            </>
          ) : (
            <>
              <div className="text-4xl mb-3">📝</div>
              <p className="text-gray-600 text-lg">
                You haven’t reviewed any purchases yet
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Reviews;
