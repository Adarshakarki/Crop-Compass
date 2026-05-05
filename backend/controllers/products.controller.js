import { Product } from "../models/product.model.js";

export const getallproducts = async(req,res )=>{
    try {
        const { category } = req.query; // Get category from query parameters
        let filter = {};
        if (category) {
            filter.category = category; // Add category to filter if provided
        }
        const products = await Product.find(filter); // Fetch products based on filter
        return res.status(200).json({ products }); // Return the products in the response
      } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ error: "Failed to fetch products" }); // Handle error
      }

}