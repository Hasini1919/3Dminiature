import React from "react";
import Image from "next/image";

interface PropsType {
  img: string;
  title: string;
  mainTitle: string;
  price: string;
  _id: string;
}

const Slide: React.FC<PropsType> = ({ img, title, mainTitle, price, _id }) => {
  const cleanImage = img.replace(/^\/+|products\//g, "");
  const imageUrl = `http://localhost:5500/products/${cleanImage}`;

  return (
    <div className="relative h-[600px] overflow-hidden bg-gradient-to-br from-white via-red-50 to-pink-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-repeat"></div>
      </div>

      <div className="relative h-full flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-8 py-12">
        {/* Text Content */}
        <div className="w-full lg:w-[55%] space-y-8 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-lg">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clipRule="evenodd"
              />
            </svg>
            {title}
          </div>

          {/* Main Title */}
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
            <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              {mainTitle.split(" ")[0]}
            </span>{" "}
            <span className="text-gray-900">
              {mainTitle.split(" ").slice(1).join(" ")}
            </span>
          </h2>

          {/* Price */}
          <div className="space-y-2">
            <p className="text-lg text-gray-600 font-medium">Starting at</p>
            <div className="flex items-baseline justify-center lg:justify-start space-x-2">
              <span className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {price}
              </span>
              <span className="text-lg text-gray-500 line-through">$199</span>
            </div>
          </div>

          {/* Features */}
          <div className="hidden lg:flex items-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>30-Day Return</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Premium Quality</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <span className="relative z-10 flex items-center space-x-2">
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 8H19"
                  />
                </svg>
                <span>Add to Cart</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button className="group flex items-center space-x-2 text-gray-700 px-6 py-4 rounded-xl border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-300">
              <svg
                className="w-5 h-5 group-hover:text-red-500 transition-colors"
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
          </div>
        </div>

        {/* Image */}
        <div className="w-full lg:w-[45%] flex justify-center lg:justify-end mt-8 lg:mt-0">
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-red-400 to-pink-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>

            {/* Main image container */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
              <Image
                src={imageUrl}
                alt={mainTitle}
                width={500}
                height={500}
                className="rounded-xl object-cover w-full h-auto max-w-md mx-auto transform group-hover:scale-105 transition-transform duration-500 ease-out"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/default-product.jpg";
                }}
              />

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-lg">
                NEW
              </div>

              <div className="absolute -bottom-4 -left-4 bg-green-500 text-white rounded-full px-4 py-2 font-semibold shadow-lg">
                25% OFF
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-red-400 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute bottom-32 right-32 w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-300 opacity-60"></div>
      <div className="absolute top-1/2 left-10 w-2 h-2 bg-red-300 rounded-full animate-pulse opacity-40"></div>
    </div>
  );
};

export default Slide;
