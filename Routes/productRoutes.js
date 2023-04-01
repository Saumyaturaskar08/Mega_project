import express  from "express";
import { Getproduct } from "../controllers/productControllers.js";
import isLogin from "../middleware/IsLogin.js";

const router = express.Router();
router.post('/create',isLogin, Getproduct);

export default router;