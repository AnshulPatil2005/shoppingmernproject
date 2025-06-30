// Import the Express framework to build the web server
import express from "express";

// Import dotenv to load environment variables from a .env file into process.env
import dotenv from "dotenv";

// Import path module to handle and transform file paths
import path from "path";

// Import the custom function to connect to the database
import { connectDB } from "./config/db.js";

// Import routes related to products from the specified route file
import productRoutes from "./routes/product.route.js";

// Call dotenv.config() to read .env file and load environment variables into process.env
dotenv.config();

// Create an instance of an Express app
//that is create an Express application object which will be used to define routes and the backend server
const app = express();

// Define the port number for the server to listen on; use value from .env or fallback to 5000
const PORT = process.env.PORT || 5000;

// Set the __dirname variable to the root directory of the project (since ES modules don't provide __dirname by default)
// You're simulating __dirname so you can:
// Use absolute paths reliably.
// Serve frontend files with express.static(...).
// Avoid hardcoding relative paths that might break depending on how the server is started.
const __dirname = path.resolve();

// Middleware to parse incoming JSON requests and populate req.body with parsed data
app.use(express.json());

// Mount the product routes under the /api/products path
app.use("/api/products", productRoutes);

// Serve static frontend assets if in production environment
if (process.env.NODE_ENV === "production") {
	// Serve the frontend's build folder (e.g., for Vite, React, etc.)
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	// For any route not handled above, return the main frontend HTML file (SPA fallback)
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// Start the server and listen on the specified port
app.listen(PORT, () => {
	// Call the function to connect to the database
	connectDB();

	// Log a message to indicate that the server has started
	console.log("Server started at http://localhost:" + PORT);
});
