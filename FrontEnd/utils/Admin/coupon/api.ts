// export async function addCoupon(data: {
//     code: string;
//     type: "percentage" | "flat";
//     value: number;
//     minOrderAmount?: number;
//     productId?: string;
//     expiresAt: string;
//   }) {
//     const response = await fetch("http://localhost:5500/api/coupons", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });
//     if (!response.ok) {
//       throw new Error("Failed to add coupon");
//     }
//     return response.json();
//   }
  