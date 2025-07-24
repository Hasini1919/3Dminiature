import Navbar from "@/components/Admin_sidebar/Slidebar";
import { Order } from "@/types/admin/test/order"; // Adjust path if needed
import { getOrdersByUserId } from "@/utils/Admin/test/fetchcustomer"; // Your fetch util
import React from "react";

type CustomerPageProps = {
  params: {
    id: string;
  };
};


export default async function CustomerPage({ params }: CustomerPageProps) {
  const userId = params.id;

  const orders: Order[] = await getOrdersByUserId(userId);

  if (!orders || orders.length === 0) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Navbar />
        <div className="pl-72 pt-8 px-6 w-full">
          <div className="max-w-2xl mx-auto mt-20">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-5m-11 0H4"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No Customer Data Found</h3>
              <p className="text-gray-500 text-lg">The customer information you're looking for could not be retrieved.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { address } = orders[0];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="pl-72 pt-20 px-8 w-full">
        {/* Enhanced Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-700 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">Customer Profile</h1>
                  <p className="text-gray-600 text-lg">Complete order history and customer details</p>
                </div>
              </div>
              <div className="text-right">
                {/* <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 font-semibold">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Active Customer
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Customer Information - Left Column */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-400 via-gray-400 to-gray-300 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <svg className="w-6 h-6 text-blue-200 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Personal Information
                </h2>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 block">Full Name</label>
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl px-5 py-4 border border-gray-200 group-hover:shadow-md transition-all duration-200">
                      <p className="text-xl font-bold text-gray-900">
                        {address.FirstName} {address.LastName}
                      </p>
                    </div>
                  </div>

                  <div className="group">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 block">Phone Number</label>
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl px-5 py-4 border border-gray-200 group-hover:shadow-md transition-all duration-200">
                      <p className="text-xl font-bold text-gray-900">
                        {address.PhoneNumber || "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-400 via-gray-400 to-gray-300 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <svg className="w-6 h-6 text-emerald-200 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Address Details
                </h2>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="group">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 block">House No.</label>
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl px-4 py-3 border border-gray-200 group-hover:shadow-md transition-all duration-200">
                      <p className="text-lg font-semibold text-gray-900">{address.HouseNo || "-"}</p>
                    </div>
                  </div>

                  <div className="group">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 block">Area</label>
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl px-4 py-3 border border-gray-200 group-hover:shadow-md transition-all duration-200">
                      <p className="text-lg font-semibold text-gray-900">{address.Area || "-"}</p>
                    </div>
                  </div>

                  <div className="group">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 block">City</label>
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl px-4 py-3 border border-gray-200 group-hover:shadow-md transition-all duration-200">
                      <p className="text-lg font-semibold text-gray-900">{address.City || "-"}</p>
                    </div>
                  </div>

                  <div className="group">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 block">District</label>
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl px-4 py-3 border border-gray-200 group-hover:shadow-md transition-all duration-200">
                      <p className="text-lg font-semibold text-gray-900">{address.District || "-"}</p>
                    </div>
                  </div>

                  <div className="group lg:col-span-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 block">Province</label>
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl px-4 py-3 border border-gray-200 group-hover:shadow-md transition-all duration-200">
                      <p className="text-lg font-semibold text-gray-900">{address.Provience || "-"}</p>
                    </div>
                  </div>
                </div>

                {address.AnyInformation && (
                  <div className="mt-8">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 block">Additional Information</label>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl px-6 py-4 shadow-sm">
                      <p className="text-lg text-gray-900 leading-relaxed">{address.AnyInformation}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Orders History Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r  from-gray-400 via-gray-400 to-gray-300 px-8 py-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <svg className="w-6 h-6 text-purple-200 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                    Order History
                  </h2>
                  <span className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 text-white font-bold text-lg">
                    {orders.length} Orders
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="space-y-6">
                  {orders.map((order, index) => (
                    <div key={order._id} className="group relative">
                      <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl border-2 border-gray-200 p-6 hover:shadow-xl hover:border-gray-300 transition-all duration-300">
                        
                        {/* Order Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-4 border-b border-gray-200">
                          <div className="flex items-center mb-4 sm:mb-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                              <span className="text-white font-bold text-lg">{index + 1}.</span>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">Order #{order.orderNumber}</h3>
                              <p className="text-sm text-gray-500 font-medium">ID: {order._id}</p>
                            </div>
                          </div>
                          <div className="flex flex-col sm:items-end space-y-2">
                            <span
                              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold shadow-sm ${
                                order.payment 
                                  ? "bg-green-100 text-green-800 border border-green-200" 
                                  : "bg-red-100 text-red-800 border border-red-200"
                              }`}
                            >
                              <div className={`w-2 h-2 rounded-full mr-2 ${order.payment ? "bg-green-500" : "bg-red-500"}`}></div>
                              {order.payment ? "Payment Completed" : "Payment Pending"}
                            </span>
                            <span className="text-2xl font-bold text-gray-900">Rs.{order.amount.toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Order Details Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          
                          {/* Left Column - Order Info */}
                          <div className="space-y-4">
                            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                              <h4 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wide">Order Details</h4>
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-600 font-medium">Payment Method:</span>
                                  <span className="font-bold text-gray-900">{order.paymentMethod || "Not specified"}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-600 font-medium">Shipping Option:</span>
                                  <span className="font-bold text-gray-900">{order.selectedShippingOption || "Standard"}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-600 font-medium">Order Date:</span>
                                  <span className="font-bold text-gray-900">{new Date(order.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                  <span className="text-gray-600 font-medium">Status:</span>
                                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    order.status === 'Completed' 
                                      ? 'bg-green-100 text-green-800' 
                                      : order.status === 'Processing'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : order.status === 'Canceled'
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-blue-100 text-blue-800'
                                      
                                  }`}>
                                    {order.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right Column - Delivery Address */}
                          <div>
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-200 shadow-sm">
                              <h4 className="font-bold text-blue-800 mb-3 text-sm uppercase tracking-wide flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                </svg>
                                Delivery Address
                              </h4>
                              <div className="space-y-2 text-sm">
                                <p className="font-bold text-gray-900">{order.address.FirstName} {order.address.LastName}</p>
                                <p className="text-gray-700 font-medium">{order.address.HouseNo}, {order.address.Area}</p>
                                <p className="text-gray-700 font-medium">{order.address.City}, {order.address.District}</p>
                                <p className="text-gray-700 font-medium">{order.address.Provience}</p>
                                <div className="pt-2 border-t border-blue-200">
                                  <p className="text-gray-700 font-medium"> {order.address.PhoneNumber}</p>
                                  {order.address.AnyInformation && (
                                    <p className="text-gray-600 text-xs mt-2 italic bg-white bg-opacity-60 rounded p-2 border border-blue-200">
                                       {order.address.AnyInformation}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Summary Cards */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden sticky top-8">
              <div className="bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 px-6 py-5">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <svg className="w-5 h-5 text-red-200 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  Order Analytics
                </h2>
              </div>

              <div className="p-6">
                <div className="text-center space-y-6">
                  <div className="bg-gradient-to-br from-emerald-700   to-green-300  rounded-2xl p-6 text-white shadow-lg">
                    <div className="w-12 h-12 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M8 11v6h8v-6M8 11h8"></path>
                      </svg>
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-widest mb-2 opacity-90">Total Orders</p>
                    <p className="text-4xl font-black">{orders.length}</p>
                  </div>

                  <div className="bg-gradient-to-br from-red-400   to-red-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="w-12 h-12 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                      </svg>
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-widest mb-2 opacity-90">Revenue Generated</p>
                    <p className="text-3xl font-black">
                      Rs.{orders
                        .filter((order: Order) => order.status === "Completed" && order.payment)
                        .reduce((sum: number, order: Order) => sum + order.amount, 0)
                        .toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Status */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-5">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <svg className="w-5 h-5 text-teal-200 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Customer Status
                </h3>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {/* <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <span className="font-semibold text-gray-700">Account Status</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800 border border-green-300">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      Active
                    </span>
                  </div> */}

                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Customer ID:</span>
                      <span className="font-bold text-gray-900 font-mono text-sm bg-gray-100 px-2 py-1 rounded">{userId}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Member Since:</span>
                      <span className="font-bold text-gray-900">
                        {orders.length > 0 ? new Date(Math.min(...orders.map(o => new Date(o.date).getTime()))).toLocaleDateString() : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Last Order:</span>
                      <span className="font-bold text-gray-900">
                        {orders.length > 0 ? new Date(Math.max(...orders.map(o => new Date(o.date).getTime()))).toLocaleDateString() : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}