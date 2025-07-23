
import Homepage from "./home/page";
import Login from "./authentication/login/page";
import ShopPage from "./shop/page";

import Slidebar from "../components/Admin_sidebar/Slidebar";
import OrderPlaced from "./checkout/page";
import OrderConfirmed from "./order-placed/page";
import PayHere from "./payment/page";
import Card from "./card/page";
import ProfilePage from "./customerAccount/profile/page";

export default function Home() {
  return (
    <div>
    {/* <Homepage/> */}
      {/* <ShopPage/> */}
       {/* <Login />  */}
      {/* <Slidebar/> */}
      {/* <OrderPlaced /> */}
      {/* <PayHere/> */}
      {/* <OrderConfirmed/> */}
      {/* <Card/> */}
      <ProfilePage />
       

    </div>
  );
}



