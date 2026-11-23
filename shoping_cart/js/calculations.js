import { getCart } from "./cart.js";

function calculateItemTotal(price, stock) {
  const multiplyPrice = price * stock;
  return multiplyPrice;
}

function calculateSubTotal(getCart) {
  let subTotal = 0;
  for (let i = 0; i < getCart.length; i++) {
    const itemInfo = getCart[i];
    const total = calculateItemTotal(itemInfo.price, itemInfo.stock);
    subTotal += total;
    // console.log("Total:", total)
  }
  return subTotal;
}

function applyCoupon(coupon, subTotal) {
  if (coupon !== "") {
    const toCap = coupon.toString().trim().toUpperCase();
    if (toCap === "EXTRA10") {
      const calDis = 10 / 100;
      const dis = subTotal * calDis;
      return dis;
    } else if (toCap === "EXTRA50") {
      const calDis = 50 / 100;
      const dis = subTotal * calDis;
      return dis;
    } else {
      return 0;
    }
  }
}

function calculateFinalTotal(subTotal, discount) {
  const finalDis = subTotal - discount;
  const tax = (finalDis * 8) / 100;
  const finalPrice = finalDis + tax;
  return {
    subTotal,
    discount,
    tax,
    finalPrice,
  };
}

export {
  calculateItemTotal,
  calculateSubTotal,
  applyCoupon,
  calculateFinalTotal,
};
