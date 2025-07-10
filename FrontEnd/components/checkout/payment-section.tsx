"use client";

import React, { FormEvent, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { toast } from "react-toastify";
import axiosInstance from "@/services/api";

const Payment_Section = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    getCartAmount,
    cartData,
    buyNowItem,
    products,
    address,
    discountedTotal,
    shippingCost,
    setCartData,
    selectedShippingOption,
    router,
    shippingSame,
    shiftAddress,
    clearBuyNow,
  } = useAppContext();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage("");

    const currentAmount = buyNowItem
      ? (products.find((p) => p._id === buyNowItem.productId)?.price || 0) * buyNowItem.quantity
      : getCartAmount();

    if (!paymentMethod) {
      setErrorMessage("Please select a payment method.");
      return;
    }

    if (paymentMethod === "cod" && currentAmount < 1000) {
      setErrorMessage("Cash on Delivery is only available for orders above LKR 1000.");
      return;
    }

    try {
      let orderItems: any[] = [];

      if (buyNowItem) {
        const product = products.find((p) => p._id === buyNowItem.productId);
        if (product) {
          orderItems.push({
            productId: buyNowItem.productId,
            size: buyNowItem.frameSize,
            frameColor: buyNowItem.frameColor,
            themeColor: buyNowItem.themeColor,
            uploadedImage: buyNowItem.uploadedImageUrls,
            quantity: buyNowItem.quantity,
            price: product.price,
            name: product.name,
            
            imageUrl: product.imageUrl,
          });
        }
      } else {
        for (const item of cartData) {
          orderItems.push({
            productId: item.productId,
            size: item.frameSize,
            frameColor: item.frameColor,
            themeColor: item.themeColor,
            uploadedImage: item.uploadedImageFiles,
            quantity: item.quantity,
            price: item.price,
            name: item.productName,
            imageUrl: item.productImage,
            customText:item.customText
          });
        }
      }

      const totalAmount = (discountedTotal !== null ? discountedTotal : currentAmount) + shippingCost;

      const orderData = {
        items: orderItems,
        amount: totalAmount,
        address: shippingSame ? address : { ...address, ...shiftAddress },
        selectedShippingOption,
        paymentMethod,
        buyNow: !!buyNowItem,
      };

      if (paymentMethod === "cod") {
        const response = await axiosInstance.post("/api/order/Place", orderData, {
          withCredentials: true,
        });

        if (response.data.success) {
          if (buyNowItem) {
            clearBuyNow();
          } else {
            setCartData([]);
          }
          router.replace("/order-placed");
        } else {
          toast.error(response.data.message || "Order failed. Try again.");
        }
      } else if (paymentMethod === "payhere") {
        router.push("/OrderPlaced/Payment");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      {/* Cash on Delivery */}
      <label className="flex items-start gap-3">
        <input
          type="radio"
          name="payment"
          value="cod"
          checked={paymentMethod === "cod"}
          onChange={() => setPaymentMethod("cod")}
          className="accent-black mt-1"
        />
        <div>
          <p className="font-medium text-gray-800">Cash on delivery</p>
          <p className="text-sm text-gray-500">Pay with cash upon delivery.</p>
          {paymentMethod === "cod" && (
            <p className="text-sm text-gray-500 mt-1">
              (Only available for orders above LKR 1000)
            </p>
          )}
        </div>
      </label>

      {/* PayHere */}
      <label className="flex items-start gap-3">
        <input
          type="radio"
          name="payment"
          value="payhere"
          checked={paymentMethod === "payhere"}
          onChange={() => setPaymentMethod("payhere")}
          className="accent-black mt-1"
        />
        <div>
          <p className="font-medium text-gray-800">PayHere</p>
          <p className="text-sm text-gray-500">Pay by Visa, MasterCard via PayHere.</p>
        </div>
      </label>

      {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}

      <p className="text-sm text-gray-600 mt-6">
        Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
      </p>

      <button
        type="submit"
        className="mt-6 w-full bg-[#cb1a2e] text-white py-3 rounded-full text-lg font-medium hover:opacity-80 transition cursor-pointer disabled:opacity-50"
        disabled={!paymentMethod}
      >
        {buyNowItem ? "Complete Purchase" : "Place Order"}
      </button>
    </form>
  );
};

export default Payment_Section;