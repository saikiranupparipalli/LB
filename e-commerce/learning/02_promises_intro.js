// 02_promises_intro.js
// Phase 1: Promise anatomy, states (pending, fulfilled, rejected), resolve, reject, then, catch.

// function fetchProductionDetails(id) {
//   const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (id === 1) {
//         const data = resolve({
//           id: 1,
//           name: "Wireless Headphones",
//           price: 99.99,
//           inStock: true,
//         });
//         return data;
//       } else {
//         reject("Product not found in database!");
//       }
//     }, 3000);
//   });
//   promise.then((data) => {
//     console.log(data);
//   });
//   promise.catch((error) => {
//     console.log("Product not found in database!");
//   });
//   promise.finally(() => {
//     console.log("Operation finished");
//   });
// }
// fetchProductionDetails(1);

function fetchProductionDetails(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) {
        resolve({
          id: 1,
          name: "Wireless Headphones",
          price: 99.99,
          inStock: true,
        });
        
      } else {
        reject("Product not found in database!");
      }
    }, 3000);
  });
}
fetchProductionDetails(1)
.then((data)=> console.log(data))
.catch((err)=> console.log(err))
.finally(()=> console.log("Operation finished"))