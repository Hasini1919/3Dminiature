 import ShopPage from "./shop/page";
import Login from "@/app/authentication/login/page";
import Slidebar from "../components/Admin_sidebar/Slidebar";
import OrderPlaced from "./checkout/page";
import OrderConfirmed from "./order-placed/page";
import PayHere from "./payment/page";
import Card from "./card/page";
import WishlistPage from "./wishlist/page";

export default function Home() {
  return (
    <div>
      <ShopPage/>
      {/* <Login /> */}
      {/* <Slidebar/> */}
      {/* <OrderPlaced /> */}
      {/* <PayHere/> */}
      {/* <OrderConfirmed/> */}
      {/* <Card/> */}
      {/* <WishlistPage /> */}
  
    </div>
  );
}



