import Image from "next/image";
import visa from "@/public/assets/VISA.png";
import master from "@/public/assets/Mater.png";
import { SiGnuprivacyguard } from "react-icons/si";
import { MdPrivacyTip } from "react-icons/md";
import Link from 'next/link';

const Secure_CheckoutSection = () => {
  return (
    <div className="p-6  border-gray-300 mt-6">
      <div className="text-center mb-4">
        <p className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
          GUARANTEED SAFE CHECKOUT
        </p>
      </div>
      
      <div className="flex justify-center items-center gap-32 mb-4">
        <Image 
          src={visa} 
          alt="Visa" 
          width={60} 
          height={60}
        />
        <Image 
          src={master} 
          alt="Mastercard" 
          width={60} 
          height={60}
        />
      </div>
      
      <div className="text-center mb-3">
        <div>
        <div className="flex gap-2 items-center mb-2">
        <SiGnuprivacyguard  color="red"/>
        <p>
        Secure privacy
        </p>
        </div>
        <p className="text-xs text-gray-500 text-left" >
        Protecting your privacy is important to us! Please be assured that your information will be kept secured and uncompromised. We will only use your information in accordance with our privacy policy to provide and improve our services to you.
        </p>
        </div>
        <div>
        <div className="flex items-center gap-2 mt-4 mb-2">
        <MdPrivacyTip color="red" />
        <p>
        Safe Payment Options
        </p>
        
        </div>
        <p className="text-xs text-gray-500 text-left">
        You will not be charged until you review this order on the next page
        </p>
        </div>
        <div>
        <p className="text-xs text-gray-500 text-left mt-4 bg-gray-100 rounded p-2">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <Link href="/Privacy" ><span className="text-red-500 font-bold"> Privacy policy </span></Link></p>
        </div>
        <p className="text-xs text-gray-500 text-left mt-4 bg-gray-100 rounded p-3.5">
        Pay securely by Credit or Debit card  through westerPay.
        </p>

      </div>
    </div>
  );
};

export default Secure_CheckoutSection;