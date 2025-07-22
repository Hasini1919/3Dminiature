export type User = {
    _id: string;
    name: string;
    email: string;
    role: "admin" | "customer";
    isBlocked?: boolean;
    createdAt: string;
  };
  