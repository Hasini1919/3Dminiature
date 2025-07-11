"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Slide from "./Slide";
import axios from "axios";

interface Advertisement {
  _id: string;
  img: string;
  title: string;
  mainTitle: string;
  price: string;
}

const Advertising = () => {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdvertisements = async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/ads");
      return response.data;
    } catch (error) {
      console.error("Error fetching advertisements:", error);
      throw error;
    }
  };

  useEffect(() => {
    const loadAdvertisements = async () => {
      try {
        const data = await fetchAdvertisements();
        setAds(data);
        setError(null);
      } catch (err) {
        setError("Failed to load advertisements");
      } finally {
        setLoading(false);
      }
    };

    loadAdvertisements();
  }, []);

  // Enhanced slider settings with custom styling
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    adaptiveHeight: false,
    fade: true,
    cssEase: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    dotsClass: "slick-dots custom-dots",
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  if (loading) {
    return (
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-50 via-pink-50 to-orange-50 animate-pulse"></div>
        <div className="container mx-auto px-4 py-16 flex justify-center items-center h-[600px] relative z-10">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent absolute inset-0"></div>
            </div>
            <div className="text-gray-600 font-medium">
              Loading amazing offers...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-8 text-center h-[600px] flex items-center justify-center">
          <div className="space-y-4">
            <div className="text-6xl">⚠️</div>
            <p className="text-yellow-800 font-medium text-lg">{error}</p>
            <p className="text-yellow-600">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-12 bg-gradient-to-br from-gray-50 via-white to-red-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Special Offers
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover amazing deals on premium 3D frames that bring your memories
            to life
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative max-w-7xl mx-auto">
          <div className="slider-container relative overflow-hidden rounded-3xl shadow-2xl">
            <Slider {...settings}>
              {ads.map((ad) => (
                <div key={ad._id} className="!h-[600px]">
                  <Slide
                    img={ad.img}
                    title={ad.title}
                    mainTitle={ad.mainTitle}
                    price={ad.price}
                    _id={ad._id}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {ads.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-red-400 to-pink-400 opacity-30"
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for slider dots */}
      <style jsx global>{`
        .custom-dots {
          bottom: -50px !important;
        }
        .custom-dots li button:before {
          color: #dc2626 !important;
          font-size: 12px !important;
          opacity: 0.5 !important;
        }
        .custom-dots li.slick-active button:before {
          opacity: 1 !important;
          color: #dc2626 !important;
        }
      `}</style>
    </div>
  );
};

// Custom Arrow Components
const CustomPrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 group"
  >
    <svg
      className="w-6 h-6 text-gray-700 group-hover:text-red-600 transition-colors"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>
);

const CustomNextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 group"
  >
    <svg
      className="w-6 h-6 text-gray-700 group-hover:text-red-600 transition-colors"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>
);

export default Advertising;
