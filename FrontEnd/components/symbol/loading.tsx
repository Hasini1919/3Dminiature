"use client";
import React from "react";
import { CgSpinner } from "react-icons/cg";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-[80vh] bg-white">
      <div className="flex flex-col items-center space-y-4">
      <CgSpinner className="animate-spin text-5xl" />
      </div>
    </div>
  );
};

export default loading;
