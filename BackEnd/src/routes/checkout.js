import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { items,orderId  } = req.body;
    const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
     metadata: {
        orderId, // save orderId to retrieve later
      },
  line_items: items.map(item => {
    const priceInLKR = Number(item.price);
    const usdConversionRate = 313.5975; 
    const priceInUSD = priceInLKR / usdConversionRate;
    
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.productName,
        },
        unit_amount: Math.round(Number(priceInUSD) * 100), //  convert to cents
      },
      quantity: item.quantity,
    };
  }),
  success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}', // 👈 pass session ID to frontend,
  cancel_url: 'http://localhost:3000/cancel',
  
});

  
    res.json({ id: session.id });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

