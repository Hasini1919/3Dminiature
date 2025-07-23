export interface OrderItem {
  productId: string;
  name: string;
  imageUrl: [string];
  size: string;
  frameColor: string[];   // match backend type (array of strings)
  themeColor: string[];   // same here
  uploadedImage: string;
  quantity: number;
  price: number;
  customText: string;
  amount: number;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  amount:number;
  address: {
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    Provience: string;
    District: string;
    City: string;
    Area: string;
    HouseNo: string;
    AnyInformation: string;
  };
  status: string;
  paymentMethod: string;
  payment: boolean;  // if boolean in backend
  selectedShippingOption: string;
  date: string;
  orderNumber: string;
}

