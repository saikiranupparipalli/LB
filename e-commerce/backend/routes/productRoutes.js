// productRoutes.js
// Express router defining /api/products endpoints.

import express from "express";
import {
  fetchProduct,
  fetchProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", fetchProducts);
router.get("/:id", fetchProduct);

export { router };

