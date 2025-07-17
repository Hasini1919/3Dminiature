// types/admin/order.ts
export interface Order {
    id: string;
    name: string;
    cid: string;
    category: string;
    frameColor: string;
    theme: string;
    size: string;
    customization?: string;
    price: number;
    status: string;
  }
  

  