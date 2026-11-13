// logic.js

import { inventory } from "./state.js";

// Pure business logic: validation, adding, stock updating, filtering, and valuations.
export function validation(name, price, quantity) {
  if (typeof name !== "string" || name.trim() === "") {
    return { error: "enter name" };
  }
  if (typeof price !== "number" || price <= 0) {
    return { error: "enter price" };
  }
  if (typeof quantity !== "number" || quantity < 0) {
    return { error: "enter quantity" };
  }
  return { isValid: true };
}
export function addProduct(inventory, newProduct) {
  let existingItem = inventory.find((n) => n.name === newProduct.name);
  if (existingItem) {
    existingItem.quantity += newProduct.quantity;
    return {
      product: existingItem,
      inventory,
    };
  } else {
    let autoId = inventory.length;
    let createdProduct = {
      id: autoId,
      name: newProduct.name,
      category: newProduct.category,
      price: newProduct.price,
      quantity: newProduct.quantity,
    };
    inventory.push(createdProduct);
    return {
        product: createdProduct, inventory
    };
  }
}
addProduct(inventory, {
  name: "plywood",
  category: "wood",
  price: 250,
  quantity: 50,
});

// console.log(inventory.name)
// console.log("item with this name already exists");
//  console.log("item created");
//
