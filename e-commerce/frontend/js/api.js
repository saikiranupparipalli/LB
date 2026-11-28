// api.js
// Client-side API service wrapping native fetch calls to backend.

const BASE_URL = "http://localhost:5000/api";

async function fetchProducts() {
  const res = await fetch(BASE_URL + "/products");
  if (!res.ok) {
   throw new Error("Failed to fetch products");
  }
  return await res.json();
}

async function submitOrder(orderData) {
  const res = await fetch(BASE_URL + "/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Order failed");
  }
  return data;
}

async function fetchOrderById(orderId) {
  const res = await fetch(BASE_URL + "/orders/" + orderId);
  if (!res.ok) {
    throw new Error("Order not found");
  }
  const data = await res.json();
  return data;
}

export { fetchProducts, submitOrder, fetchOrderById };
