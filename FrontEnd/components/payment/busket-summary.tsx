"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";

const BasketSummary: React.FC = () => {
  const {
    buyNowItem,
    cartData,
    discountedTotal,
    shippingCost,
    getCartAmount,
    products,
  } = useAppContext();

  const [subTotal, setSubTotal] = useState<number>(0);

  
  const getProductDetails = (productId: string) =>
    products.find((product) => product._id === productId);

  // Subtotal calculation
  const calculateSubtotal = (): number => {
    if (buyNowItem) {
      const product = getProductDetails(buyNowItem.productId);
      return product ? product.price * buyNowItem.quantity : 0;
    } else {
      return getCartAmount();
    }
  };

  useEffect(() => {
    setSubTotal(calculateSubtotal());
  }, [buyNowItem, cartData,getCartAmount]);

  const displaySubtotal = discountedTotal ?? subTotal;
  const total = displaySubtotal + (shippingCost || 0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Basket</h2>

      {/* Buy Now Item */}
      {buyNowItem ? (
        (() => {
          const product = getProductDetails(buyNowItem.productId);
          if (!product) return null;

          return (
            <div className="flex justify-between items-start text-[18px]   ">
              <div className="flex items-start gap-4 ">
                <img
                  src={`http://localhost:5001${product.imageUrl}`}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="object-cover border  border-gray-200 rounded-md"
                />
                <div className="text-[12px] ">
                  <p className="font-medium">{product.name}</p>
                  <p>Size: {buyNowItem.frameSize}</p>
                  <p>Frame Color: {buyNowItem.frameColor}</p>
                  <p>Theme Color: {buyNowItem.themeColor}</p>
                  <p>Quantity: {buyNowItem.quantity}</p>
                </div>
              </div>
              <p className="text-[14px] text-gray-500  ">
                LKR {(product.price * buyNowItem.quantity).toFixed(2)}
              </p>
            </div>
          );
        })()
      ) : (
        <div className="space-y-8 mb-8 ">
          {cartData.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-start text-[18px]  "
            >
              <div className="flex items-start gap-3">
                <img
                  src={`http://localhost:5001${item.productImage}`}
                  alt={item.productName}
                  width={100}
                  height={100}
                  className="object-cover rounded-md border border-gray-200 "
                />
                <div className="text-[12px]">
                  <p className="font-medium">{item.productName}</p>
                  <p>Size: {item.frameSize}</p>
                  <p>Frame Color: {item.frameColor}</p>
                  <p>Theme Color: {item.themeColor}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
              <p className="text-[14px] text-gray-500">
                LKR {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Totals */}
      <div className="space-y-4 text-sm ">
        <div className="flex justify-between ">
          <span className="text-gray-700">Shipping</span>
          <span className="font-semibold text-gray-500">
            LKR {shippingCost.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-700">
            Subtotal{" "}
            {discountedTotal !== null && (
              <span className="text-[#cb1a2e]">(After Discount)</span>
            )}
          </span>
          <span className="font-semibold text-gray-500">
            LKR {displaySubtotal.toFixed(2)}
          </span>
        </div>

        <div className="border-t pt-4 flex justify-between font-medium text-lg">
          <span className="text-[#cb1a2e]">Total</span>
          <span className="text-[#cb1a2e]">LKR {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default BasketSummary;

