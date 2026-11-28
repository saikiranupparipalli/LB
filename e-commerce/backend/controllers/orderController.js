// orderController.js
// Handles HTTP request/response logic for order endpoints.

import { createOrder, getOrderById } from "../services/orderService.js";

async function placeOrder(req, res) {
  try {
    const result = await createOrder(req.body);
    if (result) {
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}

async function fetchOrder(req, res) {
  try {
    const orderItems = await getOrderById(req.params.id);
    if (orderItems.length === 0) {
      res.status(404).json({
        error: "Order not found",
      });
    } else {
      res.status(200).json(orderItems);
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch order",
    });
  }
}

export { placeOrder, fetchOrder };
