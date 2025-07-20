"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import axiosInstance from "@/services/api";
import Loading from "@/components/symbol/loading";
import { FaHandPointRight } from "react-icons/fa";
import {
  FiCheckCircle,
  FiTruck,
  FiCreditCard,
  FiCalendar,
  FiTag,
  FiHome,
  FiMapPin,
  FiShoppingBag,
  FiDollarSign,
  FiTruck as FiShipping,
} from "react-icons/fi";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  imageUrl: string;
  customText: string;
  frameColor: string;
  themeColor: string;
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
      setTimeout(() => setLoading(false), 1000);
    }
  };

  useEffect(() => {
    getLatestOrder();
  }, []);

  if (loading || !orderDetails) return <Loading />;

  const formattedDate = new Date(orderDetails.date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const subtotal = orderDetails.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shippingCost = orderDetails.amount - subtotal;

  const viewOrders = () => {
    router.push("/my-account");
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-[450px] bg-[url('/assets/OrderPlaced.png')] bg-cover bg-center bg-no-repeat bg-fixed">
        <div className="max-w-4xl mx-auto relative z-10 px-4 py-16 text-center text-white">
          <FiCheckCircle className="mx-auto text-6xl mb-4" />
          <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-xl opacity-90 mb-6">
            Your order #{orderDetails.orderNumber} has been received.
          </p>
          <p className="text-lg">Confirmation sent to your Email Address</p>
        </div>
      </div>

      {/* Floating Order Summary Cards */}
      <div className="relative z-20 -mt-28 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "ORDER NUMBER",
              value: orderDetails.orderNumber,
              icon: <FiTag />,
              color: "red",
            },
            {
              label: "DATE",
              value: formattedDate,
              icon: <FiCalendar />,
              color: "blue",
            },
            {
              label: "TOTAL",
              value: `LKR ${orderDetails.amount.toFixed(2)}`,
              icon: <FiDollarSign />,
              color: "green",
            },
            {
              label: "PAYMENT METHOD",
              value: orderDetails.paymentMethod,
              icon: <FiCreditCard />,
              color: "purple",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-white/80 rounded-xl shadow-lg p-6 flex items-start space-x-4 hover:shadow-lg transition"
            >
              <div
                className={`p-3 bg-${card.color}-100 rounded-full text-${card.color}-600`}
              >
                {card.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  {card.label}
                </p>
                <p className="text-lg font-semibold">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/*  Notification Box */}
        <div className="mt-6 max-w-3xl mx-auto">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-md shadow-md flex items-start gap-3">
            <FaHandPointRight className="mt-1 text-yellow-600 text-lg" />
            <p className="text-sm leading-relaxed">
              Your order is confirmed.{" "}
              <span className="font-semibold">
                We’ll notify you when it has shipped.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Billing and Shipping Sections */}
        <div className="space-y-6">
          {/* Billing Address */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gray-100 px-6 py-4 border-b">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <FiHome className="text-red-600" />
                Billing Address
              </h3>
            </div>
            <div className="p-6 text-sm">
              <p className="font-medium">
                {orderDetails.address.FirstName} {orderDetails.address.LastName}
              </p>
              <p>{orderDetails.address.EmailAddress}</p>
              <p>{orderDetails.address.PhoneNumber}</p>
              <div className="mt-4 border-t pt-4 text-gray-600">
                <p className="flex items-start gap-2">
                  <FiMapPin className="mt-1 text-gray-400" />
                  <span>
                    {orderDetails.address.HouseNo &&
                      `${orderDetails.address.HouseNo}, `}
                    {orderDetails.address.Area}
                    <br />
                    {orderDetails.address.City},{" "}
                    {orderDetails.address.Provience}
                    <br />
                    {orderDetails.address.ZipCode}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gray-100 px-6 py-4 border-b">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <FiTruck className="text-red-600" />
                Shipping Address
              </h3>
            </div>
            <div className="p-6 text-sm">
              <p className="font-medium">
                {shiftAddress.FirstName} {shiftAddress.LastName}
              </p>
              <div className="mt-4 border-t pt-4 text-gray-600">
                <p className="flex items-start gap-2">
                  <FiMapPin className="mt-1 text-gray-400" />
                  <span>
                    {shiftAddress.HouseNo && `${shiftAddress.HouseNo}, `}
                    {shiftAddress.Area}
                    <br />
                    {shiftAddress.City}, {shiftAddress.Provience}
                  </span>
                </p>
              </div>
              <div className="mt-4 border-t pt-4">
                <h4 className="font-medium text-sm text-gray-500 mb-2">
                  SHIPPING METHOD
                </h4>
                <p className="flex items-center gap-2">
                  <FiShipping className="text-gray-400" />
                  <span>{orderDetails.selectedShippingOption}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details and Summary */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gray-100 px-6 py-4 border-b">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <FiShoppingBag className="text-red-600" />
                Order Details
              </h3>
            </div>

            {/* Items */}
            <div className="divide-y divide-gray-100">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <img
                    src={`http://localhost:5500/products/${item.imageUrl[0]}`}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-semibold text-red-600">
                            {item.name}
                          </p>
                          <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-2 text-sm text-gray-600">
                            <p>Qty: {item.quantity}</p>
                            <p>Size: {item.size}</p>
                            <p>Frame: {item.frameColor}</p>
                            <p>Theme: {item.themeColor}</p>
                            {item.customText && (
                              <p className="col-span-2">
                                Text: {item.customText}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            LKR {(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">
                            LKR {item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t p-6">
              <div className="max-w-md ml-auto space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">LKR {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    LKR {shippingCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold text-red-600">
                    LKR {orderDetails.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => router.push("/shop")}
              className="px-6 py-3 border-2 border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={viewOrders}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors shadow-md"
            >
              View Order History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmed;
