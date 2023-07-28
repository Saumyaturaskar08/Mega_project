import express from "express";
import dotenv from "dotenv";
import connect from "./config/database.js";
import bcrypt from "bcryptjs";
import userRoutes from "./Routes/userRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import categoryRoutes from "./Routes/categoryRoutes.js";
import brandRoutes from "./Routes/brandRoutes.js";
import colorsRoutes from "./Routes/colorsRoutes.js";
import reviewRoutes from "./Routes/reviewRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import couponRoutes from "./Routes/couponRoutes.js";
import  errorHandler from "./middleware/debuged.js";
//import { errorHandler } from "./middleware/ErrorHandler.js";
//import errorHandler from "../middleware/ErrorHandler.js"

// Initialize app
const app = express();

// Load environment variables
dotenv.config();

// Connect to database
connect();



// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/colors", colorsRoutes);
app.use("/api/review", reviewRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/coupon", couponRoutes)

// Error handling middleware
app.use(errorHandler);

export default app;