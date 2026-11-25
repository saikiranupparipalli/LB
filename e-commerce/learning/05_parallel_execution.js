// 05_parallel_execution.js
// Phase 2: Concurrency with Promise.all() and Promise.allSettled().

function fetchProduct(id) {
  const promise = new Promise((resolve, reject) => {
    if (id !== 2) {
      setTimeout(() => {
        resolve({ id: 420, name: "Mechanical Keyboard", price: 100 });
      }, 1500);
    } else {
      reject("product #2 is out of stock!");
    }
  });

  return promise;
}

async function testSequential() {
  const start = Date.now();
  await fetchProduct(1);
  await fetchProduct(2);
  await fetchProduct(3);
  console.log("seqential finished in(sequential):", Date.now() - start);
}

async function testParallel() {
  const start = Date.now();
  await Promise.all([fetchProduct(1), fetchProduct(2), fetchProduct(3)]);
  console.log("seqential finished in(parallel):", Date.now() - start);
}
// testSequential();
// testParallel();

async function resilientCart() {
  const results = await Promise.allSettled([
    fetchProduct(1),
    fetchProduct(2),
    fetchProduct(3),
  ]);
  results.forEach((product) => {
    if (product.status === "fulfilled") {
      console.log("Available", product.value.name);
    } else if (product.status === "rejected") {
      console.log("Unavailable", product.reason);
    }
  });
}
resilientCart()
// When you run Promise.allSettled(), JavaScript waits for every single Promise in your array to settle. Then, it creates a brand new plain JavaScript object for each one:

// For every Promise that succeeded (resolve):
// JavaScript creates an object with two properties:

// status: "fulfilled"
// value: whatever data you passed into resolve()

// For every Promise that failed (reject):
// JavaScript creates an object with two properties:

// status: "rejected"
// reason: whatever error message you passed into reject()