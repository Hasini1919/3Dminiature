import express from "express";
import {getDistrict,getCity} from "../controllers/address-controller.js"
const router=express.Router();



router.route("/getDistricts").get(getDistrict);
router.route("/getCities").get(getCity);


export default router;