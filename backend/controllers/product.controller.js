// Import mongoose to validate MongoDB ObjectId
import mongoose from "mongoose";

// Import the Product model
import Product from "../models/product.model.js";

/**
 * GET all products
 * Route: GET /api/products
 */
export const getProducts = async (req, res) => {
	try {
		// Fetch all products from the database
		const products = await Product.find({});
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.log("error in fetching products:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

/**
 * CREATE a new product
 * Route: POST /api/products
 */
export const createProduct = async (req, res) => {
	const product = req.body; // Extract product data from request body

	// Simple validation for required fields
	if (!product.name || !product.price || !product.image) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	// Create a new instance of the Product model
	const newProduct = new Product(product);

	try {
		// Save the product to MongoDB
		await newProduct.save();
		res.status(201).json({ success: true, data: newProduct });
	} catch (error) {
		console.error("Error in Create product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

/**
 * UPDATE an existing product by ID
 * Route: PUT /api/products/:id
 */
export const updateProduct = async (req, res) => {
	const { id } = req.params;   // Extract product ID from URL
	const product = req.body;    // Updated product data

	// Validate if the provided ID is a valid MongoDB ObjectId
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		// Find product by ID and update it with new data
		const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

/**
 * DELETE a product by ID
 * Route: DELETE /api/products/:id
 */
export const deleteProduct = async (req, res) => {
	const { id } = req.params;  // Extract product ID from URL

	// Validate if the provided ID is a valid MongoDB ObjectId
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		// Find product by ID and delete it
		await Product.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Product deleted" });
	} catch (error) {
		console.log("error in deleting product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
