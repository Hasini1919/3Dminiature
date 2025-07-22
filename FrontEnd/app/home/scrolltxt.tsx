"use client";
import Image from "next/image";

export default function Scroller() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-24 p-3 ">
      <div  className="flex  gap-16 items-center justify-between ">
        <div className=" p-8 rounded-2xl  bg-[#ffffff]">
          <h2 className="text-3xl  font-bold  mb-4 text-gray-600">
            CUSTOMIZE THE  PERFECT FRAME FOR EVERY MEMORY
          </h2>

          <p className="text-gray-700 mb-6">
            Elevate your space with custom 3D photo frames from Tiny Treasure!
            Whether you're celebrating a special occasion or cherishing everyday
            moments, our handcrafted frames bring your memories to life with
            style and depth.
          </p>
          <button className="px-6 py-3 bg-red-700 text-white font-semibold rounded-md shadow hover:bg-red-800 border border-orange-400 transition">
            LEARN MORE
          </button>
        </div>

      
      </div>

      {/* RIGHT SECTION: One Large Image */}
      <div className="flex justify-center items-start">
  <div className="relative w-full h-[510px] rounded-xl overflow-hidden shadow-xl">
    <Image
      src="/Frontend.png"
      alt="Main Style"
      fill // this replaces layout="fill"
      className="object-cover" // replaces objectFit="cover"
      sizes="100vw" // optional but improves performance
      priority // optional: improves loading speed for important images
    />
  </div>
</div>

    </div>
  );
}
