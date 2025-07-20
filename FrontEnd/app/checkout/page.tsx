"use client";

import { useEffect, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import OrderSummary from "@/components/checkout/order-summary";
import AddressForm from "@/components/checkout/billing-form";
import ShippingAddressSection from "@/components/checkout/shipping-address";
import PaymentSection from "@/components/checkout/payment-section";
import CouponSection from "@/components/checkout/coupon-section";
import SecureCheckoutSection from "@/components/checkout/secure-checkout";
import { ToastContainer, toast } from "react-toastify";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

const OrderPlaced = () => {
  const {
    activeSection,
    buyNowItem,
    setActive,
    cartData,
    isAddressComplete,
    shippingSame,
    setIsBuyNow,
    address,
  } = useAppContext();

  interface FormErrors {
    FirstName?: string;
    LastName?: string;
    PhoneNumber?: string;
    EmailAddress?: string;
    Provience?: string;
    City?: string;
    Area?: string;
    District?: string;
    HouseNo?: string;
  }

  const billingRef = useRef<HTMLDivElement>(null);
  const ShippingRef = useRef<HTMLDivElement>(null);

  const scrollToShipping = () => {
    ShippingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToBilling = () => {
    const AreaPattern = /^(?=.*\d).{3,}$/.test(address.HouseNo);
    const isValidPhoneNumber = /^(0)(7[0-9])[0-9]{7}$/.test(address.PhoneNumber);

    const newErrors: FormErrors = {};
    if (!address.FirstName?.trim())
      newErrors.FirstName = "First Name is required !";
    if (!address.LastName?.trim())
      newErrors.LastName = "Last Name is required !";

    if (!address.PhoneNumber?.trim())
      newErrors.Provience = "PhoneNumber is required !";
    else if (!isValidPhoneNumber) {
      newErrors.PhoneNumber = "Phone number must be exactly 10 digits and correct format !";
    }
    if (!address.Provience?.trim())
      newErrors.Provience = "Province is required !";
    if (!address.City?.trim()) newErrors.City = "City is required !";
    if (!address.Area?.trim()) newErrors.Area = "Area is required !";
    if (!address.HouseNo?.trim())
      newErrors.HouseNo = "House No / Street No is required !";
    else if (!AreaPattern) {
      newErrors.HouseNo =
        "House No/ Street No must contain numbers and at least 3 characters!";
    }
    if (!address.District?.trim())
      newErrors.District = "District is required !";

    const errorMessages = Object.values(newErrors).join("\n");

    billingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    toast(errorMessages, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className:
        "!bg-[#e0b252] !text-white  !text-base !border-b-red-500   !font-medium !p-6  !whitespace-pre-line !min-w-[600px]",
      progressClassName: "!bg-white",
    });
  };

  useEffect(() => {
    setIsBuyNow(false);
    sessionStorage.removeItem("buyNowItem");
  }, []);

  if (!cartData && !buyNowItem) {
    return (
      <div className="w-full h-screen flex items-center justify-center backdrop-blur-sm bg-white/70"></div>
    );
  }

  return (
    <>
      <Header />
      <ToastContainer />

      <main className="w-full px-[90px] py-[54px]  min-h-[calc(100vh-200px)]">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-16 relative">
          <div className="w-full max-w-xl relative">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-5 left-5 right-[50%] h-0.5 bg-[#cb1a2e] z-0"></div>
              <div className="absolute top-5 left-[50%] right-8 h-0.5 bg-gray-300 z-0"></div>

              <div className="flex flex-col items-center z-10">
                <div className="w-10 h-10 rounded-full bg-[#cb1a2e] flex items-center justify-center text-white font-medium">
                  <button className="cursor-default">1</button>
                </div>
                <div className="mt-2 text-red-600 font-medium">Checkout</div>
              </div>

              <div className="flex flex-col items-center z-10">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
                  <button className="cursor-not-allowed" disabled>
                    2
                  </button>
                </div>
                <div className="mt-2 text-gray-500">Payment</div>
              </div>

              <div className="flex flex-col items-center z-10">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
                  <button className="cursor-not-allowed" disabled>
                    3
                  </button>
                </div>
                <div className="mt-2 text-gray-500">Confirmation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content: Billing + Summary */}
        <div className="w-full flex justify-between gap-[120px]">
          {/* Left Side: Billing, Shipping, Payment */}
          <div className="w-2/4">
            {/* Billing Address */}
            <div
              className="bg-white rounded-lg drop-shadow-lg overflow-hidden"
              ref={billingRef}
            >
              <div className="px-[36px] py-[32px] overflow-y-auto">
                <h2
                  className="text-xl text-black mb-6 cursor-pointer flex items-center gap-2"
                  onClick={() => {
                    if (shippingSame) {
                      setActive("Billing_Details");
                    } else {
                      scrollToShipping();
                    }
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-[#cb1a2e] text-white flex items-center justify-center font-bold text-[16px]">
                    1
                  </div>
                  Billing Details
                </h2>

                {activeSection === "Billing_Details" && shippingSame && (
                  <AddressForm />
                )}
              </div>
            </div>

            {/* Shipping Address */}
            <div
              className="drop-shadow-lg mt-9 bg-white px-[34px] py-[34px] rounded-lg"
              ref={ShippingRef}
            >
              <h2
                className="text-xl font-normal text-black cursor-pointer flex items-center gap-2"
                onClick={() => {
                  if (isAddressComplete) {
                    setActive("shipping Address");
                  } else {
                    scrollToBilling();
                  }
                }}
              >
                <div className="w-8 h-8 rounded-full bg-[#cb1a2e] text-white flex items-center justify-center font-bold text-[16px]">
                  2
                </div>
                Shipping Address
              </h2>

              {activeSection === "shipping Address" && (
                <ShippingAddressSection />
              )}
            </div>

            {/* Payment */}
            <div className="drop-shadow-lg mt-9 bg-white px-[34px] py-[34px] rounded-lg sticky top-12">
              <h2
                className="text-xl font-normal text-black cursor-pointer flex items-center gap-2"
                onClick={() => {
                  if (isAddressComplete && shippingSame) {
                    setActive("Payment");
                  } else {
                    if (!shippingSame) {
                      scrollToShipping();
                    } else {
                      scrollToBilling();
                    }
                  }
                }}
              >
                <div className="w-8 h-8 rounded-full bg-[#cb1a2e] text-white flex items-center justify-center font-bold text-[16px]">
                  3
                </div>
                Payment
              </h2>

              {activeSection === "Payment" && <PaymentSection />}
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="w-2/4">
            <CouponSection />
            <OrderSummary />
            <SecureCheckoutSection />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default OrderPlaced;
