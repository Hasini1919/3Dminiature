export const fetchCoupons = async () => {
  const res = await fetch("http://localhost:5500/api/coupons");
  return res.json();
};

export const fetchCouponById = async (id: string) => {
  const res = await fetch(`http://localhost:5500/api/coupons/${id}`);
  return res.json();
};

export const updateCoupon = async (id: string, data: any) => {
  const res = await fetch(`http://localhost:5500/api/coupons/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteCoupon = async (id: string) => {
  const res = await fetch(`http://localhost:5500/api/coupons/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
