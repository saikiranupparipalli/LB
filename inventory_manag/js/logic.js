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
      product: createdProduct,
      inventory,
    };
  }
}
addProduct(inventory, {
  name: "plywood",
  category: "wood",
  price: 250,
  quantity: 50,
});

export function findProductById(inventory, id) {
  const inventory_data = inventory.find((n) => n.id === Number(id));
  if (inventory_data) {
    return inventory_data;
  } else {
    return null;
  }
}

export function updateStock(inventory, id, deltaQuality) {
  const search_product = findProductById(inventory, id);
  if (search_product == null) {
    return {
      error: "Product not found",
    };
  } else if (search_product.quantity + deltaQuality < 0) {
    return {
      message: "Cannot reduce stock below zero",
    };
  } else {
    search_product.quantity += deltaQuality;

    return search_product;
  }
}

export function getOutOfStock(inventory) {
  const filter_data = inventory.filter((n) => n.quantity === 0);
  return filter_data;
}

export function getLowOfStock(inventory, threshold = 5) {
  const alert_threshold = inventory.filter(
    (n) => 0 < n.quantity && n.quantity <= threshold,
  );
  return alert_threshold;
}

export function productValue(product) {
  return product.quantity * product.price;
}

export function grandTotal(inventory) {
  const total = inventory.reduce((acc, curr) => {
    const iter = curr.quantity * curr.price;
    return iter + acc;
  }, 0);
  return total;
}

export function formatCurrency(amount) {
  const lock_num = amount.toFixed(2).toString();
  return `$${lock_num}`;
}

export function getInventorySummary(inventory) {
  const getGrandTotal = grandTotal(inventory);
  const formatGrandTotal = formatCurrency(getGrandTotal);
  const lowStockCount = getLowOfStock(inventory);
  const lenOfInventory = inventory.length;
  const outOfStockCount = getOutOfStock(inventory);

  return {
    GrandTotal: getGrandTotal,
    format: formatGrandTotal,
    lowStockCount:lowStockCount.length,
    lengthOfInventory: lenOfInventory,
    outOfStockCount: outOfStockCount.length,
  }
}
getInventorySummary(inventory);

// paper code:
// console.log(inventory.name)
// console.log("item with this name already exists");
//  console.log("item created");
//
// console.log("Cannot reduce stock below zero")
// console.log(inventory)
// console.log(search_product)

//  let loop_start = 0
// let hold = [];
// for (let i = 0; i < inventory.length; i++) {
//   const iter = inventory[i]
//   const total = iter.quantity * iter.price
//   console.log(total)
//   hold.push(total);
//   console.log("hold:",hold);

//   // break;
//   // console.log("inside i loop", iter)
// }
// console.log("current value", iter);
// console.log("current value",curr);
// const hold = iter + acc;
// console.log("accumulator", hold);
  // console.log({
  //   GrandTotal: getGrandTotal,
  //   format: formatGrandTotal,
  //   lowStockCount: lowStockCount.length,
  //   lengthOfInventory: lenOfInventory,
  //   outOfStockCount: outOfStockCount.length,
  // });