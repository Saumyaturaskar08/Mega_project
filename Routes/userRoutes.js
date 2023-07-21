import express  from "express";
import { Login, Register, updateShippingAddress } from "../controllers/UserController.js";
import  IsLogin  from "../middleware/IsLogin.js";


const userRoutes = express.Router()

userRoutes.post('/register',Register)
userRoutes.post('/login',Login)
//userRoutes.post('/updateShipping', updateShippingAddress)
userRoutes.post("/updateShipping" ,IsLogin, updateShippingAddress)
export default userRoutes;