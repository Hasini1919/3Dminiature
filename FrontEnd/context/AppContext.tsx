"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axiosInstance from "@/services/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getCurrentUser } from "@/utils/auth-utils/api";
interface Address {
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Provience: string;
  District: string;
  Area: string;
  City: string;
  HouseNo: string;
  AnyInformation:string;
}

interface ShiftAddress {
  FirstName: string;
  LastName: string;
  Provience: string;
  District: string;
  City: string;
  Area: string;
  HouseNo:string;
  AnyInformation:string;
}

type Product = {
  frameColor: ReactNode;
  _id: string;
  name: string;
  price: number;
  image: string[];
  category:string,
  themeColor:string,
  
};

interface CartItem {
  
  
  productId: string;
  productName: string;
  images: string;
  frameSize: string;
  frameColor: string;
  themeColor: string;
  uploadedImageFiles: string[];
  quantity: number;
  price: number;
  customText?: string;
}

type CartData = CartItem[];

interface BuyNowItem {
  
  productId: string;
  frameSize: string;
  frameColor: string;
  themeColor: string;
  uploadedImageUrls:string[];
  quantity: number;
  customText?: string;
  //productImage:string[];
}

interface AppContextType {
  address: Address;
  shiftAddress: ShiftAddress;
  selectedShippingOption: string;
  products: Product[];
  cartData: CartData;
  buyNowItem: BuyNowItem | null;
  activeSection: string;
  isAddressComplete: boolean;
  shippingCost: number;
  shippingSame: boolean;
  billingDistricts: string[];
  billingCities: string[];
  shippingDistricts: string[];
  shippingCities: string[];
  couponCode: string;
  isBuyNow: boolean;
   user: any;
  
  
  setIsBuyNow:React.Dispatch<React.SetStateAction<boolean>>;
  setBillingDistricts: React.Dispatch<React.SetStateAction<string[]>>;
  setShippingDistricts: React.Dispatch<React.SetStateAction<string[]>>;
  setBillingCities: React.Dispatch<React.SetStateAction<string[]>>;
  setShippingCities: React.Dispatch<React.SetStateAction<string[]>>;
  setShippingSame: React.Dispatch<React.SetStateAction<boolean>>;
  setShippingCost: React.Dispatch<React.SetStateAction<number>>;
  setIsAddressComplete: React.Dispatch<React.SetStateAction<boolean>>;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  setCouponCode: React.Dispatch<React.SetStateAction<string>>;
  setAddress: React.Dispatch<React.SetStateAction<Address>>;
  setShiftAddress: React.Dispatch<React.SetStateAction<ShiftAddress>>;
  setSelectedShippingOption: React.Dispatch<React.SetStateAction<string>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setCartData: React.Dispatch<React.SetStateAction<CartData>>;
  setBuyNowItem: React.Dispatch<React.SetStateAction<BuyNowItem | null>>;
  setUser: React.Dispatch<React.SetStateAction<any>>;

  addToCart: (
    productId: string,
    frameSize: string,
    frameColor: string,
    themeColor: string,
    uploadedImageFile: File[],
    quantity: number,
    isBuyNow:boolean,
    customText?: string,
    
  ) => void;

  updateCartItem: (
    productId: string,
    frameSize: string,
    frameColor: string,
    themeColor: string,
    quantity: number,
    uploadedImageFile: string[],
    customText?: string
  ) => void;

  getCartCount: () => number;
  getCartAmount: () => number;



  clearBuyNow: () => void;
  discountedTotal: number | null;
  setDiscountedTotal: React.Dispatch<React.SetStateAction<number | null>>;
  router: ReturnType<typeof useRouter>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [address, setAddress] = useState<Address>({
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Provience: "",
    District: "",
    City: "",
    Area: "",
    HouseNo: "",
    AnyInformation:""
  });

  const [shiftAddress, setShiftAddress] = useState<ShiftAddress>({
    FirstName: "",
    LastName: "",
    Provience: "",
    District: "",
    City: "",
    Area: "",
    HouseNo:"",
    AnyInformation:""
  });

  const [selectedShippingOption, setSelectedShippingOption] = useState("Standard Shipping");
  const [products, setProducts] = useState<Product[]>([]);
  const [cartData, setCartData] = useState<CartData>([]);
  const [buyNowItem, setBuyNowItem] = useState<BuyNowItem | null>(null);
  const [discountedTotal, setDiscountedTotal] = useState<number | null>(null);
  const [activeSection, setActive] = useState("Billing_Details");
  const [isAddressComplete, setIsAddressComplete] = useState(false);
  const [shippingCost, setShippingCost] = useState(360);
  const [shippingSame, setShippingSame] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [billingDistricts, setBillingDistricts] = useState<string[]>([]);
  const [billingCities, setBillingCities] = useState<string[]>([]);
  const [shippingDistricts, setShippingDistricts] = useState<string[]>([]);
  const [shippingCities, setShippingCities] = useState<string[]>([]);
  const [isBuyNow, setIsBuyNow] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
  const fetchUser = async () => {
    const userData = await getCurrentUser();
    setUser(userData);
  };

