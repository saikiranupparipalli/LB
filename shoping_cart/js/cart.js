import { products } from "./products.js";

let cart = [];
function addToCart(id) {
  const productId = products.find((n) => n.id == id);
  const cartId = cart.find((n) => n.id == id);
  if (cartId) {
    if (cartId.stock < productId.stock) {
      cartId.stock += 1;
      // console.log("stock +1 added");
    } else {
      // console.log("stock has reached limit");
    }
  } else {
    cart.push({
      id: productId.id,
      name: productId.name,
      price: productId.price,
      stock: 1,
    });
  }
}

function increaseQuantity(id) {
  const findIdInCart = cart.find((n) => n.id == id);
  const findIdInProduct = products.find((n) => n.id == id);
  if (findIdInCart.stock < findIdInProduct.stock) {
    findIdInCart.stock += 1;
  } else {
    console.log("limit was reached");
  }
}

function decreaseQuantity(id) {
  const findIdInCart = cart.find((n) => n.id == id);
  if (!findIdInCart) {
    return;
  } else if (findIdInCart.stock > 1) {
    findIdInCart.stock -= 1;
  }
}

function removeFromCart(id) {
  const remFromCart = cart.filter((n) => n.id !== id);
  cart = remFromCart;
}

function getCart(){
  return cart
}
addToCart(1)
console.log(getCart())
export { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, getCart};

// function addItems(id, name, price, stock) {
//   return {
//     id: 3,
//     name: name,
//     price: price,
//     stock: stock,
//   };
// }
