export type Notification = {
  _id: string;
  type: "order" | "refund" | "coupon" | "advertisement";
  message: string;
  isSeen: boolean;
  createdAt: string;
};
