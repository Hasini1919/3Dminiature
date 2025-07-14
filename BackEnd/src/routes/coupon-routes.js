import express from "express";
import { ApplyCoupon } from "../controllers/coupon-controller.js";
import authUser from "../middleware/auth.js";
import {checkCoupon} from "../controllers/coupon-check.js";


const couponRouter=express.Router();
couponRouter.route("/coupon").post(authUser,ApplyCoupon);
couponRouter.route("/check").get(authUser,checkCoupon);

export default couponRouter;