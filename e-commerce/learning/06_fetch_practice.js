// 06_fetch_practice.js
// Phase 3: Client-server HTTP communication using the Fetch API.

async function getSingleProduct() {
  try {
    console.log("Sending req to server...");
    const res = await fetch("https://dummyjson.com/products/1");
    const data = await res.json();
    console.log("Received data from servers:", data);
  } catch (error) {
    console.log("Network or fetch failed", error);
  }
}

// getSingleProduct();

async function getProductSafely(id) {
  try {
    const res = await fetch("https://dummyjson.com/products/" + id);
    if (!res.ok) {
      throw new Error("HTTP Error! Status:" + res.status);
    }
    const data = await res.json();
    // console.log(data)
    console.log("name:", data.title, "price:", data.price);
  } catch (error) {
    console.log("Caught an error", error.message);
  }
}

// getProductSafely(1);
// getProductSafely(99999);

async function addNewProduct() {
  try {
    const data = {
      title: "Custom Gaming Mouse",
      price: 49.99,
    };

    const res = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("HTTP error! Status" + res.status);
    }

    const createdProduct = await res.json();
    console.log("Product created successfully", createdProduct);
  } catch (error) {
    console.log("Caught an error", error.message);
  }
}

async function updateProductPrice(id, newPrice) {
  try {
    const res = await fetch("https://dummyjson.com/products/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: newPrice }),
    });
    const upDatedPro = await res.json();
    console.log("product updated", upDatedPro);
  } catch (error) {
    console.log("Caught an error", error.message);
  }
}

async function getPro() {
  try {
    const res = await fetch("https://dummyjson.com/products/");
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}
// addNewProduct()
// getPro()
// updateProductPrice(22, 55);

async function deleteProduct(id) {
  try {
    const res = await fetch("https://dummyjson.com/products/" + id, {
      method: "DELETE",
    });
    const result = await res.json();
    console.log("Delete confirmation", result);
  } catch (error) {
    console.log(error.message);
  }
}

deleteProduct(1);
getPro();
