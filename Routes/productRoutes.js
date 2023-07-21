import express from "express";
import { 
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct 
    } from "../controllers/productController.js";


const router = express.Router(); // Capital "R" in "Router"
import  IsLogin  from "../middleware/IsLogin.js";
// CREATE: POST request to create a new brand
router.post('/create', IsLogin, createProduct);   

// READ: GET request to get all brands
router.get("/read", IsLogin, getProducts);

// READ: GET request to get a brand by ID
router.get("/read/:id", IsLogin, getProductById);

// UPDATE: PUT request to update a brand by ID
router.put("/update/:id", IsLogin, updateProduct);

// DELETE: DELETE request to delete a brand by ID
router.delete("/delete/:id", IsLogin, deleteProduct);

export default router;