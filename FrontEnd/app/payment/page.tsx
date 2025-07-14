"use client"
import React from "react";
import BasketSummary from "@/components/payment/busket-summary";
import PaymentForm from "@/components/payment/payment-form";
import { useAppContext } from "@/context/AppContext";

const PayHere = () => {
    const {router}=useAppContext();
  return (
    
    <div className=" px-[90px] py-[54px]  w-full">
        <div className="flex items-center justify-center mb-16 relative ">
        <div className="w-full max-w-xl relative ">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-5 right-[50%] h-0.5 bg-gray-300  z-0"></div>
            <div className="absolute top-5 left-[50%] right-8 h-0.5 bg-[#cb1a2e] z-0"></div>

            <div className="flex flex-col items-center z-10">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
               <button   onClick={() => router.push("/OrderPlaced")} className="cursor-pointer">
                 1
               </button>
                
              </div>
              <div className="mt-2 text-gray-500">Checkout</div>
            </div>

            <div className="flex flex-col items-center z-10">
              <div className="w-10 h-10 rounded-full bg-[#cb1a2e] flex items-center justify-center text-white font-medium">
                <button className="cursor-default">
                 2
                </button>
                
              </div>
              <div className="mt-2 text-red-600 font-medium">Payment</div>
            </div>

            <div className="flex flex-col items-center z-10">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
                <button  disabled className="cursor-not-allowed">
                3
                </button>
                
              </div>
              <div className="mt-2 text-gray-500">Confirmation</div>
            </div>
          </div>
        </div>
        </div>
    
        <div className="mx-auto flex flex-col md:flex-row gap-12 p-2 rounded-lg ">
         <div className="flex-[3]  border-green-600 border-r-gray-300 border-r ">
          <PaymentForm />
         </div>
         <div className="flex-[2] p-2  ">
         <BasketSummary />
         </div>
        </div>
    
    </div>
  );
};

export default PayHere;
