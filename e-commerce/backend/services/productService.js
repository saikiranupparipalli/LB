// productService.js
// Database queries and business rules for catalog & stock.
import { pool } from "../config/db.js";

async function getAllProducts() {
  const data = await pool.query("SELECT * FROM products ORDER BY id ASC");
  return data.rows;
}

async function getProductById(id) {
  const data = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return data.rows[0];
}

export { getAllProducts, getProductById };
