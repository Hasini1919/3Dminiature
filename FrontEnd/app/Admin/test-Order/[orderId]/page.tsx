// ///use here
// 'use client';
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Order, OrderItem } from "@/types/admin/test/order";
// import Image from "next/image";

// export default function OrderDetailsPage() {
//   const params = useParams();
//   const orderId = params?.orderId as string;

//   const [order, setOrder] = useState<Order | null>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const res = await fetch(`http://localhost:5500/api/orders/${orderId}`);
//         if (!res.ok) {
//           throw new Error("Order not found");
//         }
//         const data = await res.json();
//         setOrder(data);
//       } catch (error) {
//         console.error("Error fetching order:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (orderId) {
//       fetchOrder();
//     }
//   }, [orderId]);

//   if (loading)
//     return (
//       <div
//         className="flex items-center justify-center min-h-screen bg-gray-50"
//         style={{ marginLeft: 280 }}
//       >
//         <div className="flex flex-col items-center space-y-4">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           <p className="text-gray-600 font-medium">Loading order details...</p>
//         </div>
//       </div>
//     );

//   if (!order)
//     return (
//       <div
//         className="flex items-center justify-center min-h-screen bg-gray-50"
//         style={{ marginLeft: 280 }}
//       >
//         <div className="text-center bg-white p-8 rounded-lg shadow-lg">
//           <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
//             <svg
//               className="w-8 h-8 text-red-600"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
//               />
//             </svg>
//           </div>
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">Order Not Found</h2>
//           <p className="text-gray-600">The requested order could not be found.</p>
//         </div>
//       </div>
//     );

//   function downloadImage(url: string, filename: string) {
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = filename || "download";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }

//   return (
//     <div className="min-h-screen bg-gray-50" style={{ marginLeft: 280 }}>
//       <div className="p-8 space-y-8">

//         <div className="flex justify-start">
//           <button
//             onClick={() => router.push("/Admin/test-Order")}
//             className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
//           >
//             ← Back to Orders
//           </button>
//         </div>


//         {/* Header Section */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
//               <svg
//                 className="w-6 h-6 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                 />
//               </svg>
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
//               <p className="text-gray-600 font-medium">Order #{order.orderNumber}</p>
//             </div>
//           </div>
//         </div>


//         {/* Order Items */}
//         <div className="space-y-6">
//           {order.items.map((item: OrderItem, index: number) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
//             >
//               {/* Item Header */}
//               <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
//                   <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
//                     Item {index + 1}
//                   </span>
//                 </div>
//               </div>

//               <div className="p-6">
//                 {/* Product Specifications Grid */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                   {/* Frame Color */}
//                   <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                     <div className="flex items-center space-x-2 mb-2">
//                       <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                       <p className="font-semibold text-gray-900">Frame Color</p>
//                     </div>
//                     <p className="text-gray-700 font-medium">
//                       {Array.isArray(item.frameColor)
//                         ? item.frameColor.join(", ")
//                         : item.frameColor || "Not specified"}
//                     </p>
//                   </div>

//                   {/* Theme Color */}
//                   <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                     <div className="flex items-center space-x-2 mb-2">
//                       <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
//                       <p className="font-semibold text-gray-900">Theme Color</p>
//                     </div>
//                     <p className="text-gray-700 font-medium">
//                       {Array.isArray(item.themeColor)
//                         ? item.themeColor.join(", ")
//                         : item.themeColor || "Not specified"}
//                     </p>
//                   </div>

//                   {/* Size */}
//                   <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                     <div className="flex items-center space-x-2 mb-2">
//                       <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                       <p className="font-semibold text-gray-900">Size</p>
//                     </div>
//                     <p className="text-gray-700 font-medium">
//                       {Array.isArray(item.size) ? item.size.join(", ") : item.size || "Not specified"}
//                     </p>
//                   </div>

//                   {/* Quantity */}
//                   <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                     <div className="flex items-center space-x-2 mb-2">
//                       <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                       <p className="font-semibold text-gray-900">Quantity</p>
//                     </div>
//                     <p className="text-gray-700 font-medium text-lg">{item.quantity}</p>
//                   </div>

//                   {/* Price */}
//                   <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                     <div className="flex items-center space-x-2 mb-2">
//                       <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//                       <p className="font-semibold text-gray-900">Price</p>
//                     </div>
//                     <p className="text-gray-700 font-bold text-lg">₹{item.price?.toFixed(2)}</p>
//                   </div>

//                   {/* Custom Text */}
//                   <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                     <div className="flex items-center space-x-2 mb-2">
//                       <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
//                       <p className="font-semibold text-gray-900">Custom Text</p>
//                     </div>
//                     <p className="text-gray-700 font-medium">{item.customText || "No custom text"}</p>
//                   </div>
//                 </div>

//                 {/* Images Section */}
//                 <div className="border-t border-gray-200 pt-6">
//                   <div className="flex items-center space-x-2 mb-4">
//                     <svg
//                       className="w-5 h-5 text-gray-600"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                       />
//                     </svg>
//                     <p className="font-semibold text-gray-900 text-lg">Product Images</p>
//                   </div>

//                   {/* Product Images (no download) */}
//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//                     {(Array.isArray(item.imageUrl) ? item.imageUrl : []).map((img, i) => (
//                       <div
//                         key={`product-img-${i}`}
//                         className="group relative"
//                       >
//                         <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-300 transition-colors duration-200">
//                           <Image
//                             src={`http://localhost:5500/images/${img}`}
//                             alt={`Product Image ${i + 1}`}
//                             width={120}
//                             height={120}
//                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
//                           />
//                         </div>
//                         <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
//                           <span className="text-white text-xs font-bold">{i + 1}</span>
//                         </div>
//                       </div>
//                     ))}

//                     {/* Uploaded Images with download button */}
//                     {(Array.isArray(item.uploadedImage) ? item.uploadedImage : [item.uploadedImage]).map(
//                       (img, i) =>
//                         img ? (
//                           <div
//                             key={`uploaded-img-${i}`}
//                             className="group relative"
//                           >
//                             <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-green-300 transition-colors duration-200">
//                               <Image
//                                 src={`http://localhost:5500${img}`}
//                                 alt={`Uploaded Image ${i + 1}`}
//                                 width={120}
//                                 height={120}
//                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
//                               />
//                             </div>

//                             <div className="absolute -top-2 -right-8 flex space-x-1">
//                               {/* Number badge */}
//                               <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
//                                 <svg
//                                   className="w-3 h-3 text-white"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                                   />
//                                 </svg>
//                               </div>

//                               {/* Download button */}
//                               <button
//                                 onClick={() => downloadImage(`http://localhost:5500${img}`, `image_${i + 1}.jpg`)}
//                                 className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700"
//                                 title="Download Image"
//                               >
//                                 <svg
//                                   className="w-4 h-4 text-white"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                   xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8m0 0l-4-4m4 4l4-4M12 4v8"
//                                   ></path>
//                                 </svg>
//                               </button>
//                             </div>
//                           </div>
//                         ) : null
//                     )}
//                   </div>

//                   {/* Empty state for images */}
//                   {!item.imageUrl && (!item.uploadedImage || item.uploadedImage.length === 0) && (
//                     <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
//                       <svg
//                         className="w-12 h-12 text-gray-400 mx-auto mb-4"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                         />
//                       </svg>
//                       <p className="text-gray-500 font-medium">No images available for this item</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
