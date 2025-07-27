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
  product: Product | string;
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

        const processedAds = data
          .map((ad: Advertisement) => {
            const productId =
              typeof ad.product === "string" ? ad.product : ad.product?._id;

            if (!productId) {
              console.warn("Advertisement has no product:", ad._id);
              return null;
            }

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
          .filter((ad: Advertisement) => ad !== null);

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

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
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
      <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] bg-gradient-to-br from-gray-100 via-white to-gray-50">
        <div className="container mx-auto px-4 h-full flex justify-center items-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200"></div>
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent absolute inset-0"></div>
            </div>
            <div className="text-gray-700 font-semibold text-sm">
              Loading Amazing Deals...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] bg-gradient-to-br from-gray-50 via-white to-red-50">
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="text-5xl animate-bounce">🎯</div>
            <p className="text-red-600 font-semibold text-lg">{error}</p>
            <p className="text-gray-600 text-sm">
              Please refresh to see our latest offers
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white overflow-hidden">
      <div className="container mx-auto px-0">
        <div className="slider-container w-full">
          <Slider {...settings}>
            {ads.map((ad) => (
              <div key={ad._id}>
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

      <style jsx global>{`
        .custom-dots {
          bottom: 20px !important;
          z-index: 20;
        }
        .custom-dots li {
          margin: 0 4px;
        }
        .custom-dots li button:before {
          color: rgba(255, 255, 255, 0.8) !important;
          font-size: 12px !important;
          opacity: 0.6 !important;
          transition: all 0.3s ease !important;
        }
        .custom-dots li.slick-active button:before {
          opacity: 1 !important;
          color: #ffffff !important;
          transform: scale(1.3);
        }
        .slider-container .slick-slide > div {
          height: 100%;
        }
      `}</style>
    </div>
  );
};

// Custom Arrow Components
const CustomPrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 group border border-gray-200"
  >
    <svg
      className="w-5 h-5 text-gray-700 group-hover:text-red-600 transition-colors"
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
    className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 group border border-gray-200"
  >
    <svg
      className="w-5 h-5 text-gray-700 group-hover:text-red-600 transition-colors"
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
