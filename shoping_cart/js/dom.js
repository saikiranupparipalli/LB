import { products } from "./products.js";
import { getCart } from "./cart.js";
import { calculateFinalTotal } from "./calculations.js";
function renderProducts(products) {
  let productList = document.getElementById("product-list");
  productList.innerHTML = "";
  for (const eachList of products) {
    productList.innerHTML += `<div class = "product-card"> 
    <h3>${eachList.name}</h3>
    <h3>price:${eachList.price}</h3>
    <button class = "btn-primary" id=${eachList.id}>Add to cart</button>
   </div>`;
  }
}
function renderCart(getCart) {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  if (getCart.length == 0) {
    cartItems.innerHTML += `<div>
      <p class = "cartEmpty">cart is empty</p>
      </div>`;
    return;
  } else {
    for (let i = 0; i < getCart.length; i++) {
      const cart = getCart[i];
      cartItems.innerHTML += `
 <div class = "cart-row">
        <h4>product: ${cart.name}</h4>
        <h4>price: ${cart.price}</h4>
       <button class= "btn-cart-one" id=${cart.id}>+</button>
       <h4>units: ${cart.stock}</h4>
       <button class= "btn-cart-Two" id=${cart.id}>-</button>
       <button class = "btn-remove" id=${cart.id}>Remove</button>
    </div>
    `;
    }
  }
}

function renderSummary(calculateFinalTotal) {
  let subtotal = document.getElementById("summary-subtotal");
  let discount = document.getElementById("summary-discount");
  let tax = document.getElementById("summary-tax");
  let total = document.getElementById("summary-total");
  subtotal.innerHTML = "";
  discount.innerHTML = "";
  tax.innerHTML = "";
  total.innerHTML = "";
  const summaryData = calculateFinalTotal;
  subtotal.innerHTML += `${summaryData.subTotal}`;
  discount.innerHTML += `${summaryData.discount}`;
  tax.innerHTML += `${summaryData.tax}`;
  total.innerHTML += `${summaryData.finalPrice}`;
}

export { renderProducts, renderCart, renderSummary };
