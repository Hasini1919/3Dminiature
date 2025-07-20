"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ImageCarouselProps {
  images: { imageUrl: string }[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) return null;

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="relative w-full h-[500px] rounded-xl flex overflow-hidden gap-9">
      {/* Left Text Content */}
      <div className="w-1/2 p-6 flex flex-col justify-center z-20">
        <h2 className="text-3xl  font-bold text-gray-800 mb-4 text-left">
          Discover Beautiful 3D Frames
          <br />
          <span className="text-red-600">Customize Your Perfect Frame</span>
        </h2>
        <p className="text-gray-600 mb-6 text-left">
          Browse our exclusive collection of elegant and creative 3D frames.
          Personalize your favorite moments with vibrant colors, sizes, and
          styles. Quality craftsmanship delivered right to your doorstep.
        </p>
        <div className="mt-10 flex items-start">
          <Link href="/shop">
            <button className="relative px-8 py-3 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-800 border border-orange-400 transition hover:scale-105 duration-300 ">
              <span className="z-10 relative">SHOP NOW</span>
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500 to-yellow-400 opacity-30 blur-md"></span>
            </button>
          </Link>
        </div>
      </div>

      {/* Right Image Carousel */}
      <div  className="w-[45%] relative h-[430px] flex rounded-xl  mt-5">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={img.imageUrl}
              alt={`Frame ${idx + 1}`}
              fill
              className="object-cover rounded-r-xl"
              priority={idx === currentIndex}
            />
          </div>
        ))}

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
          {["Custom Sizes", "Free Shipping", "High-Quality Prints"].map(
            (label, index) => (
              <button
                key={index}
                className="bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-800 text-xs px-3 py-1 rounded-full shadow-sm"
              >
                {label}
              </button>
            )
          )}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          aria-label="Previous Slide"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-60 z-30"
        >
          &#10094;
        </button>
        <button
          onClick={goToNext}
          aria-label="Next Slide"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-60 z-30"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
}

 