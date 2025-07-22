export const createCoupon = async (couponData: any) => {
    const res = await fetch("http://localhost:5500/api/coupons/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(couponData),
    });
    return res.json();
  };
  