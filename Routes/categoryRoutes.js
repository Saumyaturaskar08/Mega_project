import express from 'express';
import { createcategory, getCategoryById, getCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';

const router = express.Router();
import  IsLogin  from "../middleware/IsLogin.js";
// Define a route for creating a new category
router.post('/create', IsLogin, createcategory);

// READ: GET request to get all Category
router.get("/read", getCategory);

// READ: GET request to get a Category by ID
router.get("/read/:id", getCategoryById);

// UPDATE: PUT request to update a Category by ID
router.put("/update/:id", updateCategory);

// DELETE: DELETE request to delete a Category by ID
router.delete("/delete/:id", deleteCategory);

export default router;