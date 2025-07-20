'use client';
import getStripe from '@/utils/payment/get-stripejs';
import axios from 'axios';

export default function PayButton({ cartItems }: { cartItems: any[] }) {
  const handleCheckout = async () => {
    try {
      const res = await axios.post('http://localhost:5500/api/checkout/create-checkout-session', {
        items: cartItems,
      });

      const stripe = await getStripe();
      await stripe?.redirectToCheckout({
        sessionId: res.data.id,
      });
      
    } catch (err: any) {
      console.error("Checkout error:", err.message);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Pay Now
    </button>
  );
}
