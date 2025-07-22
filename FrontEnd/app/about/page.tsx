"use client";

import Image from "next/image";
import Subscribe from "@/components/footer/subscribe";
import Pdf from "@/components/pdf/pdf";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export default function About() {
  return (
    <>
      <Header />

      {/* --- Our Story --- */}
      <section className="relative max-w-5xl mx-auto bg-gray-500 rounded-3xl mt-20 px-6 py-12 shadow-lg">
        <h4 className="absolute top-0 right-0 transform -translate-y-1/3 -mt-4 bg-red-600 text-white p-3 rounded shadow-lg text-xl">
          ABOUT TINY TREASURES
        </h4>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-64 h-64 rounded-full overflow-hidden shadow-lg">
            <Image
              src="/IMG-20250309-WA0009.jpg"
              alt="About Us"
              width={256}
              height={256}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="max-w-xl">
            <h3 className="text-3xl font-bold text-white mb-4">Our Story</h3>
            <p className="text-white leading-relaxed">
              Our specialty at Tiny Treasures is customisation, showcased through our unique 3D shadow boxes.
              As a Sri Lankan company founded in 2024, we focus on handcrafted gifts that celebrate life's milestones like birthdays and baby showers.
              Each piece is meticulously crafted to ensure no two are alike, helping you create gifts that reflect your loved ones’ personalities.
            </p>
          </div>
        </div>
      </section>

      {/* --- Our Commitment --- */}
      <section className="relative max-w-5xl mx-auto bg-gray-500 rounded-3xl mt-20 px-6 py-12 shadow-lg overflow-visible">
        <div className="flex flex-col lg:flex-row items-center gap-10 relative">
          <div className="max-w-xl z-10">
            <h3 className="text-3xl font-bold text-white mb-4">Our Commitment to Quality</h3>
            <p className="text-white leading-relaxed">
              Every element of our work reflects our commitment to excellence. Using eco-friendly materials and advanced crafting methods,
              we create shadow boxes that are both elegant and memorable. Studies show personalized gifts are 30% more cherished than generic ones.
              That’s why we encourage customization — so every gift feels as special as the occasion.
            </p>
          </div>

          <div className="hidden lg:block absolute right-[-100px] top-1/2 transform -translate-y-1/2">
            <div className="w-72 h-72 rounded-full overflow-hidden shadow-lg">
              <Image
                src="/IMG-20250309-WA0008.jpg"
                alt="Quality"
                width={288}
                height={288}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- Why Choose Us --- */}
      <section className="max-w-6xl mx-auto mt-32 px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-3/4">
            <h3 className="text-2xl font-bold text-black border-b-2 border-black inline-block mb-4">
              Why choose us?
            </h3>
            <div className="space-y-6 text-lg text-gray-800">
              <p>
                At Tiny Treasures, we bring your cherished memories to life with beautifully crafted 3D frames.
                Our innovative designs and commitment to quality make every frame a timeless keepsake.
              </p>

              <h4 className="font-bold text-xl">Unmatched Personalization</h4>
              <p>Create frames that reflect your unique style and memories.</p>

              <h4 className="font-bold text-xl">Exceptional Quality</h4>
              <p>Crafted with premium materials, each frame leaves a lasting impression.</p>

              <h4 className="font-bold text-xl">Dedicated Customer Support</h4>
              <p>Our friendly team is here to help you every step of the way.</p>
            </div>
          </div>

          <div className="lg:w-1/4 flex justify-center items-start bg-red-700 rounded-br-3xl p-4">
            <div className="w-64 h-64 rounded-bl-[80px] overflow-hidden shadow-lg">
              <Image
                src="/IMG-20250309-WA0010.jpg"
                alt="Why Choose Us"
                width={256}
                height={256}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- Services Icons --- */}
      <section className="max-w-6xl mx-auto mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 px-6 text-center">
        <div className="flex flex-col items-center">
          <img src="/fast-delivery-truck-van-svgrepo-com.svg" alt="" className="h-16 w-16 rounded-full border-[9px] border-gray-300 mb-3" />
          <p className="text-black font-bold text-xs">FREE AND FAST DELIVERY</p>
          <p className="text-xs">Free delivery for all orders over Rs.3000</p>
        </div>
        <div className="flex flex-col items-center">
          <img src="/support-svgrepo-com.svg" alt="" className="h-16 w-16 rounded-full border-[9px] border-gray-300 mb-3" />
          <p className="text-black font-bold text-xs">24/7 CUSTOMER SERVICE</p>
          <p className="text-xs">Friendly 24/7 customer support</p>
        </div>
        <div className="flex flex-col items-center">
          <img src="/shield-check-svgrepo-com.svg" alt="" className="h-16 w-16 rounded-full border-[9px] border-gray-300 mb-3" />
          <p className="text-black font-bold text-xs">MONEY BACK GUARANTEE</p>
          <p className="text-xs">We return money within 30 days</p>
        </div>
      </section>

      {/* --- Subscribe --- */}
      <section className="max-w-6xl mx-auto mt-32 px-6 flex flex-col md:flex-row gap-12 items-center">
        <div className="md:w-1/2">
          <h4 className="font-bold text-lg mb-4">Be the first to explore our latest 3D frame designs and updates!</h4>
          <p className="mb-6">
            Your business might not create memories, but we will help you preserve them with our innovative 3D frames.
          </p>
          <Subscribe />
        </div>
        <div className="md:w-1/2 flex justify-center mb-4">
          <div className="w-[300px] md:w-[440px] h-[300px] md:h-[380px] overflow-hidden rounded-lg shadow-md">
            <Image
              src="/socialupdate.svg"
              alt="Subscribe"
              width={440}
              height={380}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
