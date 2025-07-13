"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/services/api";
import { GiEmptyHourglass } from "react-icons/gi";
import { RxCrossCircled } from "react-icons/rx";


interface Address{
    Provience:string,
    District:string,
    City:string,
    Area:string,
    HouseNo:string,
    
}
interface OrderItem {
  productId: string;
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  imageUrl: string;
  status: string;
  payment: boolean;
  paymentMethod: string;
  date: number;
  OrderId:string;
  address:Address;
  //Amount:number,
}


interface FilterOrderProps {
    endpoint: string;
    params?: Record<string, string | string[]>;
  }
  

const FilterOrders: React.FC<FilterOrderProps> = ({ endpoint, params }) => {
  
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [isSpinning, setIsSpinning] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [showModal, setShowModal] = useState(false);

  const loadOrderData = async () => {
    try {
      
      const response = await axiosInstance.get(endpoint, {
        params,
        withCredentials: true,
      });
      console.log(response.data);
      if (response.data.success) {
        let allOrderItem: OrderItem[] = [];
        
        response.data.orders.forEach((order: any) => {
          order.items.forEach((item: any) => {
            allOrderItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
              OrderId: order.orderNumber,
              address:order.address,
              //Amount:order.amount,
            });
          });
        });
        console.log(allOrderItem);
        setOrders(allOrderItem.reverse());
      }
    } catch (error) {
      console.error("Error loading order data:", error);
    }
  };
 
  useEffect(() => {
    loadOrderData();
    const timer = setTimeout(() => setIsSpinning(false), 1000);
    return () => clearTimeout(timer);
  },[endpoint,params]);

  return (
    <>
      {orders.length > 0 ? (
        <>
          {orders.map((order, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-2 p-3 rounded-lg border shadow-inner border-gray-300 items-center transition-transform duration-300 transform hover:scale-[1.02] hover:shadow-md hover:bg-gray-50"
            >
              {/* Image + Details */}
              <div className="col-span-8 grid grid-cols-12 items-center gap-4">
                <img
                  src={`http://localhost:5500${order.imageUrl}`}
                  alt={order.name}
                  width={50}
                  height={50}
                  className="object-cover rounded-md col-span-2"
                />
                <h2 className="text-base font-semibold col-span-3">
                  {order.name}
                </h2>
                <p className="text-gray-600 text-[12px] col-span-3">
                  LKR {order.price}.00 · Quantity: {order.quantity} · Size:{" "}
                  {order.size}
                </p>
                <p className="text-gray-600 text-sm col-span-2">
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(order.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p className="text-gray-600 text-sm col-span-2 text-center">
                  Payment: {order.paymentMethod}
                </p>
              </div>

              {/* Status */}
              <div className="col-span-2 flex justify-center items-center">
                <span
                  className={`text-xs px-1 py-1 rounded ${
                    order.status === "Shipped"
                      ? "bg-green-500 text-white"
                      : order.status === "Pending"
                      ? "bg-yellow-500"
                      : order.status === "Order Placed"
                      ? "bg-gray-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Button */}
              <div className="col-span-2 flex justify-center items-center">
                <button
                  className="text-sm text-white border  px-4 py-1 rounded hover:shadow-sm transition cursor-pointer bg-black"
                  onClick={()=>{
                   setSelectedOrder(order);
                   setShowModal(true);
                  }

                  }
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-full gap-2">
          <GiEmptyHourglass
            size={40}
            className={`${isSpinning ? "animate-spin" : ""}`}
          />
          <h1>No matching orders found</h1>
          <p className="text-sm text-gray-500">
            You have no orders for this category.
          </p>
        </div>
       )}
      {showModal && selectedOrder && 
      (
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg shadow-lg p-12 w-[50%]  relative grid grid-rows-12 gap-3 ">
        <div className="row-span-1 flex justify-between items-center relative">
        <button
        onClick={() => setShowModal(false)}
        className=" text-gray-600 hover:text-black text-xl cursor-pointer  right-0.5 absolute">
        <RxCrossCircled/>
        </button>
        </div>
        <div className="row-span-6 grid grid-rows-12 ">
          <div className="row-span-2 grid grid-cols-12 text-left">
            <div className="col-span-6">Order Id</div>
            <div className="col-span-6 text-right text-gray-500">{selectedOrder.OrderId}</div>
          </div>
          <div className="row-span-2 grid grid-cols-12">
            <div className="col-span-6">Order Date</div>
            <div className="col-span-6 text-right text-gray-500">{new Date(selectedOrder.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}</div>
          </div>
          <div className="row-span-2 grid grid-cols-12">
            <div className="col-span-6">Order Price</div>
            <div className="col-span-6 text-right text-gray-500">{selectedOrder.price}</div>
          </div>
          <div className="row-span-2 grid grid-cols-12">
            <div className="col-span-6">Payment Method</div>
            <div className="col-span-6 text-right text-gray-500">{selectedOrder.paymentMethod}</div>
          </div>
          <div className="row-span-2 grid grid-cols-12">
            <div className="col-span-6">Payment Status</div>
            <div className="col-span-6 text-right  "><span className="">{selectedOrder.status}</span></div>
          </div>
          <div className="row-span-2 grid grid-cols-12">
            <div className="col-span-6">Order Status</div>
            <div className="col-span-6 text-right "><span
            className={`text-xs px-1 py-1 rounded ${
                selectedOrder.status === "Shipped"
                  ? "bg-green-500 text-white"
                  : selectedOrder.status === "Pending"
                  ? "bg-yellow-500"
                  : selectedOrder.status === "Order Placed"
                  ? "bg-gray-500 text-white"
                  : "bg-red-500 text-white"
              }`}>{selectedOrder.status}</span></div>
          </div>
        </div>
        <div className="row-span-1 grid grid-cols-12 ">
         <p className="col-span-4 text-left">Title:<span className="text-gray-500"> {selectedOrder.name}</span></p>
         <p className="col-span-4 text-center">Quantity:<span className="text-gray-500"> {selectedOrder.quantity}</span></p>
         <p className="col-span-4 text-right">Price:<span className="text-gray-500"> {selectedOrder.price}</span></p>
        </div>
        <div className="row-span-4 grid grid-rows-6">
         <p className="row-span-1">Shipping Info</p>
         <p className="row-span-1 text-gray-500">{selectedOrder.address.Provience}</p>
         <p className="row-span-1 text-gray-500">{selectedOrder.address.District}</p>
         <p className="row-span-1 text-gray-500">{selectedOrder.address.City}</p>
         <p className="row-span-1 text-gray-500">{selectedOrder.address.Area}</p>
         <p className="row-span-1 text-gray-500">{selectedOrder.address.HouseNo}</p>
        </div>
        </div>
         
       </div>
      )
      }
    </>
  );
};

export default FilterOrders;