"use client"
import React, { useState } from "react";
import Term from "@/public/assets/Contract.jpeg";
import Image from "next/image";
import Condition from '@/components/term/term'

export default function page() {
    const [showModal, setShowModal] = useState(false);
    
  return (

    <>
      <div className="grid grid-cols-12 h-dvh p-20">
        <div className="col-span-6 grid grid-rows-12 gap-4">
          <div className="row-span-2 flex items-center">
            <h1 className="uppercase text-4xl font-mono font-bold ">
              Term And Conditions
            </h1>
          </div>
          <div className="row-span-6 flex items-center text-justify pr-10">
            <p className="">
              By placing an order with Tiny Treasure, you agree to comply with
              our terms and conditions. We collect only the essential personal
              information required to process and deliver your order accurately.
              Your information is used solely for order-related purposes and is
              handled with strict confidentiality. We do not sell, trade, or
              share your personal data with any third parties. All payments made
              on our website are processed through secure and trusted payment
              gateways. We take every precaution to ensure your data and
              transactions are safe. By continuing to use our website, you
              accept and agree to these terms.
            </p>
          </div>
          <div className="row-span-4  grid grid-row-span-4">
            <p className="pr-10 text-justify row-span-2">
              We reserve the right to update or modify these terms at any time
              without prior notice. Customers are responsible for providing
              accurate shipping and contact information. Tiny Treasure is not
              liable for delays caused by incorrect details or unforeseen
              delivery issues.
            </p>
            <div className="row-span-2 flex items-end">
              
                <button className="bg-[#cb1a2e] text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 "
                 onClick={() => setShowModal(true)}>
               
                  LEARN MORE
                </button>
              
            </div>
          </div>
        </div>
        <div className="col-span-6">
          <Image
            src={Term}
            alt="Secure"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <Condition isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
