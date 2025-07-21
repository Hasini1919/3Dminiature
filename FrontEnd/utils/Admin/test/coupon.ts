export const fetchCoupons = async () => {
    const res = await fetch("http://localhost:5500/api/coupons");
    return res.json();
  };
  
  export const validateCoupon = async (code: string, totalAmount: number) => {
    const res = await fetch("http://localhost:5500/api/coupons/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, totalAmount }),
    });
    return res.json();
  };
  