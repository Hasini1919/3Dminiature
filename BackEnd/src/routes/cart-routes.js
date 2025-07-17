import express from "express";
import {addToCart , getCartData , updateCart} from "../controllers/card-controller.js";
import authUser from "../middleware/auth.js";
import uploadUserImage from "../middleware/user-upload.js";

const cartRouter=express.Router();

cartRouter.route("/add").post(uploadUserImage.array("uploadedImageFile", 5),authUser,addToCart);
cartRouter.route("/get").get(authUser,getCartData);
cartRouter.route("/update").put(authUser,updateCart);




export default cartRouter;
