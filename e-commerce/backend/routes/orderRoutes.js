// orderRoutes.js
// Express router defining /api/orders endpoints.

import express from "express";
import { placeOrder, fetchOrder } from "../controllers/orderController.js";
const router = express.Router();

router.post("/", placeOrder);
router.get("/:id", fetchOrder);
export {router};