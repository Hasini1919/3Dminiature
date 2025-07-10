"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import axiosInstance from "@/services/api";

const OrderSummary: React.FC = () => {
  const {
    buyNowItem,
    cartData,
    products,
    getCartAmount,
    discountedTotal,
    selectedShippingOption,
    setSelectedShippingOption,
    setShippingCost,
    shippingCost,
    setDiscountedTotal
  } = useAppContext();

  const [subTotal, setSubTotal] = useState<number>(0);

  useEffect(() => {
    setShippingCost(selectedShippingOption === "Express Shipping" ? 700 : 360);
  }, [selectedShippingOption, setShippingCost]);

  const getProduct = (id: string) => products.find((p) => p._id === id);

  useEffect(() => {
    if (buyNowItem) {
      const prod = getProduct(buyNowItem.productId);
      console.log(prod);
      setSubTotal((prod?.price ?? 0) * buyNowItem.quantity);
    } else {
      setSubTotal(getCartAmount());
      const discountAmount=async()=>{
        try{
        
          const response=await axiosInstance.get("/api/apply/check");
          setDiscountedTotal(response.data.appliedCoupon.discountedValue);
        }
        catch(error){
         console.log(error);
        }
      }
      discountAmount();
     
    }
  }, [buyNowItem, cartData, products, getCartAmount]);
  console.log(discountedTotal);
  const displaySubtotal = discountedTotal ?? subTotal;
  const total = displaySubtotal + shippingCost;

  return (
    <div className="p-6 rounded-lg bg-white border-1 border-gray-300 ">
      <div className="flex justify-between border-b border-b-gray-300 mb-2">
        <h3 className="text-xl font-bold mb-6 font-serif">PRODUCT</h3>
        <h3 className="text-xl font-bold mb-6 font-serif">SUBTOTAL</h3>
      </div>
      {buyNowItem ? (
        <div className="mb-6">
          {(() => {
            const product = getProduct(buyNowItem.productId);
            return (
              product && (
                <div className="border-b pb-4 border-b-gray-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-red-500">
                        {product.name} × {buyNowItem.quantity}
                      </h3>
                      <div className="mt-2.5">
                        <h3 className="font-semibold text-gray-600">
                          Frame Color:
                        </h3>
                        <p className="text-gray-500">{buyNowItem.frameColor}</p>
                      </div>

                      {/* Uploaded Images Section */}
                      <div className="mt-3">
                        <p className="text-sm font-medium mb-2 text-gray-600">
                          Upload Your Image:
                        </p>
                        {buyNowItem.uploadedImageUrls?.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {buyNowItem?.uploadedImageUrls?.map(
                              (imgUrl, index) => (
                                <img
                                  key={index}
                                  src={`http://localhost:5500${imgUrl}`}
                                  alt={`Uploaded ${index + 1}`}
                                  className="w-40 h-40 object-cover rounded-md border border-gray-300"
                                />
                              )
                            )}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm">
                            No images uploaded
                          </p>
                        )}
                      </div>
                      <div className="mt-2.5">
                        <h3 className="font-semibold text-gray-600">
                          Frame theme:
                        </h3>
                        <p className="text-gray-500">{buyNowItem.themeColor}</p>
                      </div>
                      <div className="mt-2.5">
                        <h3 className="font-semibold text-gray-600">
                          Frame Size:
                        </h3>
                        <p className="text-gray-500">{buyNowItem.frameSize}</p>
                      </div>
                      <div className="mt-2.5">
                        <h3 className="font-semibold text-gray-600">
                          Custom Text:
                        </h3>
                        <p className="text-gray-500">{buyNowItem.customText}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        LKR {(product.price * buyNowItem.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )
            );
          })()}
        </div>
      ) : (
        <div className="mb-6">
          {cartData.map((item, i) => {
            const prod = getProduct(item.productId);
            const lineTotal = (prod?.price ?? 0) * item.quantity;

            return prod ? (
              <div
                key={`${item.productId}-${i}`}
                className="border-b border-b-gray-300 pb-4 mb-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-[#cb1a2e]">
                      {prod.name} × {item.quantity}
                    </h3>
                    <div className="mt-2.5">
                      <h3 className="font-semibold text-gray-600">
                        Frame Color:
                      </h3>
                      <p className="text-gray-500">{item.frameColor}</p>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm font-medium mb-2 text-gray-600">
                        Upload Your Image:
                      </p>
                      {item.uploadedImageFiles?.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {item.uploadedImageFiles.map((imgUrl, index) => (
                            <img
                              key={index}
                              src={`http://localhost:5500${imgUrl}`}
                              alt={`Uploaded ${index + 1}`}
                              className="w-40 h-40 object-cover rounded-md border-gray-200 border "
                            />
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">
                          No images uploaded
                        </p>
                      )}
                    </div>
                    <div className="mt-2.5">
                      <h3 className="font-semibold text-gray-600">
                        Frame theme:
                      </h3>
                      <p className="text-gray-500">{item.themeColor}</p>
                    </div>
                    <div className="mt-2.5">
                      <h3 className="font-semibold text-gray-600">
                        Frame Size:
                      </h3>
                      <p className="text-gray-500">{item.frameSize}</p>
                    </div>
                    <div className="mt-2.5">
                      <h3 className="font-semibold text-gray-600">
                        Custom Text:
                      </h3>
                      <p className="text-gray-500">{item.customText}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-600">
                      LKR {lineTotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ) : null;
          })}
        </div>
      )}

      {/* Shipping Options */}
      <div className="mb-8 p-4 ">
        <h3 className="font-semibold mb-3 text-gray-600">Shipping Options</h3>
        <select
          className="w-full p-2 border-gray-300 border rounded focus:outline-none  hover:border-red-500 cursor-pointer text-gray-600"
          value={selectedShippingOption}
          onChange={(e) => setSelectedShippingOption(e.target.value)}
        >
          <option value="Standard Shipping">Standard Shipping (LKR 360)</option>
          <option value="Express Shipping">Express Shipping (LKR 700)</option>
        </select>
      </div>

      {/* Order Summary */}
      <div className="border-t border-t-gray-300 pt-4  ">
        <div className="flex justify-between mb-2 mt-2">
          <span className="text-gray-600">Subtotal</span>
          <div className="text-right">
            {discountedTotal !== null && (
              <span className="text-sm line-through text-gray-500 block">
                LKR {subTotal.toFixed(2)}
              </span>
            )}
            <span className="text-black">LKR {displaySubtotal.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex justify-between mb-2 mt-2">
          <span className="text-gray-600">Shipping</span>
          <span className="text-black">LKR {shippingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg text-[#cb1a2e] mt-5">
          <span>Total</span>
          <span>LKR {total.toFixed(2)}</span>
        </div>
      </div>

      {discountedTotal !== null && (
        <div className="bg-green-100 text-red-700 p-2 rounded text-sm text-center mt-4">
          Discount applied successfully!
        </div>
      )}
    </div>
  );
};

export default OrderSummary;