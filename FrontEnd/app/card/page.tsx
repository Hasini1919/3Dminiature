"use client";

import React, { useRef, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import decrease_arrow from "@/public/assets/decrease_arrow.svg";
import increase_arrow from "@/public/assets/increase_arrow.svg";
import OrderedSummary from "./order-summary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Arrow from "@/public/assets/Arrow.svg";
import EmptyCart from "@/public/assets/delete-item.png";
import axiosInstance from "@/services/api";
import { FaRegTimesCircle, FaTrash } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { GiShoppingBag } from "react-icons/gi";

const Card = () => {
  const {
    getCartCount,
    cartData,
    updateCartItem,
    router,
    getCartAmount,
    setDiscountedTotal,
    couponCode,
    setCouponCode,
  } = useAppContext();

  const [tempQuantities, setTempQuantities] = useState<{
    [key: string]: number;
  }>({});
  const [errorCoupon, setErrorCoupon] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<(typeof cartData)[0] | null>(
    null
  );
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const isCartEmpty = cartData.length === 0;

  const confirmRemoveItem = (item: (typeof cartData)[0]) => {
    setItemToRemove(item);
    setShowConfirmModal(true);
  };

  const handleQuantityChange = (key: string, newQuantity: number) => {
    if (newQuantity < 1) newQuantity = 1;
    setTempQuantities((prev) => ({ ...prev, [key]: newQuantity }));
  };

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    try {
      const response = await axiosInstance.get("/api/apply/check");
      if (response.data.appliedCoupon) {
        setErrorCoupon(true);
        setErrorMessage("A coupon is already applied !");
        return;
      }
    } catch (error) {
      console.log(error);
    }
    setIsApplyingCoupon(true);
    try {
      const subtotal = getCartAmount();
      const response = await axiosInstance.post("/api/apply/coupon", {
        couponCode,
        totalAmount: subtotal,
      });

      if (response.data.success) {
        setDiscountedTotal(response.data.discountedTotal);
        setErrorCoupon(false);

        toast.success("Coupon applied successfully!");
      } else {
        setErrorCoupon(true);
        setErrorMessage(response.data.message);
        setDiscountedTotal(null);
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      setErrorCoupon(true);
      setDiscountedTotal(null);
      toast.error("Failed to apply coupon");
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleUpdate = () => {
    if (Object.keys(tempQuantities).length === 0) return;

    cartData.forEach((item) => {
      const key = `${item.productId}-${item.frameSize}-${item.frameColor}-${item.themeColor}-${item.uploadedImageFiles}-${item.customText}`;
      if (tempQuantities[key] !== undefined) {
        updateCartItem(
          item.productId,
          item.frameSize,
          item.frameColor,
          item.themeColor,
          tempQuantities[key],
          item.uploadedImageFiles,
          item.customText
        );
      }
    });
    setTempQuantities({});
    toast.success("Cart updated successfully!", { position: "top-center" });
  };

  const handleRemoveItem = (item: (typeof cartData)[0]) => {
    updateCartItem(
      item.productId,
      item.frameSize,
      item.frameColor,
      item.themeColor,
      0,
      item.uploadedImageFiles,
      item.customText
    );
    setShowConfirmModal(false);
    setItemToRemove(null);
    toast.success("Item removed from cart!", { position: "top-center" });
  };

  const resetCouponInput = () => {
    setErrorCoupon(false);
    setCouponCode("");
    inputRef.current?.focus();
  };

  return (
    <>
      

      <main className="px-4 md:px-8 lg:px-12 py-8 min-h-[calc(100vh-120px)] ">
        <div className="flex flex-col gap-6 p-4 md:p-6 bg-white rounded-xl shadow-sm">
          <ToastContainer position="top-center" autoClose={2000} />

          {/* Remove Item Confirmation Modal */}
          {showConfirmModal && itemToRemove && (
            <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
              <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 text-center">
                <RxCrossCircled
                  className="absolute right-4 top-4 cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setShowConfirmModal(false);
                    setItemToRemove(null);
                  }}
                  size={20}
                />
                <h2 className="text-lg font-semibold mb-2">Remove from Cart?</h2>
                <p className="text-gray-600 mb-6">Item will be removed from your Cart</p>
                <div className="flex justify-center gap-4">
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors cursor-pointer"
                    onClick={() => {
                      setShowConfirmModal(false);
                      setItemToRemove(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors cursor-pointer"
                    onClick={() => handleRemoveItem(itemToRemove)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Cart Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-2 md:mb-0">
              <h1 className="text-xl md:text-2xl font-medium text-gray-800">
                My Shopping Cart
              </h1>
              <GiShoppingBag size={20} className="text-orange-500" />
            </div>
            <p className="text-sm md:text-base text-gray-600">
              {getCartCount()} {getCartCount() === 1 ? "Item" : "Items"}
            </p>
          </div>

          {isCartEmpty ? (
            <div className="flex flex-col items-center justify-center py-8 md:py-12 h-[550px] ">
              <Image src={EmptyCart} alt="Empty cart" width={100} height={100} />

              <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mt-4 mb-2">
                Your Cart is Empty
              </h2>
              <p className="text-gray-500 text-center max-w-md mb-6">
                Before proceeding to checkout you must add some products to your cart.
              </p>
              <button
                onClick={() => router.push("/shop")}
                className="px-6 py-2 bg-[#cb1a2e] text-white rounded-lg hover:bg-red-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Cart Items */}
              <div className="flex-1">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left bg-gray-300">
                        <th className="text-gray-700 font-medium font-serif text-[20px] p-2">
                          Product
                        </th>
                        <th className="text-gray-700 font-medium font-serif text-[20px] p-2">
                          Details
                        </th>
                        <th className="p-2 text-gray-700 font-medium font-serif text-[20px]">
                          Price
                        </th>
                        <th className="p-2 text-gray-700 font-medium font-serif text-[20px]">
                          Quantity
                        </th>
                        <th className="p-2 text-gray-700 font-medium font-serif text-[20px]">
                          Subtotal
                        </th>
                        <th className="p-2 text-gray-700 font-medium font-serif text-[20px]">
                          Remove
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartData.map((item) => {
                        const key = `${item.productId}-${item.frameSize}-${item.frameColor}-${item.themeColor}-${item.uploadedImageFiles}-${item.customText}`;
                        const tempQuantity = tempQuantities[key] ?? item.quantity;
                        const subtotal = tempQuantity * item.price;

                        return (
                          <tr key={key} className="border-b border-gray-200">
                            {/* Product Image */}
                            <td className="py-4">
                              <div className="flex items-center">
                                <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-200">
                                  <img
                                    src={`http://localhost:5500/products/${item.images[0]}`}
                                    alt={item.productName}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                            </td>

                            {/* Product Details */}
                            <td className="py-4">
                              <div className="space-y-1">
                                <h3 className="font-medium text-gray-800">{item.productName}</h3>

                                {item.uploadedImageFiles?.length > 0 && (
                                  <div className="flex gap-1 flex-wrap">
                                    {item.uploadedImageFiles.map((imgUrl, index) => (
                                      <div
                                        key={index}
                                        className="w-40 h-40 rounded-md border overflow-hidden border-gray-200"
                                      >
                                        <img
                                          src={`${"http://localhost:5500"}${imgUrl}`}
                                          alt={`Uploaded ${index + 1}`}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                )}

                                <div className="text-sm text-gray-600 space-y-1">
                                  <p>
                                    <span className="font-medium">Size:</span>{" "}
                                    <span className="text-gray-500">{item.frameSize}</span>
                                  </p>
                                  <p>
                                    <span className="font-medium">Frame:</span>{" "}
                                    <span className="text-gray-500">{item.frameColor}</span>
                                  </p>
                                  <p>
                                    <span className="font-medium">Theme:</span>{" "}
                                    <span className="text-gray-500">{item.themeColor}</span>
                                  </p>
                                  {item.customText && (
                                    <p>
                                      <span className="font-medium">Text:</span>{" "}
                                      <span className="text-gray-500">{item.customText}</span>
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* Price */}
                            <td className="py-4">
                              <p className="text-gray-700">Rs. {item.price.toFixed(2)}</p>
                            </td>

                            {/* Quantity */}
                            <td className="py-4">
                              <div className="flex items-center border rounded-md w-fit">
                                <button
                                  onClick={() => handleQuantityChange(key, tempQuantity - 1)}
                                  disabled={tempQuantity <= 1}
                                  className="px-2 py-1 text-gray-500 hover:bg-gray-100 disabled:opacity-40"
                                >
                                  <Image
                                    src={decrease_arrow}
                                    alt="decrease"
                                    className="w-4 h-4 cursor-pointer"
                                  />
                                </button>
                                <span className="px-2 w-8 text-center">{tempQuantity}</span>
                                <button
                                  onClick={() => handleQuantityChange(key, tempQuantity + 1)}
                                  className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                                >
                                  <Image
                                    src={increase_arrow}
                                    alt="increase"
                                    className="w-4 h-4 cursor-pointer"
                                  />
                                </button>
                              </div>
                            </td>

                            {/* Subtotal */}
                            <td className="py-4">
                              <p className="font-medium text-gray-800">Rs. {subtotal.toFixed(2)}</p>
                            </td>

                            {/* Remove */}
                            <td className="py-4">
                              <button
                                onClick={() => confirmRemoveItem(item)}
                                className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                                title="Remove item"
                              >
                                <FaTrash size={16} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Coupon & Actions */}
                <div className="mt-6 grid grid-cols-12 gap-4 w-full items-center">
                  {/* Coupon Code Input */}
                  <div className="col-span-4 relative w-full">
                    <div className="flex items-center relative">
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg outline-none ${
                          errorCoupon ? "border-red-500" : "border-gray-400"
                        } border focus:border-red-400 pr-8`}
                      />
                      {couponCode && (
                        <button
                          onClick={resetCouponInput}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
                          title="Clear"
                        >
                          <FaRegTimesCircle size={16} />
                        </button>
                      )}
                    </div>
                    {errorCoupon && (
                      <p className="absolute left-0 top-full text-sm text-red-600 mt-1 w-full">
                        {errorMessage}
                      </p>
                    )}
                  </div>

                  {/* Apply Coupon Button */}
                  <div className="col-span-2">
                    <button
                      onClick={handleApplyCoupon}
                      disabled={isApplyingCoupon || !couponCode.trim()}
                      className="w-full px-4 py-2 bg-[#cb1a2e] text-white rounded-md hover:bg-red-800 disabled:cursor-not-allowed transition"
                    >
                      {isApplyingCoupon ? "Applying..." : "Apply Coupon"}
                    </button>
                  </div>

                  {/* Update Cart Button */}
                  <div className="col-span-6 flex justify-end">
                    <button
                      onClick={handleUpdate}
                      disabled={Object.keys(tempQuantities).length === 0}
                      className="px-6 py-2 border border-red-700 text-red-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Update Cart
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/shop")}
                  className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors mt-8 cursor-pointer"
                >
                  <Image src={Arrow} alt="arrow" />
                  Continue Shopping
                </button>
              </div>

              {/* Order Summary */}
              <div className="lg:w-80 xl:w-96">
                <OrderedSummary />
              </div>
            </div>
          )}
        </div>
      </main>

    
    </>
  );
};

export default Card;
