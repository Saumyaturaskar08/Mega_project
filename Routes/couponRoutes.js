import express from "express";
import { create, GetAllCoupons, GetCoupon, updateCoupon, deleteCoupon  } from "../controllers/couponController.js"

const router = express.Router();
//import  IsLogin  from "../middleware/IsLogin.js";

//router.post('/create', IsLogin, createProduct);   
router.post("/create", create);
router.get("/read",GetAllCoupons);
router.get("/read/:id",GetCoupon );
router.put("/update/:id",updateCoupon );
router.delete("/delete/:id" ,deleteCoupon)

export default router;