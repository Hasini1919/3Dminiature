'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Order, OrderItem } from "@/types/admin/test/order";
import Image from "next/image";

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params?.orderId as string;
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:5500/api/orders/${orderId}`);
        if (!res.ok) {
          throw new Error("Order not found");
        }
        const data = await res.json();
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading)
    return (
      <div
        className="flex items-center justify-center min-h-screen bg-slate-50"
        style={{ marginLeft: 150 }}
      >
        <div className="flex flex-col items-center space-y-4 bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-indigo-600"></div>
          <p className="text-slate-700 font-semibold text-lg">Loading Order Details...</p>
        </div>
      </div>
    );

  if (!order)
    return (
      <div
        className="flex items-center justify-center min-h-screen bg-slate-50"
        style={{ marginLeft: 280 }}
      >
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl border border-red-200">
          <div className="w-20 h-20 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Order Not Found</h2>
          <p className="text-slate-600 text-lg">The requested order could not be located in the system.</p>
        </div>
      </div>
    );

  function downloadImage(url: string, filename: string) {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="min-h-screen bg-slate-50" style={{ marginLeft: 130 }}>
      <div className="p-8 max-w-7xl mx-auto space-y-8">

        <div className="flex justify-start">
          <button
            onClick={() => router.push("/Admin/test-Order")}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            ← Back to Orders
          </button>
        </div>

        {/* Professional Header with Company Branding */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold">ORDER PRODUCTION SHEET</h1>
                <p className="text-indigo-100 text-lg font-medium">Order #{order.orderNumber}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-indigo-100 text-sm">Generated on</p>
              <p className="text-white font-semibold">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>



        {/* Order Status Management */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-slate-100 px-8 py-4 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 flex items-center">
              <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
              ORDER STATUS CONTROL
            </h2>
          </div>
          <div className="p-8">
            <div className="flex items-center space-x-4">
              <label className="text-slate-700 font-semibold text-lg">Current Status:</label>
              <select
                value={order.status}
                onChange={async (e) => {
                  const newStatus = e.target.value;
                  const res = await fetch(`http://localhost:5500/api/orders/status/${order.orderNumber}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: newStatus }),
                  });
                  if (res.ok) {
                    const updated = await res.json();
                    setOrder((prev) => prev && { ...prev, status: updated.order.status });
                  }
                }}
                className="px-6 py-3 border-2 border-slate-300 rounded-xl text-lg font-semibold bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Customer Information - Critical for Production */}
        <div className="bg-white border-2 border-blue-200 rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b-2 border-blue-200">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center">
              <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              CUSTOMER & DELIVERY INFORMATION
            </h2>
            <p className="text-blue-600 font-medium mt-1">Critical information for order fulfillment</p>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Customer Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 border-b-2 border-slate-200 pb-2">CUSTOMER DETAILS</h3>

                <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <span className="text-slate-600 font-semibold">Full Name:</span>
                    <span className="text-slate-900 font-bold text-lg">{order.address.FirstName} {order.address.LastName}</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <span className="text-slate-600 font-semibold">Phone Number:</span>
                    <span className="text-slate-900 font-bold text-lg">{order.address.PhoneNumber}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-semibold">Email:</span>
                    <span className="text-slate-900 font-bold">{(order as any)?.customer?.email || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Shipping & Payment */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 border-b-2 border-slate-200 pb-2">SHIPPING & PAYMENT</h3>

                <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <span className="text-slate-600 font-semibold">Shipping Method:</span>
                    <span className="text-slate-900 font-bold">{order.selectedShippingOption}</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <span className="text-slate-600 font-semibold">Payment Method:</span>
                    <span className="text-slate-900 font-bold">{order.paymentMethod}</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <span className="text-slate-600 font-semibold">Payment Status:</span>
                    {/* Payment Status Toggle */}
                    <div className="flex items-center space-x-4 mt-6">
                      <p className="text-lg font-medium text-gray-800">Payment Status:</p>
                      
                      <button
                        onClick={async () => {
                          try {
                            // Change orderId to order._id
                            const res = await fetch(`http://localhost:5500/api/orders/payment/${order._id}`, {
                              method: "PATCH",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({ payment: !order.payment }),
                            });
                            if (!res.ok) throw new Error("Failed to update payment status");
                            const updated = await res.json();
                            setOrder((prev) => prev && { ...prev, payment: updated.payment });
                          } catch (error) {
                            console.error("Error updating payment:", error);
                            alert("Failed to update payment status.");
                          }
                        }}
                      ><span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${order.payment ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                    >
                      {order.payment ? "Paid" : "Not Paid"}
                    </span>
                         {/* {order.payment ? "Not Paid" : "Paid"} */}
                      </button>
                    </div>

                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-semibold">Total Amount:</span>
                    <span className="text-slate-900 font-bold text-2xl">Rs.{order.amount?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Address - Highlighted */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                DELIVERY ADDRESS
              </h3>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <p className="text-slate-900 font-bold text-lg leading-relaxed">
                  {order.address.HouseNo}, {order.address.Area},<br />
                  {order.address.City}, {order.address.District},<br />
                  {order.address.Provience}
                </p>
                {order.address.AnyInformation && (
                  <div className="mt-4 pt-4 border-t border-green-200">
                    <p className="text-slate-600 font-semibold">Special Instructions:</p>
                    <p className="text-slate-900 font-medium">{order.address.AnyInformation}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Production Items - Enhanced for Manufacturing */}
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-bold flex items-center">
              <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5.586 5.586c.781.781.781 2.047 0 2.828l-1.172 1.172c-.781.781-2.047.781-2.828 0l-5.586-5.586A2 2 0 0111 14.172V5L8 4z" />
              </svg>
              PRODUCTION SPECIFICATIONS
            </h2>
            <p className="text-purple-100 text-lg">Detailed requirements for each item</p>
          </div>

          {order.items.map((item: OrderItem, index: number) => (
            <div
              key={index}
              className="bg-white border-2 border-slate-200 rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Item Header with Production Priority */}
              <div className="bg-gradient-to-r from-slate-100 to-slate-200 px-8 py-6 border-b-2 border-slate-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">{item.name}</h3>
                    <p className="text-slate-600 font-semibold">Production Item #{index + 1}</p>
                  </div>
                  <div className="bg-indigo-600 text-white px-6 py-3 rounded-xl">
                    <span className="text-2xl font-bold">Rs.{item.price?.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {/* Critical Production Specifications */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                    CRITICAL SPECIFICATIONS
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Frame Color */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6">
                      <div className="flex items-center mb-3">
                        <div className="w-4 h-4 bg-purple-500 rounded-full mr-3"></div>
                        <h5 className="font-bold text-slate-900 text-lg">FRAME COLOR</h5>
                      </div>
                      <p className="text-slate-800 font-bold text-xl">
                        {Array.isArray(item.frameColor)
                          ? item.frameColor.join(", ")
                          : item.frameColor || "NOT SPECIFIED"}
                      </p>
                    </div>

                    {/* Theme Color */}
                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-200 rounded-xl p-6">
                      <div className="flex items-center mb-3">
                        <div className="w-4 h-4 bg-pink-500 rounded-full mr-3"></div>
                        <h5 className="font-bold text-slate-900 text-lg">THEME COLOR</h5>
                      </div>
                      <p className="text-slate-800 font-bold text-xl">
                        {Array.isArray(item.themeColor)
                          ? item.themeColor.join(", ")
                          : item.themeColor || "NOT SPECIFIED"}
                      </p>
                    </div>

                    {/* Size */}
                    <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6">
                      <div className="flex items-center mb-3">
                        <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                        <h5 className="font-bold text-slate-900 text-lg">SIZE</h5>
                      </div>
                      <p className="text-slate-800 font-bold text-xl">
                        {Array.isArray(item.size) ? item.size.join(", ") : item.size || "NOT SPECIFIED"}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6">
                      <div className="flex items-center mb-3">
                        <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                        <h5 className="font-bold text-slate-900 text-lg">QUANTITY</h5>
                      </div>
                      <p className="text-slate-800 font-bold text-3xl">{item.quantity}</p>
                    </div>

                    {/* Custom Text */}
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200 rounded-xl p-6 md:col-span-2">
                      <div className="flex items-center mb-3">
                        <div className="w-4 h-4 bg-indigo-500 rounded-full mr-3"></div>
                        <h5 className="font-bold text-slate-900 text-lg">CUSTOM TEXT</h5>
                      </div>
                      <p className="text-slate-800 font-bold text-lg">
                        {item.customText || "NO CUSTOM TEXT REQUIRED"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Production Images Section */}
                <div className="border-t-2 border-slate-200 pt-8">
                  <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                    <svg className="w-6 h-6 text-slate-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    PRODUCTION REFERENCE IMAGES
                  </h4>

                  <div className="space-y-8">
                    {/* Product Images */}
                    {(Array.isArray(item.imageUrl) ? item.imageUrl : []).length > 0 && (
                      <div>
                        <h5 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                          <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                          PRODUCT REFERENCE IMAGES
                        </h5>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                          {(Array.isArray(item.imageUrl) ? item.imageUrl : []).map((img, i) => (
                            <div key={`product-img-${i}`} className="group relative">
                              <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden border-3 border-slate-300 hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl">
                                <Image
                                  src={`http://localhost:5500/images/${img}`}
                                  alt={`Product Reference ${i + 1}`}
                                  width={150}
                                  height={150}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white text-sm font-bold">{i + 1}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Customer Uploaded Images */}
                    {(Array.isArray(item.uploadedImage) ? item.uploadedImage : [item.uploadedImage]).some(img => img) && (
                      <div>
                        <h5 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                          <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                          CUSTOMER PROVIDED IMAGES
                        </h5>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                          {(Array.isArray(item.uploadedImage) ? item.uploadedImage : [item.uploadedImage]).map(
                            (img, i) =>
                              img ? (
                                <div key={`uploaded-img-${i}`} className="group relative">
                                  <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden border-3 border-slate-300 hover:border-green-400 transition-all duration-300 shadow-lg hover:shadow-xl">
                                    <Image
                                      src={`http://localhost:5500${img}`}
                                      alt={`Customer Image ${i + 1}`}
                                      width={150}
                                      height={150}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                  </div>

                                  <div className="absolute -top-3 -right-12 flex space-x-2">
                                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                      </svg>
                                    </div>

                                    <button
                                      onClick={() => downloadImage(`http://localhost:5500${img}`, `customer_image_${i + 1}.jpg`)}
                                      className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-lg"
                                      title="Download Customer Image"
                                    >
                                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8m0 0l-4-4m4 4l4-4M12 4v8" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              ) : null
                          )}
                        </div>
                      </div>
                    )}

                    {/* No Images State */}
                    {!item.imageUrl && (!item.uploadedImage || item.uploadedImage.length === 0) && (
                      <div className="text-center py-16 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300">
                        <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-slate-500 font-bold text-lg">NO REFERENCE IMAGES PROVIDED</p>
                        <p className="text-slate-400">Contact customer for clarification if needed</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Production Footer */}
        <div className="bg-slate-800 text-white rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">PRODUCTION CHECKLIST COMPLETE</h3>
          <p className="text-slate-300">All specifications verified • Ready for manufacturing</p>
          <div className="mt-4 text-sm text-slate-400">
            Document generated: {new Date().toLocaleString()} | Order #{order.orderNumber}
          </div>
        </div>
      </div>
    </div>
  );
}