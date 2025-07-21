 import ShopPage from "./shop/page";
import Login from "@/app/authentication/login/page";
import Slidebar from "../components/Admin_sidebar/Slidebar";
import OrderPlaced from "./checkout/page";
import OrderConfirmed from "./order-placed/page";
import PayHere from "./payment/page";
import Card from "./card/page";
import DashboardPage from "./Admin/dashboard/page";
import OrderTable from "@/components/admin/test/newtable";
import CouponSection from "@/components/checkout/coupon-section";

import CouponPage from "./Admin/cop/page";
import AddCouponPage from "./Admin/cop/create/page";


export default function Home() {
  return (
    <div>
      {/* <DashboardPage/> */}
      {/* {/* <ShopPage/>
        <OrderPlaced /> 
     
    
       <OrderConfirmed/>
        */}
       {/* <Login/> */}
       {/* <OrderPlaced />  */}
       {/* <PayHere/>  */}
       {/* <Card/> */}
       
     <OrderTable/>
    </div>
  );
}



