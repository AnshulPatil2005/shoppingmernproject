// Import express to create a router
import express from "express";

// Import the controller functions you defined
import {
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct,
} from "../controllers/product.controller.js";

// Create a new Express router instance
const router = express.Router();

// Route: GET /api/products → Fetch all products
router.get("/", getProducts);

// Route: POST /api/products → Create a new product
router.post("/", createProduct);

// Route: PUT /api/products/:id → Update an existing product by ID
router.put("/:id", updateProduct);

// Route: DELETE /api/products/:id → Delete a product by ID
router.delete("/:id", deleteProduct);

// Export the router to use in server.js
export default router;
// This file defines the routes for product-related operations in your application.