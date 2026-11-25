// 04_async_await.js
// Phase 2: Modern asynchronous syntax with async, await, and try/catch.


function fetchProduct(id) {
  return new Promise((resolve, reject) => {
    if (id === 1) {
      setTimeout(() => {
        resolve({ id, name: "Mechanical Keyboard", price: 100 });
      }, 2000);
    } else {
      reject("Product not found");
    }
  });
}
function applyTax(totalPrice) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(totalPrice * 1.8);
    }, 2000);
  });
}

async function processOrder(id){
    try{
        const product = await fetchProduct(id)
    console.log("product name", product)

    const finalPrice = await applyTax(product.price)
    console.log("finalPrice", finalPrice)
    }catch(error){
        console.log(error)
    }
}
processOrder(11)