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
  _id: string; // advertisement ID
  productId: string; // product ID
}

const getImageUrl = (img: string): string => {
  if (!img || img.trim() === "") {
    return "/placeholder-image.jpg";
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

  // Calculate discount percentage if original price is provided
  const discountPercentage = originalPrice
    ? Math.round(
        ((parseFloat(originalPrice.replace(/[^\d.]/g, "")) -
          parseFloat(price.replace(/[^\d.]/g, ""))) /
          parseFloat(originalPrice.replace(/[^\d.]/g, ""))) *
          100
      )
    : null;

  return (
    <div className="relative h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden ml-0 lg:ml-16 bg-gradient-to-br from-white via-red-50/10 to-gray-50/20">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-600/8 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-gray-400/6 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="relative h-full flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 gap-4 lg:gap-6">
        {/* Text Content Section - Optimized for 400px height */}
        <div className="w-full lg:w-[55%] space-y-2 md:space-y-3 text-center lg:text-left order-2 lg:order-1">
          {/* Compact Premium Badge */}
          <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold rounded-full shadow-lg">
            <svg
              className="w-3 h-3 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="tracking-wide">PREMIUM 3D FRAMES</span>
          </div>

          {/* Compact Main Title */}
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                {mainTitle.split(" ")[0]}
              </span>{" "}
              <span className="text-gray-900">
                {mainTitle.split(" ").slice(1).join(" ")}
              </span>
            </h2>
            <p className="text-xs md:text-sm text-gray-600 font-medium max-w-md mx-auto lg:mx-0">
              Premium quality miniature 3D frames
            </p>
          </div>

          {/* Compact Price Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/40 shadow-md">
            <p className="text-xs md:text-sm text-gray-700 font-semibold uppercase tracking-wide mb-1">
              🔥 Special Price
            </p>
            <div className="flex items-baseline justify-center lg:justify-start space-x-2 flex-wrap">
              <span className="text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                LKR {price}
              </span>
              {originalPrice && (
                <div className="flex items-center space-x-2">
                  <span className="text-base md:text-lg text-gray-500 line-through font-medium">
                    LKR {originalPrice}
                  </span>
                  {discountPercentage && (
                    <span className="bg-green-600 text-white px-2 py-1 rounded-md text-xs font-bold">
                      -{discountPercentage}%
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Compact Features with specified colors */}
          <div className="flex items-center justify-center lg:justify-start flex-wrap gap-2 md:gap-3 text-xs md:text-sm">
            {[
              { icon: "✨", text: "Premium Quality", color: "text-black" },
              { icon: "🚀", text: "Fast Delivery", color: "text-gray-700" },
              { icon: "🎨", text: "Custom Design", color: "text-red-600" },
              { icon: "💎", text: "Handcrafted", color: "text-gray-900" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 bg-white/40 backdrop-blur-sm px-2 py-1 rounded-full border border-white/30 shadow-sm"
              >
                <span className="text-sm">{feature.icon}</span>
                <span className={`font-semibold ${feature.color}`}>
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* Compact CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-3 pt-2">
            <button className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
              <span className="relative z-10 flex items-center justify-center space-x-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 8H19"
                  />
                </svg>
                <span>ORDER NOW</span>
              </span>
            </button>

            <Link href={`/shop/product/${productId}`}>
              <button className="group flex items-center justify-center space-x-1.5 text-gray-700 px-5 py-2.5 rounded-xl border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-300 text-sm font-semibold w-full sm:w-auto">
                <svg
                  className="w-4 h-4 group-hover:text-red-500 transition-colors"
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
                <span>VIEW DETAILS</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Optimized Image Section */}
        <div className="w-full lg:w-[45%] flex justify-center lg:justify-end order-1 lg:order-2 lg:ml-[-100px]">
          <div className="relative group">
            {/* Subtle Glow Effects */}
            <div className="absolute -inset-2 bg-gradient-to-r from-red-400/15 to-gray-400/15 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-all duration-500"></div>

            {/* Compact image container */}
            <div className="relative bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-sm rounded-2xl p-3 md:p-4 shadow-xl border border-white/50">
              <Link href={`/shop/product/${productId}`} className="block">
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-white p-2">
                  <Image
                    src={imageUrl}
                    alt={mainTitle}
                    width={800}
                    height={400}
                    className="rounded-lg object-cover w-full h-auto max-w-[230px] sm:max-w-[270px] md:max-w-[310px] lg:max-w-[330px] mx-auto transform group-hover:scale-105 transition-all duration-500 ease-out"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "/default-product.jpg";
                    }}
                    priority
                  />
                </div>
              </Link>

              {/* Compact discount badge */}
              {discountPercentage && (
                <div className="absolute -top-2 -right-2">
                  <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-bold shadow-lg border-2 border-white text-xs md:text-sm">
                    -{discountPercentage}%
                  </div>
                </div>
              )}

              {/* Compact New Badge */}
              <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-md">
                NEW
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle floating decorative elements */}
      <div className="absolute top-12 left-12 w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce opacity-50"></div>
      <div className="absolute bottom-16 right-16 w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-300 opacity-40"></div>
      <div className="absolute top-1/2 left-6 w-1 h-1 bg-red-300 rounded-full animate-pulse opacity-30"></div>

      {/* Main content container */}
      <div className="relative bg-white/90 backdrop-blur-sm rounded-xl p-3 md:p-4 lg:p-6 shadow-xl border border-white/30">
        <Link href={`/shop/product/${productId}`}>
          <Image
            src={imageUrl}
            alt={mainTitle}
            width={400}
            height={400}
            className="rounded-lg object-cover w-full h-auto max-w-[280px] md:max-w-[320px] lg:max-w-[380px] mx-auto transform group-hover:scale-105 transition-transform duration-500 ease-out"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/default-product.jpg";
            }}
          />
        </Link>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>

        {/* Enhanced discount badge */}
        {discountPercentage && (
          <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4">
            <div className="relative">
              <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center font-black shadow-xl border-4 border-white">
                <div className="text-center">
                  <div className="text-xs md:text-sm leading-none">
                    -{discountPercentage}%
                  </div>
                  <div className="text-xs leading-none opacity-90">OFF</div>
                </div>
              </div>
              <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-30"></div>
            </div>
          </div>
        )}

        {/* New Badge */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          ✨ NEW
        </div>

        {/* Enhanced floating elements */}
        <div className="absolute top-8 -left-2 w-3 h-3 bg-red-400 rounded-full animate-bounce opacity-70 shadow-lg"></div>
        <div className="absolute bottom-12 -right-2 w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300 opacity-60 shadow-lg"></div>
        <div className="absolute top-1/2 -left-4 w-2 h-2 bg-red-300 rounded-full animate-pulse opacity-50 shadow-lg"></div>
        <div className="absolute top-16 right-8 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping opacity-40"></div>
      </div>

      {/* Enhanced floating decorative elements */}
      <div className="absolute top-16 left-16 w-2 h-2 bg-red-400 rounded-full animate-bounce opacity-60 shadow-lg"></div>
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300 opacity-50 shadow-lg"></div>
      <div className="absolute top-1/2 left-8 w-1.5 h-1.5 bg-red-300 rounded-full animate-pulse opacity-40 shadow-lg"></div>
      <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-red-500 rounded-full animate-ping opacity-30"></div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 pointer-events-none"></div>
    </div>
  );
};

export default Slide;
