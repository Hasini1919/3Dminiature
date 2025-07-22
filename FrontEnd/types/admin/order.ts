export interface Order {
  _id: string;
  userId: string;
  items: Record<string, any>; // or define exact structure if known
  amount: number;
  address: Record<string, any>; // or define exact structure if known
  status: string;
  paymentMethod: string;
  payment: boolean;
  selectedShippingOption: string;
  date: number;
  orderNumber: string;
}

 export interface ProductItem {
  name: string;
  category: string;
  frameColor: string;
  theme: string;
  [key: string]: any;
}
