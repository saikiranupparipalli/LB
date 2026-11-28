// app.js
// Entry point. Imports everything, wires up event listeners, and drives the UI.
// Think of this file as the "controller" — it doesn't do the work itself, it
// just calls the right function at the right time.

import { fetchProducts, submitOrder } from "./api.js";
import { renderProducts, renderCart, renderOrderStatus } from "./ui.js";
import { addToCart, removeFromCart, getCart, clearCart } from "./cart.js";

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Called any time the cart changes so the UI stays in sync with cart state.
function refreshCart() {
  renderCart(getCart());
}

// ─── Boot ────────────────────────────────────────────────────────────────────

// Runs once when the page loads. Fetches products and renders them.
async function init() {
  try {
    const products = await fetchProducts();
    renderProducts(products);
  } catch (err) {
    renderOrderStatus("Could not load products: " + err.message, true);
  }
}

// ─── Event: Add to Cart ───────────────────────────────────────────────────────
// Event delegation — one listener on the parent #product-list handles ALL
// "Add to Cart" button clicks, no matter how many products are on the page.

document.getElementById("product-list").addEventListener("click", (event) => {
  const btn = event.target.closest(".add-to-cart-btn");
  if (!btn) return; // click was somewhere else on the section

  // The button's data-product-id tells us which product was clicked.
  // We read the full product data from the button's parent card.
  const card = btn.closest(".product-card");
  const product = {
    id: Number(btn.dataset.productId),
    name: card.querySelector("h3").textContent,
    // parseFloat removes the "$" prefix ui.js added before the price
    price: parseFloat(
      card.querySelector("p:nth-child(3)").textContent.replace("Price: $", ""),
    ),
  };

  addToCart(product);
  refreshCart();
});

// ─── Event: Remove from Cart ──────────────────────────────────────────────────
// Same delegation pattern on #cart-items for "Remove" buttons.

document.getElementById("cart-items").addEventListener("click", (event) => {
  const btn = event.target.closest(".remove-btn");
  if (!btn) return;

  removeFromCart(Number(btn.dataset.removeId));
  refreshCart();
});

// ─── Event: Checkout Form Submit ──────────────────────────────────────────────

document
  .getElementById("checkout-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // stop the browser from reloading the page

    const customerName = document.getElementById("customer-name").value.trim();
    const customerEmail = document
      .getElementById("customer-email")
      .value.trim();
    const cartItems = getCart();

    if (cartItems.length === 0) {
      renderOrderStatus("Your cart is empty. Add some products first.", true);
      return;
    }

    // Build the payload the backend's POST /api/orders expects.
    // Backend receives: { customer_name, customer_email, items: [{ product_id, quantity }] }
    const orderData = {
      customer_name: customerName,
      customer_email: customerEmail,
      items: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const result = await submitOrder(orderData);
      clearCart();
      refreshCart();
      document.getElementById("checkout-form").reset();
      renderOrderStatus(
        `Order #${result.orderId} placed successfully! Thank you, ${customerName}.`,
      );
    } catch (err) {
      renderOrderStatus("Order failed: " + err.message, true);
    }
  });

// ─── Start ────────────────────────────────────────────────────────────────────
init();
