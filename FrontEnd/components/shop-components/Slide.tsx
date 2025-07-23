import React from "react";
import Image from "next/image";
import axiosInstance from "@/services/api";
import Link from "next/link";

interface PropsType {
  img: string;
  title: string;
  mainTitle: string;
  price: string;
  originalPrice?: string;
  _id: string;
  productId: string;
}

const getImageUrl = (img: string): string => {
  if (!img || img.trim() === "") {
    return "default-product/.jpg";
  }

  const cleanImage = img.replace(/^\/+/, "");
  return `${axiosInstance.defaults.baseURL}/products/${cleanImage}`;
};

const Slide: React.FC<PropsType> = ({
  img,
  title,
  mainTitle,
  price,
  originalPrice,
  _id,
  productId,
}) => {
  const imageUrl = getImageUrl(img);

  const discountPercentage = originalPrice
    ? Math.round(
        ((parseFloat(originalPrice.replace(/[^\d.]/g, "")) -
          parseFloat(price.replace(/[^\d.]/g, ""))) /
          parseFloat(originalPrice.replace(/[^\d.]/g, ""))) *
          100
      )
    : null;

  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden bg-gradient-to-br from-gray-900 via-black to-red-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-600/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gray-600/20 rounded-full blur-xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-red-500/15 rounded-full blur-lg animate-bounce animation-delay-2000"></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>

      <div className="relative h-full flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-6 md:py-8">
        {/* Content Section */}
        <div className="w-full md:w-[55%] flex flex-col justify-center space-y-4 md:space-y-6 text-center md:text-left">
          {/* Premium Badge */}
          <div className="inline-flex items-center justify-center md:justify-start">
            <div className="flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs md:text-sm font-bold rounded-full shadow-lg transform hover:scale-105 transition-transform">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Premium {title}
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight">
            <span className="block text-red-400 drop-shadow-lg">
              {mainTitle.split(" ")[0]}
            </span>
            <span className="block bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent drop-shadow-sm">
              {mainTitle.split(" ").slice(1).join(" ")}
            </span>
          </h1>

          {/* Price Section */}
          <div className="space-y-2">
            <p className="text-sm md:text-base text-red-300 font-semibold uppercase tracking-wider">
              Special Offer
            </p>
            <div className="flex items-baseline justify-center md:justify-start space-x-3 flex-wrap">
              <span className="text-3xl md:text-4xl lg:text-5xl font-black text-white drop-shadow-lg">
                LKR {price}
              </span>
              {originalPrice && (
                <>
                  <span className="text-lg md:text-xl text-gray-300 line-through opacity-80">
                    LKR {originalPrice}
                  </span>
                  {discountPercentage && (
                    <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm md:text-base font-bold shadow-lg animate-pulse">
                      SAVE {discountPercentage}%
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="hidden md:flex items-center justify-center md:justify-start flex-wrap gap-4 text-sm text-gray-300">
            {["✨ Premium Quality", "🚀 Fast Delivery", "🎨 Custom Design"].map(
              (feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-gray-600"
                >
                  <span>{feature}</span>
                </div>
              )
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
            {/* Primary CTA - Customize */}
            <Link href={`/shop/product/${productId}`}>
              <button className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-base md:text-lg shadow-2xl transform hover:scale-105 hover:shadow-3xl transition-all duration-300 hover:from-red-700 hover:to-red-800">
                {/* Button Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>

                <span className="relative z-10 flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 001-1z"
                    />
                  </svg>
                  <span>CUSTOMIZE NOW</span>
                </span>
              </button>
            </Link>
            {/* Secondary CTA - View Details */}
            <Link href={`/shop/product/${productId}`}>
              <button className="group flex items-center space-x-3 text-white px-6 py-4 md:px-8 md:py-5 rounded-2xl border-2 border-gray-500 hover:border-gray-400 hover:bg-gray-800/30 backdrop-blur-sm transition-all duration-300 text-base md:text-lg font-semibold">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span>View Details</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-[45%] flex justify-center mt-6 md:mt-0">
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-red-600/30 via-gray-500/30 to-black/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"></div>

            {/* Main Image Container */}
            <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-2xl border border-white/40">
              <Link href={`/shop/product/${productId}`}>
                <Image
                  src={imageUrl}
                  alt={mainTitle}
                  width={400}
                  height={400}
                  className="rounded-xl object-cover w-full h-auto max-w-[240px] md:max-w-[300px] lg:max-w-[350px] mx-auto transform group-hover:scale-110 group-hover:rotate-2 transition-all duration-500 ease-out"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "/default-product.jpg";
                  }}
                />
              </Link>

              {/* Floating Discount Badge */}
              {discountPercentage && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center font-black shadow-lg text-sm md:text-base animate-bounce">
                  -{discountPercentage}%
                </div>
              )}

              {/* 3D Frame Badge */}
              <div className="absolute -bottom-2 -left-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full px-3 py-2 md:px-4 md:py-2 font-bold shadow-lg text-xs md:text-sm">
                🎨 3D Frame
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-20 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-70"></div>
      <div className="absolute bottom-24 right-24 w-2 h-2 bg-gray-400 rounded-full animate-ping animation-delay-1000 opacity-70"></div>
      <div className="absolute top-1/2 left-12 w-2 h-2 bg-red-400 rounded-full animate-pulse opacity-50"></div>
    </div>
  );
};

export default Slide;