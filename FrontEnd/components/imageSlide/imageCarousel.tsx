"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";

interface ImageItem {
  _id: string;
  title: string;
  imageUrl: string;
}

interface Props {
  images: ImageItem[];
}

export default function ImageCarousel({ images }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);

  if (!Array.isArray(images) || images.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto my-4 text-center text-gray-500">
        No images to display.
      </div>
    );
  }

  const baseUrl = "http://localhost:5500/products";

  return (
    <div
      className="w-full max-w-md mx-auto my-4"
      onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
      onMouseLeave={() => swiperRef.current?.autoplay?.start()}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="rounded-lg overflow-hidden"
      >
        {images.map((item) => {
          // Ensure path starts with slash
           const cleanedPath = item.imageUrl; 
          const fullImageUrl = `${baseUrl}/${cleanedPath}`; 


          return (
            <SwiperSlide key={item._id}>
              <div className="relative w-full pb-[75%] bg-white">
                <Image
                  src={fullImageUrl}
                  alt={item.title}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  
                />
                <div className="absolute bottom-0 bg-black bg-opacity-50 w-full text-white text-center p-2">
                  {item.title}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
