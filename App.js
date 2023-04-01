// require("./config/database.js").connect()
import express  from "express"
import dotenv from "dotenv"
dotenv.config()
import connect from "./config/database.js"
import { errorHandler } from "./middleware/errorhandler.js"
connect()
import bcrypt from "bcryptjs"
import userRoutes from "./Routes/userRoutes.js"
import productRoutes from "./Routes/productRoutes.js"

const app = express()

app.use(express.json())

// Error handling
app.use(errorHandler)

//  register routes
app.use("/api/users", userRoutes)

// Product route
app.use("/api/products", productRoutes)


export default app;

  
 