  fetchUser();
}, []);

  useEffect(() => {
  const fetchCartData = async () => {
    try {
      

      const response = await axiosInstance.get("/api/cart/get");

      if (response.data.cartData) {
        setCartData(response.data.cartData);
      }
    } catch (error:any) {
      console.error("Error fetching cart data:", error);
      if (error.response && error.response.status === 401) {
      // Show alert or toast
      toast.error("Please check the NetConnection.cart Data fetching failed");
      router.push("/");
    }
    }

  };

  fetchCartData();

  const storedData = sessionStorage.getItem("buyNowItem");
  if (storedData) {
    setBuyNowItem(JSON.parse(storedData));
  }
}, []);
 
 
  useEffect(() => {
   
    const fetchProductData = async () => {
      try {
        const response = await axiosInstance.get<Product[]>(
          "/api/admin/products"
        );
        
         setProducts(response.data);
         
       
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProductData();
    const interval = setInterval(fetchProductData, 300000);
    return () => clearInterval(interval);

  }, []);
 
console.log(products);

  const addToCart = async (
    productId: string,
    frameSize: string,
    frameColor: string,
    themeColor: string,
    uploadedImageFile: File[],
    quantity: number,
    isBuyNow: boolean,
    customText?: string,
    
  ) => {
    if (!frameSize || !frameColor || !themeColor || uploadedImageFile.length === 0 || quantity <= 0) {
      //alert("Please select some product options before adding this product to your cart.");
      //console.error("Please fill all cart fields properly.");
      return;
    }

    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("frameSize", frameSize);
    formData.append("frameColor", frameColor);
    formData.append("themeColor", themeColor);
    formData.append("quantity", String(quantity));
    if (customText) formData.append("customText", customText);
    uploadedImageFile.forEach((file, index) => {
      formData.append(`uploadedImageFile`, file); 
    });
   
   console.log(isBuyNow);

    if(!isBuyNow){
         
      try {
        const response = await axiosInstance.post("/api/cart/add", formData,
          {
            headers:{
              "Content-Type": "multipart/form-data",
            },
          }
          
        );
      
        if (response.data.success) {
        setCartData(response.data.cartData);
        toast.success("Added to cart successfully!");
         
        }
        
        console.log("addtocard");
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Something went wrong while adding to cart.");
      }
    }
    else{
     try {
    
    const uploadFormData = new FormData();
    
    uploadedImageFile.forEach((file) => {
      uploadFormData.append("uploadedImageFile", file);
    });
    console.log(uploadFormData);
    const uploadResponse = await axiosInstance.post(
      "/api/upload-image",
      uploadFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (uploadResponse.data.success) {
        const uploadedImageUrls = uploadResponse.data.imageUrls;
        const buyNowObject = {
        productId,
        frameSize,
        frameColor,
        themeColor,
        quantity,
        customText: customText || "",
        uploadedImageUrls,
        
      };

     
      sessionStorage.setItem("buyNowItem", JSON.stringify(buyNowObject));

     console.log("buynow");
      setBuyNowItem(buyNowObject);

     
      router.push("/checkout");
    }
  } catch (error) {
    console.error("Error uploading images for buy now:", error);
  };

     
    }
    
  };
  console.log(buyNowItem);
 
  const updateCartItem = async (
    productId: string,
    frameSize: string,
    frameColor: string,
    themeColor: string,
    quantity: number,
    uploadedImageFiles: string[], 
    customText?: string
  ) => {
    const updatedCart = [...cartData];
  
    
    const index = updatedCart.findIndex(
      (item) =>
        item.productId === productId &&
        item.frameSize === frameSize &&
        item.frameColor === frameColor &&
        item.themeColor === themeColor &&
        JSON.stringify(item.uploadedImageFiles) === JSON.stringify(uploadedImageFiles) && 
        item.customText === customText
    );
  
    if (index === -1) {
      console.warn("Item not found in cart.");
      return;
    }
  
    
    if (quantity === 0) {
      updatedCart.splice(index, 1);
    } else {
      updatedCart[index].quantity = quantity;
    }
  
    setCartData(updatedCart);
  
    try {
      await axiosInstance.put("/api/cart/update", {
        productId,
        frameSize,
        frameColor,
        themeColor,
        quantity,
        uploadedImageFiles,
        customText,
      });
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };
  console.log(user);

  const getCartCount = () => {
    return cartData.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartAmount = () => cartData.reduce((acc, item) => acc + item.quantity * item.price, 0);

 

  const clearBuyNow = () => {
    setBuyNowItem(null);
    sessionStorage.removeItem("buyNowItem");
  };
 
   
 
  
  
  return (
    <AppContext.Provider
      value={{
        address,
        shiftAddress,
        selectedShippingOption,
        products,
        cartData,
        buyNowItem,
        activeSection,
        isAddressComplete,
        shippingCost,
        shippingSame,
        billingDistricts,
        billingCities,
        shippingDistricts,
        shippingCities,
        couponCode,
        setBillingDistricts,
        setShippingDistricts,
        setBillingCities,
        setShippingCities,
        setShippingSame,
        setShippingCost,
        setIsAddressComplete,
        setActive,
        setCouponCode,
        setAddress,
        setShiftAddress,
        setSelectedShippingOption,
        setProducts,
        setCartData,
        setBuyNowItem,
        isBuyNow,
        setIsBuyNow,
        addToCart,
        updateCartItem,
        getCartCount,
        getCartAmount,
        clearBuyNow,
        discountedTotal,
        setDiscountedTotal,
        user,
        setUser,
        router,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
