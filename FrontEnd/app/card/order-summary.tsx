"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import axiosInstance from "@/services/api";
import { useRouter } from "next/navigation"; // Updated: using Next.js router

const OrderedSummary = () => {
  const {
    getCartAmount,
    discountedTotal,
    setDiscountedTotal,
  } = useAppContext();

  const router = useRouter(); // Using router directly from Next.js
  const shippingCost = 360;

  useEffect(() => {
    // Avoid calling if already set
    if (discountedTotal !== null) return;

    let isMounted = true;

    const displayAmount = async () => {
      try {
        const response = await axiosInstance.get("/api/apply/check");
        const value = response.data.appliedCoupon?.discountedValue;

        if (isMounted && value) {
          setDiscountedTotal(value);
        }
      } catch (error: any) {
        console.error("Failed to fetch discount:", error?.response?.data || error.message);
      }
    };

    displayAmount();

    return () => {
      isMounted = false; // cleanup on unmount
    };
  }, [discountedTotal, setDiscountedTotal]);

  const subtotal = getCartAmount();
  const hasDiscount = discountedTotal !== null;

  const displaySubtotal = hasDiscount ? discountedTotal : subtotal;
  const displayTotal = displaySubtotal + shippingCost;
  const originalTotal = subtotal + shippingCost;

  return (
    <div className="sticky top-4">
      <div className="w-full rounded-lg overflow-hidden">
        <div className="p-6 flex flex-col space-y-6 border-4 border-gray-300 rounded-lg">
          <h2 className="text-2xl font-bold uppercase text-center font-serif mb-6">
            Cart Totals
          </h2>

          {/* Subtotal Section */}
          <div className="flex justify-between items-center">
            <p className="text-[16px] font-serif text-gray-700">Subtotal</p>
            <div className="flex flex-col items-end">
              {hasDiscount && (
                <span className="text-sm line-through text-gray-500">
                  LKR {subtotal.toFixed(2)}
                </span>
              )}
              <p className="text-[16px]">
                LKR {displaySubtotal.toFixed(2)}
              </p>
            </div>
          </div>

          <hr className="border-red-800" />

          {/* Shipping Section */}
          <div className="flex justify-between items-center">
            <p className="text-[16px] font-medium font-serif text-gray-700">Shipping</p>
            <p className="text-[16px]">
              <span className="text-gray-800">Flat Rate: </span>
              <span className="border-b-1">LKR {shippingCost.toFixed(2)}</span>
            </p>
          </div>

          <hr className="border-red-800" />

          {/* Total Section */}
          <div className="flex justify-between items-center">
            <p className="text-[16px] font-medium font-serif">Total</p>
            <div className="flex flex-col items-end">
              {hasDiscount && (
                <span className="text-sm line-through text-red-500">
                  LKR {originalTotal.toFixed(2)}
                </span>
              )}
              <p className="text-[16px] font-bold text-red-800">
                LKR {displayTotal.toFixed(2)}
              </p>
            </div>
          </div>

          <hr className="border-red-800" />

          {/* Discount Banner */}
          {hasDiscount && (
            <div className="bg-green-100 text-red-700 p-2 rounded text-sm text-center">
              Discount applied successfully!
            </div>
          )}

          {/* Checkout Button */}
          <button
            onClick={() => router.push("/checkout")}
            className="w-full py-3 mt-2 bg-[#cb1a2e] text-white font-bold rounded-lg hover:bg-red-800 transition duration-300 uppercase cursor-pointer"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderedSummary;
