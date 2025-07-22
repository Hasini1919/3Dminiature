'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Order, OrderItem } from "@/types/admin/test/order";
import Image from "next/image";

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params?.orderId as string;

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

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (!order) return <p className="text-center text-red-500 py-4">Order not found.</p>;

  return (
    <div className="p-6 space-y-8" style={{ marginLeft: 280 }}>
      <h1 className="text-2xl font-bold mb-4">Order Details - {order.orderNumber}</h1>

      {order.items.map((item: OrderItem, index: number) => (
        <div key={index} className="border p-6 rounded shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-4">{item.name}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            <div>
              <p className="font-semibold">Frame Color:</p>
              <p>{Array.isArray(item.frameColor) ? item.frameColor.join(", ") : item.frameColor || "-"}</p>
            </div>

            <div>
              <p className="font-semibold">Theme Color:</p>
              <p>{Array.isArray(item.themeColor) ? item.themeColor.join(", ") : item.themeColor || "-"}</p>
            </div>

            <div>
              <p className="font-semibold">Size:</p>
              <p>{Array.isArray(item.size) ? item.size.join(", ") : item.size || "-"}</p>
            </div>

            <div>
              <p className="font-semibold">Quantity:</p>
              <p>{item.quantity}</p>
            </div>

            <div>
              <p className="font-semibold">Price:</p>
              <p>₹{item.price?.toFixed(2)}</p>
            </div>

            <div>
              <p className="font-semibold">Custom Text:</p>
              <p>{item.customText || "-"}</p>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">Product Images:</p>
            <div className="flex flex-wrap gap-4">
              {(Array.isArray(item.imageUrl) ? item.imageUrl : []).map((img, i) => (
                <Image
                  key={`product-img-${i}`}
                  src={`http://localhost:5500/images/${img}`}
                  alt={`Product Image ${i + 1}`}
                  width={120}
                  height={120}
                  className="rounded border object-cover"
                />
              ))}

              {(Array.isArray(item.uploadedImage) ? item.uploadedImage : [item.uploadedImage]).map(
                (img, i) =>
                  img ? (
                    <Image
                      key={`uploaded-img-${i}`}
                      src={`http://localhost:5500${img}`}
                      alt={`Uploaded Image ${i + 1}`}
                      width={120}
                      height={120}
                      className="rounded border object-cover"
                    />
                  ) : null
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
