"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import axiosInstance from "@/services/api";
import { FaRegTimesCircle } from "react-icons/fa";

const CouponSection = () => {
  const [showCoupon, setShowCoupon] = useState(false);
  const [errorCoupon, setErrorCoupon] = useState(false);
  const [errorMessage,setErrorMessage]=useState("");
  const [getDiscount,setgetDiscount]=useState(false);

 

  const { getCartAmount, setDiscountedTotal, couponCode, setCouponCode,discountedTotal } =
    useAppContext();

    useEffect(()=>{
       if(discountedTotal){
        setgetDiscount(true);
       }
    },[])
   
  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim() === "") {
      return;
    }

    try {
      const subtotal = getCartAmount();
      const response = await axiosInstance.post("/api/apply/coupon", {
        couponCode,
        totalAmount: subtotal,
      });
      const data = response.data;
      if (data.success) {
        setDiscountedTotal(data.discountedTotal);
        
      } else {
        setErrorCoupon(true);
        setErrorMessage(data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const handlefix = () => {
    setErrorCoupon(false);
    setCouponCode("");
    inputRef.current?.focus();
  };

  return (
    <div className="bg-white p-4 rounded-lg  border-1 border-gray-300 mb-6">
      {!showCoupon ? (
        <div
          className="text-gray-500 font-medium cursor-pointer hover:underline"
          onClick={() => setShowCoupon(true)}
        >
          Have a coupon? <span>Click here to enter</span>
        </div>
      ) : (
        <form onSubmit={handleApplyCoupon} className="space-y-2">
          <div className="flex gap-2  items-center relative  ">
            <input
              ref={inputRef}
              type="text"
              placeholder="Coupon code"
              className={`px-3 py-2 flex-1 rounded  focus:border-green-600 outline-none
                ${errorCoupon ? "border-red-500" : "border-gray-400"} border `}
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            {couponCode && (
              <span
                className="absolute right-23 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={handlefix}
              >
                <FaRegTimesCircle className="fill-gray-500" />
              </span>
            )}

            <button
              type="submit"
              className="px-4 py-2 bg-[#cb1a2e] text-white rounded hover:bg-red-700 transition-colors cursor-pointer disabled:cursor-not-allowed"
              disabled={getDiscount }
            >
              Apply
            </button>
          </div>
          {errorCoupon && (
            <p className="text-[12px]  text-red-700">
              {errorMessage}
            </p>
          )}
          <div
            className="text-sm text-gray-500 cursor-pointer hover:underline"
            onClick={() => setShowCoupon(false)}
          >
            Close
          </div>
        </form>
      )}
    </div>
  );
};

export default CouponSection;