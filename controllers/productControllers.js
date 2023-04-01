import Product from "../model/Product.js";

import asyncHandler from "express-async-handler";
import jwt  from "jsonwebtoken";

export const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description } = req.body; // Destructure the request body to get the product details

  const product = new product({ name, price, description }); // Create a new product using the Product model

  const createdProduct = await product.save(); // Save the product to the database

  res.status(201).json(createdProduct); // Return the created product as a JSON response
});
export const Getproduct = (req, res) => {
  // const token = req.headers.authorization.split(" ")[1];
  // if (!token) {
  //   return res.status(401).json({ message: 'No token provided' });
  // }
  // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    
  //   if (err) {
  //     return res.status(401).json({ message: 'Invalid token' });
  //   }else{
  //     console.log(decoded)
  //     req.userId = decoded.userId;
  //   }

  // });
    const response = { message: 'Product created successfully' };
  res.status(201).json(response);
};