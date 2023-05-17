// Import the Brand model from the brand.js module
import { Brand } from "../model/Brand.js";
import asyncHandler from "express-async-handler";
// Create a new brand
export const createBrand = async (req, res) => {
  try {
    // Extract the name, user, and image properties from the request object
    const { name, user, products } = req.body;

    // Create a new brand object using the extracted properties
    const newBrand = new Brand({
      name,
      user,
      products,
    });
    // api for brand create = http://localhost:4000/api/brand/create

    // Save the brand object to the database
    const savedBrand = await newBrand.save();

    // Send a response with the saved brand object
    res.status(201).json(savedBrand);
  } catch (error) {
    // Handle any errors that occur during the creation of the brand
    res.status(500).json({ message: error.message });
  }
};
export default createBrand;


//GET BRAND
export const getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params?.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// api for get = http://localhost:4000/api/brand/read/644798b4cdfb25c595ff5deb

// UPDATE BRAND
export const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params?.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    brand.name = req.body.name || brand.name;
    brand.user = req.body.user || brand.user;
    brand.products = req.body.products || brand.products;
    const updatedBrand = await brand.save();
    
   res.status(200).json({ message: "Brand updated successfully", updatedBrand });
 //res.status(200).json(updatedBrand);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// api for update = http://localhost:4000/api/brand/update/644798b4cdfb25c595ff5deb

// DELETE BRAND
export const deleteBrand = asyncHandler(async (req, res) => {
  try {
    const result = await Brand.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Brand deleted successfully" });
    } else {
      res.status(404).json({ message: "Brand not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// api for delete = http://localhost:4000/api/brand/delete/644798b4cdfb25c595ff5deb