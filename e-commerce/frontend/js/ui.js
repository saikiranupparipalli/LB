// ui.js
// DOM rendering functions for products, cart, and order status.
// These functions receive data and paint the HTML — they know nothing about
// fetch, cart state, or business logic. That separation keeps code clean.

// ─── Products ────────────────────────────────────────────────────────────────

export function renderProducts(products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  if (products.length === 0) {
    productList.innerHTML = "<p>No products available</p>";
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    // data-product-id lets app.js read which product was clicked
    // without walking the DOM looking for a matching object
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.description || ""}</p>
      <p>Price: $${product.price}</p>
      <p>Stock: ${product.stock}</p>
      <button
        data-product-id="${product.id}"
        class="add-to-cart-btn"
        ${product.stock === 0 ? "disabled" : ""}
      >
        ${product.stock === 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    `;

    productList.appendChild(card);
  });
}

// ─── Cart ────────────────────────────────────────────────────────────────────

export function renderCart(cartItems) {
  const cartContainer = document.getElementById("cart-items");
  const cartTotal     = document.getElementById("cart-total");

  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty</p>";
    cartTotal.textContent   = "";
    return;
  }

  let total = 0;

  cartItems.forEach((item) => {
    total += item.price * item.quantity;

    const row = document.createElement("div");
    row.className = "cart-item";

    // data-remove-id lets app.js know which product to remove
    row.innerHTML = `
      <span>${item.name}</span>
      <span>$${item.price} x ${item.quantity}</span>
      <button data-remove-id="${item.id}" class="remove-btn">Remove</button>
    `;

    cartContainer.appendChild(row);
  });

  // toFixed(2) always shows two decimal places — e.g. $12.00 not $12
  cartTotal.textContent = "Total: $" + total.toFixed(2);
}

// ─── Order status ─────────────────────────────────────────────────────────────

// isError flag lets callers choose red (error) or green (success) colour
// without duplicating this element-lookup logic in every caller.
export function renderOrderStatus(message, isError = false) {
  const statusSection = document.getElementById("order-status");
  statusSection.innerHTML = `
    <p style="color: ${isError ? "red" : "green"}">${message}</p>
  `;
}
