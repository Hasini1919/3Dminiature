"use client";
import React from "react";
import PayButton from "@/components/payment/pay-button"; // adjust path as needed
import { useAppContext } from "@/context/AppContext";

export default function PaymentForm() {
  const { cartData } = useAppContext(); // your cart items

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pay with Stripe</h2>
      <PayButton cartItems={cartData} />
    </div>
  );
}
