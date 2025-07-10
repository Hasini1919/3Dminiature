"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import axiosInstance from "@/services/api";
import Loading from "@/components/symbol/loading";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  imageUrl?: string;
  customText:string;
  frameColor:string;
  themeColor:string;
}

interface OrderDetails {
  _id?: string;
  orderNumber?: string;
  amount: number;
  date: number;
  payment: boolean;
  items: OrderItem[];
  paymentMethod: string;
  selectedShippingOption: string;
  status: string;
  address: {
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    EmailAddress: string;
    Provience: string;
    City: string;
    Area: string;
    ZipCode: string;
    HouseNo: string;
  };
}

const OrderConfirmed = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const { address, shiftAddress, router } = useAppContext();
  const [loading, setLoading] = useState(true);

  const getLatestOrder = async () => {
    try {
      const response = await axiosInstance.get("/api/order/userlastestOrder");
      if (response.data.success) {
        setOrderDetails(response.data.latestOrder);
      }
    } catch (error) {
      console.error("Failed to fetch latest order:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    getLatestOrder();
  }, []);

  if (loading || !orderDetails) {
    return <Loading />;
  }

  const formattedDate = new Date(orderDetails.date).toISOString().split("T")[0];
  const subtotal = orderDetails.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  if (loading) {
    return <Loading />;
  }
  const viewOrders = () => {
    router.push("/My-Orders");
  };
  console.log(orderDetails);
  return (
    <div className="w-full px-6 md:px-[90px] py-[54px] bg-white min-h-screen">
       <div className="flex items-center justify-center mb-16 relative  ">
          <div className="w-full max-w-xl relative">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-5 left-5 right-[50%] h-0.5 bg-gray-300 z-0"></div>
              <div className="absolute top-5 left-[50%] right-8 h-0.5 bg-red-500 z-0"></div>

              <div className="flex flex-col items-center z-10">
                <div className="w-10 h-10 rounded-full bg-gray-200  flex items-center justify-center text-gray-500 font-medium">
                  <button className="cursor-not-allowed" disabled>
                  1
                  </button>
                </div>
                <div className="mt-2 text-gray-500 ">Checkout</div>
              </div>

              <div className="flex flex-col items-center z-10">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
                  <button className="cursor-not-allowed" disabled>
                  2
                  </button>
                </div>
                <div className="mt-2 text-gray-500">Payment</div>
              </div>

              <div className="flex flex-col items-center z-10">
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-medium">
                  <button className="cursor-default" >
                  3
                  </button>
                </div>
                <div className="mt-2 text-red-600 font-medium ">Confirmation</div>
              </div>
            </div>
          </div>
        </div>
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold uppercase mb-2 text-red-700">
          Order Confirmation
        </h1>
        <p className="text-gray-600 text-sm">
          Your order has been successfully placed
        </p>
      </div>

      {/* Order Information */}
      <div className="max-w-6xl mx-auto mb-10 ">
        <div className="bg-gray-100 rounded-lg shadow-md p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="uppercase text-sm font-medium text-gray-500">
              Order Number
            </p>
            <p className="mt-1 text-lg font-semibold text-gray-700">
              {orderDetails.orderNumber || "N/A"}
            </p>
          </div>
          <div>
            <p className="uppercase text-sm font-medium text-gray-500">Date</p>
            <p className="mt-1 text-lg font-semibold text-gray-700">
              {formattedDate}
            </p>
          </div>
          <div>
            <p className="uppercase text-sm font-medium text-gray-500">Total</p>
            <p className="mt-1 text-lg font-semibold text-gray-700">
              LKR {orderDetails.amount.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="uppercase text-sm font-medium text-gray-500">
              Payment
            </p>
            <p className="mt-1 text-lg font-semibold text-gray-700">
              {orderDetails.paymentMethod}
            </p>
          </div>
        </div>
      </div>

      {/* Product Summary */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold mb-6 text-center uppercase">
          Order Details
        </h2>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full table-auto border-gray-300">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="text-sm uppercase text-gray-600 w-3/4 p-5">
                  Product
                </th>
                <th className="text-sm uppercase text-gray-600 w-1/4 text-right p-5">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.items.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-5">
                    <div className="flex items-center gap-5">
                      <img
                        src={`http://localhost:5000${
                          item.imageUrl || "/no-image.png"
                        }`}
                        alt={item.name}
                        className="w-[90px] h-[90px] object-cover rounded-md"
                      />
                      <div className="text-sm">
                        <h3 className="text-base text-red-500 font-semibold">{item.name}</h3>
                        <p className="font-medium">
                          Quantity: <span className="text-gray-500">{item.quantity}</span>
                        </p>
                        <p className="font-medium">Size:{" "}<span className="text-gray-500">{item.size}</span> </p>
                        <p className="font-medium">Frame Color:{" "}<span className="text-gray-500">{item.frameColor}</span> </p>
                        <p className="font-medium">Theme Color:{" "}<span className="text-gray-500">{item.themeColor}</span> </p>
                        <p className="font-medium">Custom Text:{" "}<span className="text-gray-500">{item.customText}</span> </p>
                      </div>
                    </div>
                  </td>
                  <td className="text-right p-5 text-gray-500 font-medium">
                    LKR {(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}

              {/* Summary  */}
              <tr className="border-b border-gray-200">
                <td className="p-5 font-medium">Subtotal:</td>
                <td className="text-right p-5 text-gray-500 font-medium">
                  LKR {subtotal.toFixed(2)}
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-5 font-medium">Shipping:</td>
                <td className="text-right p-5 text-gray-500 font-medium">
                  {orderDetails.selectedShippingOption}
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-5 font-medium">Payment Method:</td>
                <td className="text-right p-5 text-gray-500 font-medium">
                  {orderDetails.paymentMethod}
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-5 font-medium">Total:</td>
                <td className="text-right p-5 text-gray-500 font-medium">
                  LKR {orderDetails.amount.toFixed(2)}
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-5  font-medium">Check:</td>
                <td className="text-right p-5 text-gray-500 font-medium">
                  <button
                    className="text-sm text-red-600 border border-gray-300 px-4 py-1 rounded hover:shadow-sm transition cursor-pointer"
                    onClick={viewOrders}
                  >
                    View Order
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    
      <div className="max-w-6xl mx-auto mt-10 flex flex-col md:flex-row gap-[56px]">
        {/* Billing Address */}
        <div className="bg-white rounded-lg drop-shadow-lg w-full md:w-1/2">
          <table className="w-full border-gray-400">
            <thead>
              <tr>
                <th className="uppercase p-4 text-center font-normal  bg-gray-100">
                  Billing Address
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 text-gray-600">
                  {orderDetails.address.FirstName} {address.LastName}
                </td>
              </tr>
              <tr>
                <td className="p-3 text-gray-600">{orderDetails.address.EmailAddress}</td>
              </tr>
              <tr>
                <td className="p-3 text-gray-600">{orderDetails.address.PhoneNumber}</td>
              </tr>
              <tr>
                <td className="p-3 text-gray-600">
                  {orderDetails.address.Provience} , {orderDetails.address.City}
                </td>
              </tr>
              <tr>
                <td className="p-3 text-gray-600">{orderDetails.address.Area}</td>
              </tr>
              {orderDetails.address.HouseNo && (
                <tr>
                  <td className="p-3 text-gray-600">
                    {orderDetails.address.HouseNo}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Shipping Address (Same as billing in this case) */}
        <div className="bg-white rounded-lg drop-shadow-lg w-full md:w-1/2">
          <table className="w-full">
            <thead>
              <tr>
                <th className="uppercase p-4 text-center font-normal  bg-gray-100">
                  Shipping Address
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 text-gray-600">
                  {shiftAddress.FirstName} {shiftAddress.LastName}
                </td>
              </tr>
              <tr>
                <td className="p-3 text-gray-600">
                  {shiftAddress.Provience} , {shiftAddress.City}
                </td>
              </tr>
              <tr>
                <td className="p-3 text-gray-600">{shiftAddress.Area}</td>
              </tr>
              <tr>
                <td className="p-3 text-gray-600">{shiftAddress.HouseNo}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmed;