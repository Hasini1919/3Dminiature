"use client";

import Image from "next/image";
import Scroller from "./scrolltxt";
import ScrollerImg from "./scrollImage";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export default function Homepage() {
  return (
    <>
     
      <Header />

     
      <section
        className="relative bg-cover bg-center bg-no-repeat  pt-72 pb-40 px-6 md:px-16 shadow-xl"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('/Red.png')",
        }}
      >
        <div className="relative left-10 top-32 max-w-xl  text-left   shadow-2xl border  rounded-xl p-6 ">
          <p className="uppercase  text-sm mb-4 ">
            Welcome to Tiny Treasure
          </p>
          <h1 className="text-2xl  font-bold  mb-8 text-gray-600 uppercase ">
            Modern frames, your way design, customize, and cherish in 3D!
          </h1>
          <p className="text-gray-800 mb-8">
            Discover our unique collection of beautifully crafted frames that bring
            your memories to life.
          </p>
          
        </div>
      </section>

      {/* Scrolling Text Section */}
      <div className="p-24 font-semibold">
        <Scroller />
      </div>

      {/* Top Categories Section */}
      <section className="text-center mt-18 p-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 uppercase">Top Categories</h2>
          <p className="text-lg mb-12">
            Explore our most loved themes, crafted to fit your every memory.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { src: "/IMG-20250309-WA0009.jpg", label: "Family" },
              { src: "/IMG-20250309-WA0010.jpg", label: "Baby" },
              { src: "/IMG-20250309-WA0008.jpg", label: "Wedding" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              >
                <div className="relative h-[250px] w-full">
                  <Image
                    src={item.src}
                    alt={item.label}
                    layout="fill"
                    objectFit="cover"
                    className="transform group-hover:scale-105 transition duration-500 ease-in-out"
                  />
                </div>
                <div className="py-4 bg-white">
                  <p className="text-lg font-semibold text-gray-800">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frame Process Section */}
      <section className="mt-28 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
            Our Frame Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              {
                title: "Take an Order",
                img: "/take.svg",
                desc: "We start by understanding your unique frame needs.",
              },
              {
                title: "Make the Product",
                img: "/process.svg",
                desc: "Our team crafts your frame with precision and care.",
              },
              {
                title: "Deliver the Product",
                img: "/deliver.svg",
                desc: "Your beautifully crafted frame is delivered to your doorstep.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="h-28 w-28 mb-5 rounded-full border-4 border-red-500 flex items-center justify-center bg-white shadow-lg hover:shadow-xl transition duration-300">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Frames in Action */}
      <section className="text-center mt-24">
        <div className="mt-10">
          <ScrollerImg />
        </div>
      </section>

     
      <Footer />
    </>
  );
}