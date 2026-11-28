// productController.js
// Handles HTTP request/response logic for product endpoints.

import { getAllProducts, getProductById } from "../services/productService.js";

async function fetchProducts(_, res) {
  try {
    const products = await getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch products",
    });
  }
}

async function fetchProduct(req, res) {
  try {
    const id = req.params.id;
    const product = await getProductById(id);
    if (!product) {
      res.status(404).json({
        error: "Product not found",
      });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch product",
    });
  }
}

export { fetchProducts, fetchProduct };
