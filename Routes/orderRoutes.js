import express from "express";
import {
    createOrder,
    GetOrders,
    getOrderStats,
    GetOrder,
    updateOrder

} from "../controllers/orderController.js";
 import IsLogin from "../middleware/IsLogin.js";
const router = express.Router();

router.post("/create",IsLogin,createOrder)

router.get("/read",IsLogin, GetOrders)

router.get("/stats",IsLogin, getOrderStats);

router.get("/read/:id",IsLogin, GetOrder)

router.put("/update/:id",IsLogin, updateOrder)

export default router;
