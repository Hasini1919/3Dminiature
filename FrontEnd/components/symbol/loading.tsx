"use client";
import React from "react";
import { CgSpinner } from "react-icons/cg";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-red-50 via-white to-red-100">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-dashed border-red-400 animate-spin flex items-center justify-center">
            <CgSpinner className="text-3xl text-red-600 animate-pulse" />
          </div>
        </div>
        <p className="text-red-700 font-semibold text-lg animate-pulse">
          Preparing your order...
        </p>
      </div>
    </div>
  );
};

export default Loading;
