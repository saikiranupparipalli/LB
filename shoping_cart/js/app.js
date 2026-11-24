import { products } from "./products.js";
import {
  getCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "./cart.js";
import {
  calculateSubTotal,
  applyCoupon,
  calculateFinalTotal,
} from "./calculations.js";
import { renderProducts, renderCart, renderSummary } from "./dom.js";

let activeCoupon = "";
function updateUi(getCart) {
  const getCartTotal = calculateSubTotal(getCart);
  const discount = applyCoupon(activeCoupon, getCartTotal);
  const calculateUiItems = calculateFinalTotal(getCartTotal, discount);
  renderCart(getCart);
  renderSummary(calculateUiItems);
}

const renderProBtn = document.getElementById("product-list");
renderProBtn.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-primary")) {
    addToCart(event.target.id);
    updateUi(getCart());
  }
});

const renderCartItems = document.getElementById("cart-items");
renderCartItems.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-cart-one")) {
    increaseQuantity(event.target.id);
    updateUi(getCart());
  } else if (event.target.classList.contains("btn-cart-Two")) {
    decreaseQuantity(event.target.id);
    updateUi(getCart());
  } else if (event.target.classList.contains("btn-remove")) {
    removeFromCart(event.target.id);
    updateUi(getCart());
  }
});

const couponBtn = document.getElementById("apply-coupon-btn");
const couponMessage = document.getElementById("coupon-message");
const inputCoupon = document.getElementById("coupon-input");

couponBtn.addEventListener("click", (event) => {
  activeCoupon = inputCoupon.value.trim();
  const discount = applyCoupon(activeCoupon, calculateSubTotal(getCart()));
  if (discount > 0) {
    window.alert("Coupon applied successfully!");
  } else {
    window.alert("Invalid coupon code");
  }
  updateUi(getCart());
});

renderProducts(products);
updateUi(getCart());
