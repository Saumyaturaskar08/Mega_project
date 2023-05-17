// Import the product object from the product.js module
import asyncHandler from "express-async-handler";
import { Product } from "../model/Product.js";
import mongoose from "mongoose";


// for review with create
// Create a new product
export const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, brand, category, sizes, color, images, totalQuantity, totalSold, user } = req.body;
  const reviews = []; // Initialize the reviews array

  // Add reviews to the product, if any are provided
  if (req.body.reviews && req.body.reviews.length > 0) {
    for (const reviewData of req.body.reviews) {
      const { rating, comment, user } = reviewData;
      const review = new Review({
        rating,
        comment,
        user: new mongoose.Types.ObjectId(user)
      });
      await review.save();
      reviews.push(review._id);
    }
  }

  const product = await Product.create({
    name,
    price,
    description,
    brand,
    category,
    sizes,
    color,
    images,
    reviews, // Assign the reviews array to the reviews property of the product
    totalQuantity,
    totalSold,
    user: new mongoose.Types.ObjectId(user)
  });

  return res.status(201).json({
    msg: "Product created successfully",
    data: product
  });
});

// Create a new product original 

// export const createProduct = asyncHandler(async (req, res) => {
//   const { name, price, description, brand, category, sizes, color, images, reviews, totalQuantity, totalSold, user} = req.body;
//   const product = await Product.create({
//     name,
//     price,
//     description,
//     brand,
//     category,
//     sizes,
//     color,
//     images,
//     reviews,
//     totalQuantity,
//     totalSold,
//     user: new mongoose.Types.ObjectId(user)

//   });
//   return res.status(201).json({
//     msg: "Product created successfully",
//     data: product,
//     // token
//   });
// });

// Get all products with optional name filter   

export const getProducts = asyncHandler(async (req, res) => {
  try {
    const { name, brand, color, size, priceRange, page, limit } = req.query;

    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const brandFilter = brand ? { brand: { $regex: brand, $options: 'i' } } : {};
    const colorFilter = color ? { color: { $regex: color, $options: 'i' } } : {};
    const sizeFilter = size ? { size: { $regex: size, $options: 'i' } } : {};

    let priceFilter = {};
    if (priceRange) {
      const priceRanges = priceRange.split("-");
      const minPrice = parseInt(priceRanges[0]);
      const maxPrice = parseInt(priceRanges[1]);
      priceFilter = { price: { $gte: minPrice, $lte: maxPrice } };
    }

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    const skip = (pageNumber - 1) * limitNumber;

    const products = await Product.find({
      ...nameFilter,
      ...brandFilter,
      ...colorFilter,
      ...sizeFilter,
      ...priceFilter,
    })
      .skip(skip)
      .limit(limitNumber);

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get a product by id
export const getProductById = asyncHandler(async (req, res)  =>  {

  const product = await Product.findById(req.params.id)

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});
// api - http://localhost:4000/api/products/read/643d14b14eac62cbdebee038


// Update a product by id and user id authentication
export const updateProduct = asyncHandler(async (req, res) => {
  const { id, userId } = req.params;
  const { name, price, description, brand, category, sizes, color, images, reviews, totalQuantity, totalSold } = req.body;

  // Check if the product exists
  const product = await Product.findOne({ _id: id, user: userId });
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  // Update the product
  product.name = name || product.name;
  product.price = price || product.price;
  product.description = description || product.description;
  product.brand = brand || product.brand;
  product.category = category || product.category;
  product.sizes = sizes || product.sizes;
  product.color = color || product.color;
  product.images = images || product.images;
  product.reviews = reviews || product.reviews;
  product.totalQuantity = totalQuantity || product.totalQuantity;
  product.totalSold = totalSold || product.totalSold;
  const updatedProduct = await product.save();

  return res.json({
    msg: "Product updated successfully",
    data: updatedProduct,
  });
});
//http://localhost:4000/api/products/update/643d14924eac62cbdebee035

// Delete a product
export const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.deleteOne({ _id: req.params.id });
    if (product.deletedCount === 1) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
// http://localhost:4000/api/products/delete/643d14924eac62cbdebee035

