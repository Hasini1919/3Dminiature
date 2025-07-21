export const metadata = {
    title: "About Us Page"
};

import Image from "next/image";
import Subscribe from "@/components/footer/subscribe";
import Pdf from "@/components/pdf/pdf";

export default function About() {
    return (

        <>
        <div className="relative mx-auto flex items-center justify-center px-4 py-0 bg-gray-500 max-w-4xl mt-20 rounded-3xl ">
          
            <h4 className="absolute top-0 right-0 transform -translate-y-1/3 -mt-4 bg-red-600 text-white p-3 shadow-[0px_15px_40px_rgba(0,0,0,0.6)] rounded text-xl">
                ABOUT TINY TREASURES
            </h4>

            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-2 lg:space-y-0 lg:space-x-2 max-w-4xl">
                
                
                <div className="w-60 h-60 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-[0px_15px_40px_rgba(0,0,0,0.6)]  -translate-x-2/3 ">
                    <Image
                        src="/IMG-20250309-WA0009.jpg"
                        alt="About Us"
                        width={256}
                        height={256}
                        className="object-cover w-full h-full"
                    />
                </div>

                <div className="max-w-lg  ">
                    <h3 className="text-3xl font-bold text-white mt-3">Our Story</h3>
                    <p className="mt-4 text-white text-base">
                    Our specialty at Tiny Treasures is customisation, which we showcase via our distinctive 3D tiny shadow boxes.
                     Our goal, as a Srilankan company founded in 2024, is to offer a pleasant selection of handcrafted presents that commemorate life's milestones, like birthdays and baby showers. 
                     Every item is painstakingly made to ensure that no two are similar, enabling our clients to design presents that accurately capture the essence of their loved ones' personalities. 
                    </p>
                </div>
            </div>
        </div>

   <div className="relative mx-auto px-3 py-0 bg-gray-500 max-w-4xl mt-20 rounded-3xl overflow-visible">
  <div className="flex flex-col lg:flex-row items-center lg:items-center space-y-4 lg:space-y-0 lg:space-x-6 w-full relative">

    {/* Text Section */}
     <div className="w-full max-w-xl px-15 lg:px-12 z-1 text-left">
      <h3 className="text-3xl font-bold text-white mb-4">Our Commitment to Quality</h3>
      <p className="text-white text-base leading-relaxed">
        Every element of our work demonstrates our dedication to excellence and originality.
        We create shadow boxes that are treasured mementos as well as lovely décor by using eco-friendly materials and cutting-edge manufacturing techniques.
        Personalized presents are 30% more remembered than generic ones, according to research, and can strengthen emotional ties.
        To ensure that every gift is as distinctive as the occasion it commemorates, we urge our clients to personalize their choices.
      </p>
    </div>

    {/* Image Section - absolute and overlapping */}
    <div className="hidden lg:block absolute right-[-110px] top-1/2 transform -translate-y-1/2">
      <div className="w-72 h-72 rounded-full overflow-hidden shadow-[0px_15px_40px_rgba(0,0,0,0.6)]">
        <Image
          src="/IMG-20250309-WA0008.jpg"
          alt="About Us"
          width={288}
          height={288}
          className="object-cover w-full h-full"
        />
      </div>
    </div>

  </div>
</div>




      

      
      <div className="container mx-auto flex flex-col md:flex-row  sm:gap-12  mt-32 px-4">
        
        <div className="md:w-7/10 text-left flex flex-col items-start px-48">
          
          <p className=" text-black font-bold text-2xl  mb-0 border-b-2 border-black inline-block">Why choose us?</p>
          <p className="text-lg mt-3">At Tiny Treasures, we bring your cherished memories to life with beautifully crafted 3D frames.
             Our innovative designs and commitment to quality make every frame a timeless keepsake.</p>
             <p className=" text-black font-bold text-2xl mb-0">Unmatched Personalization</p>
          <p className="text-lg mt-3">Create frames that reflect your unique style and memories, turning special moments into lifelong treasures.</p>
             <p className=" text-black font-bold text-2xl mb-0">Exceptional Quality</p>
          <p className="text-lg mt-3">Expertly crafted with premium materials, each frame is designed to last and leave a lasting impression.</p>
             <p className=" text-black font-bold text-2xl mb-0">Dedicated Customer Support</p>
          <p className="text-lg mt-3">Our supportive team is here to guide you every step of the way, ensuring a seamless and delightful experience.</p>
        </div>
        <div className="w-2/10">
        </div>
        <div className="md:w-[10%] h-[500px] text-center flex flex-col bg-red-700 items-center rounded-br-3xl ">
          
        <div className="w-72 h-72 lg:w-74 lg:h-74  overflow-hidden shadow-[0px_15px_40px_rgba(0,0,0,0.6)]  -translate-x-1/2 mt-20 rounded-bl-[100px]">
                    <Image
                        src="/IMG-20250309-WA0010.jpg"
                        alt="About Us"
                        width={288}
                        height={288}
                        className="object-cover w-full h-full"
                    />
                </div>
        </div>
        
        <div className="w-1/10">
        
        </div>
        
      </div>

      <div className="container mx-auto flex flex-col md:flex-row  sm:gap-12 mt-32 ">
        <div className="w-1/3">
        </div>
        <div className="md:w-1/5 text-center flex flex-col items-center ">
          <img className="h-[64px] w-[64px] rounded-full border-[9px] border-gray-300" src="/fast-delivery-truck-van-svgrepo-com.svg" alt="" />
          <p className=" text-black font-bold text-xs mb-0">FREE AND FAST DELIVERY</p>
          <p className="text-xs">Free delivery for all orders over Rs.3000</p>
        </div>
        <div className="md:w-1/5 text-center flex flex-col items-center">
          
          <img className="h-[64px] w-[64px] rounded-full border-[9px] border-gray-300" src="/support-svgrepo-com.svg" alt="" />
          <p className="text-black font-bold text-xs mb-0">24/7 CUSTOMER SERVICE</p>
          <p className="text-xs">Friendly 24/7 customer support</p>
        </div>
        <div  className="md:w-1/5 text-center flex flex-col items-center">
         
          <img className="h-[64px] w-[64px] rounded-full border-[9px]  border-gray-300" src="/shield-check-svgrepo-com.svg" alt="" />
          <p className="text-black font-bold text-xs mb-0">MONEY BACK GUARANTEE</p>
          <p className="text-xs">We reurn money within 30 days</p>
        </div>
        <div className="w-1/3">
        </div>
        
      </div>

     

      <div className="container mx-auto flex flex-col md:flex-row  sm:gap-12 mt-32 ">
        
      <div className="md:w-1/2 text-left flex flex-col items-start px-20  ">
      <p className="font-bold mt-15 pb-5">Be the first to explore our latest 3D frame designs and updates!</p>
      <p className="pb-5">Your Business might not create mrmories,but eventually,we 
        will  help you preserve them with our innovative 3D frames</p>
      <Subscribe/> 
    </div>

    <div className="w-1/2 left flex flex-col items-center px-15 mt-0">
             
        <div className="w-96 h-96 lg:w-[34rem] lg:h-[30rem] overflow-hidden mt-0">
    <Image
      src="/socialupdate.svg"
      alt="About Us"
      width={544}
      height={480}
      className="object-cover w-full h-full"
    />
  </div>
    </div>

    </div>

</>
    );
}
