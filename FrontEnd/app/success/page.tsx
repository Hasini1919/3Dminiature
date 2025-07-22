"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axiosInstance from "@/services/api";
import { useAppContext } from "@/context/AppContext";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [orderUpdated, setOrderUpdated] = useState(false);

  const { clearBuyNow, setCartData, buyNowItem } = useAppContext();

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        toast.error("No session ID found.");
        setLoading(false);
        return;
      }

      try {
        const res = await axiosInstance.post("/api/payment/verify-payment", {
          sessionId,
        });

        if (res.data.success) {
          toast.success("Payment successful!");
          setOrderUpdated(true);

          if (buyNowItem) {
            clearBuyNow();
          } else {
            setCartData([]);
          }

          setTimeout(() => {
            router.replace("/order-placed");
          }, 3000);
        } else {
          toast.error("Order update failed.");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        toast.error("Something went wrong during payment verification.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, router, clearBuyNow, setCartData, buyNowItem]);

  return (
    <>
      <Header />

      <div className="min-h-screen flex flex-col justify-center items-center p-4">
        <h1 className="text-3xl font-bold mb-4">Processing your payment...</h1>
        {loading && <p className="text-gray-600">Please wait...</p>}
        {!loading && orderUpdated && (
          <p className="text-green-600 text-lg font-medium">
            Your order has been placed successfully!
          </p>
        )}
      </div>

      <Footer />
    </>
  );
}
