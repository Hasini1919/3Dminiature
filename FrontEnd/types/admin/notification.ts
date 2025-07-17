// Base Notification structure from the backend
export interface Notification {
  _id: string;
  type: string; // e.g., "Order", "Message"
  message: string;
  seen: boolean;
  createdAt: string;
}
