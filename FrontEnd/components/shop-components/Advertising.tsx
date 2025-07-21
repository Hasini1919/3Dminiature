"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Slide from "./Slide";
import axiosInstance from "@/services/api";

interface Product {
  _id: string;
  name: string;
  price: number;
  images?: string[];
}

interface Advertisement {
  _id: string;
  img: string;
  title: string;
  mainTitle: string;
  discountPercentage: number;
  product: Product | string; // Can be populated object or just ID string
  isActive?: boolean;
}

function getProductId(product: Product | string): string {
  return typeof product === "string" ? product : product._id;
}

const Advertising = () => {
  const [ads, setAds] = useState<
    (Advertisement & {
      price: string;
      originalPrice?: string;
      productId: string;
    })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdvertisements = async () => {
    try {
      const response = await axiosInstance.get("/api/ads");
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

        // Process the ads data
        const processedAds = data
          .map((ad: Advertisement) => {
            // Get the product ID whether product is populated or just an ID
            const productId =
              typeof ad.product === "string" ? ad.product : ad.product?._id;

            if (!productId) {
              console.warn("Advertisement has no product:", ad._id);
              return null;
            }

            // Calculate prices
            const productPrice =
              typeof ad.product === "object" ? ad.product.price : 0;
            const price = (
              productPrice *
              (1 - ad.discountPercentage / 100)
            ).toFixed(2);
            const originalPrice =
              ad.discountPercentage > 0 ? productPrice.toFixed(2) : undefined;

            return {
              ...ad,
              price,
              originalPrice,
              productId,
            };
          })
          .filter((ad: Advertisement) => ad !== null); // Filter out any invalid ads

        setAds(processedAds);
        setError(null);
      } catch (err) {
        setError("Failed to load advertisements");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAdvertisements();
  }, []);

  // Enhanced slider settings for advertisement banner
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    arrows: true,
    adaptiveHeight: false,
    fade: true,
    cssEase: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    dotsClass: "slick-dots custom-dots",
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
          autoplaySpeed: 4000,
        },
      },
    ],
  };

  if (loading) {
    return (
      <div className="relative overflow-hidden h-[300px] md:h-[350px] lg:h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-white to-gray-50/80 animate-pulse"></div>
        <div className="container mx-auto px-4 h-full flex justify-center items-center relative z-10">
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200"></div>
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-red-600 border-t-transparent absolute inset-0"></div>
            </div>
            <div className="text-gray-700 font-semibold text-sm animate-pulse">
              Loading Premium 3D Frames...
            </div>
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 h-[300px] md:h-[350px] lg:h-[400px]">
        <div className="bg-gradient-to-br from-gray-50 to-red-50/30 border-2 border-red-200/50 rounded-2xl p-6 text-center h-full flex items-center justify-center shadow-lg">
          <div className="space-y-3">
            <div className="text-4xl animate-bounce">⚠️</div>
            <p className="text-red-700 font-semibold text-base">{error}</p>
            <p className="text-gray-600 text-sm">
              Please refresh to view our latest 3D frame offers
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 font-medium text-sm"
            >
              Refresh Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-white via-gray-50/30 to-red-50/40 overflow-hidden">
      {/* Enhanced Background decorative elements */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-8 left-8 w-32 h-32 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-8 right-8 w-40 h-40 bg-gray-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-red-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-1 h-1 bg-red-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-gray-400 rounded-full animate-float-delay opacity-40"></div>
        <div className="absolute bottom-32 left-16 w-1 h-1 bg-red-300 rounded-full animate-float-slow opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-2 ">
        {/* Slider Container */}
        <div className="relative max-w-7xl mx-auto ">
          <div className="slider-container relative overflow-hidden rounded-3xl shadow-2xl border-2 border-white/30 backdrop-blur-sm">
            <Slider {...settings}>
              {ads.map((ad) => (
                <div
                  key={ad._id}
                  className="!h-[300px] md:!h-[350px] lg:!h-[400px]"
                >
                  <Slide
                    img={ad.img}
                    title={ad.title}
                    mainTitle={ad.mainTitle}
                    price={ad.price}
                    originalPrice={ad.originalPrice}
                    _id={ad._id}
                    productId={getProductId(ad.product)}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      {/* Enhanced Custom CSS for slider dots and animations */}
      <style jsx global>{`
        .custom-dots {
          bottom: 20px !important;
          z-index: 30;
          text-align: center;
        }
        .custom-dots li {
          margin: 0 3px;
        }
        .custom-dots li button:before {
          color: rgba(220, 38, 38, 0.8) !important;
          font-size: 10px !important;
          opacity: 0.7 !important;
          transition: all 0.3s ease !important;
        }
        .custom-dots li.slick-active button:before {
          opacity: 1 !important;
          color: #dc2626 !important;
          transform: scale(1.4);
        }
        .custom-dots li:hover button:before {
          opacity: 0.9 !important;
          transform: scale(1.2);
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes float-delay {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 4s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// Enhanced Custom Arrow Components
const CustomPrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 bg-white/95 hover:bg-white shadow-xl rounded-full p-3 md:p-4 transition-all duration-300 hover:scale-110 group border-2 border-gray-100 hover:border-red-200 backdrop-blur-sm"
  >
    <svg
      className="w-4 h-4 md:w-5 md:h-5 text-gray-700 group-hover:text-red-600 transition-colors duration-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>
);

const CustomNextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 bg-white/95 hover:bg-white shadow-xl rounded-full p-3 md:p-4 transition-all duration-300 hover:scale-110 group border-2 border-gray-100 hover:border-red-200 backdrop-blur-sm"
  >
    <svg
      className="w-4 h-4 md:w-5 md:h-5 text-gray-700 group-hover:text-red-600 transition-colors duration-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>
);

export default Advertising;
