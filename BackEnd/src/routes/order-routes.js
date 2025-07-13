import express from 'express';
import {
  placeOrder,
  placeOrderPayHere,
  allOrders,
  userOrders,
  updateStatus,
  getuserOrderDataBystatus,
  getUserAddress,
  getlastestOrder
} from '../controllers/order-controller.js';

import authUser from '../middleware/auth.js';
import { orderFilter } from '../controllers/order-filter.js';

const orderRouter = express.Router();

// Admin Features Routes
// (You can add admin routes here if needed)

// Payment Features
orderRouter.route("/Place").post(authUser, placeOrder);
orderRouter.route("/payHere").post(authUser, placeOrderPayHere);

// User Features
orderRouter.route("/userOrders").post(authUser, userOrders);
orderRouter.route("/userAddress").get(authUser, getUserAddress);
orderRouter.route("/userlastestOrder").get(authUser, getlastestOrder);

orderRouter.route("/pendingOrders").get(authUser, getuserOrderDataBystatus);
orderRouter.route("/filter-by-date").get(authUser, orderFilter);

export default orderRouter;
