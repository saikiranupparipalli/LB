// 03_promise_chaining.js
// Phase 1: Sequential asynchronous steps and Promise chaining.

function fetchProduct(id) {
  return new Promise((resolve, reject) => {
    if (id === 1) {
      setTimeout(() => {
        resolve({ id, name: "Mechanical Keyboard", price: 100 });
      }, 2000);
    } else {
      reject();
    }
  });
}
function applyTax(totalPrice) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(totalPrice * 1.8);
    }, 1000);
  });
}
fetchProduct(1)
  .then((data) => {
    return data.price;
  })
  .then((data) => {
    return applyTax(data);
  })
  .then((finalPrice) => {
    console.log("finalPrice:", finalPrice);
  });

// fetchProduct(1);
// applyTax().then((data) => console.log(data));
