'use client';

import { useEffect, useState } from "react";
import { fetchCoupons } from "@/utils/Admin/test/coupon";

type Coupon = {
  _id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  validFrom: string;
  validTo: string;
  minPurchaseAmount: number;
  maxUses: number | null;
  usedCount: number;
  active: boolean;
};

export default function CouponPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    fetchCoupons().then(setCoupons);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Coupons</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Code</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Value</th>
              <th className="px-4 py-2 border">Valid</th>
              <th className="px-4 py-2 border">Min Purchase</th>
              <th className="px-4 py-2 border">Max Uses</th>
              <th className="px-4 py-2 border">Used</th>
              <th className="px-4 py-2 border">Active</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id}>
                <td className="px-4 py-2 border">{coupon.code}</td>
                <td className="px-4 py-2 border">{coupon.discountType}</td>
                <td className="px-4 py-2 border">
                  {coupon.discountType === "percentage"
                    ? `${coupon.discountValue}%`
                    : `₹${coupon.discountValue}`}
                </td>
                <td className="px-4 py-2 border">
                  {new Date(coupon.validFrom).toLocaleDateString()} -{" "}
                  {new Date(coupon.validTo).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border">₹{coupon.minPurchaseAmount}</td>
                <td className="px-4 py-2 border">{coupon.maxUses ?? "Unlimited"}</td>
                <td className="px-4 py-2 border">{coupon.usedCount}</td>
                <td className="px-4 py-2 border">
                  {coupon.active ? "✅" : "❌"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
