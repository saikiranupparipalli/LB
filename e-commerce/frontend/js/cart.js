// cart.js
// In-memory cart state management (add, remove, update quantity, read, clear).
// This is the ONLY place that touches the cart array — no other file modifies
// it directly. That means cart rules are always consistent, no matter how many
// places call these functions.

// ─── State ───────────────────────────────────────────────────────────────────
// Module-level variable. It persists for the lifetime of the page but resets
// on refresh (this is intentional — no database or localStorage needed here).

let cart = [];

// ─── Add ─────────────────────────────────────────────────────────────────────

// If the product is already in the cart, increase its quantity.
// If it's new, push a fresh item object with quantity 1.
export function addToCart(product) {
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }
}

// ─── Remove ──────────────────────────────────────────────────────────────────

// .filter() returns a NEW array containing only items that do NOT match.
// We reassign cart to that new array, effectively deleting the matched item.
export function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
}

// ─── Update quantity ─────────────────────────────────────────────────────────

// delta is +1 (increase) or -1 (decrease).
// If quantity drops to 0 or below, remove the item entirely.
export function updateQuantity(productId, delta) {
  const item = cart.find((item) => item.id === productId);

  if (!item) return; // nothing to update

  item.quantity += delta;

  if (item.quantity <= 0) {
    removeFromCart(productId);
  }
}

// ─── Read ────────────────────────────────────────────────────────────────────

// Return the current cart array so callers (ui.js, app.js) can read it.
// We return the array reference — ui.js only reads it; it never mutates it.
export function getCart() {
  return cart;
}

// ─── Clear ───────────────────────────────────────────────────────────────────

// Called after a successful order is placed to empty the cart.
export function clearCart() {
  cart = [];
}
