// orderService.js
// Database transactional operations for order creation and line items.

import { pool } from "../config/db.js";

async function createOrder(orderData) {
  let totalAmount = 0;
  const verifiedItems = [];
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // ── Stock check & price verification ────────────────────────────────────
    // We read price from the DB (not the frontend) to prevent price tampering.
    for (const item of orderData.items) {
      const productResult = await client.query(
        "SELECT * FROM products WHERE id = $1",
        [item.product_id], // ✅ snake_case matches frontend
      );
      const product = productResult.rows[0];

      if (!product || product.stock < item.quantity) {
        throw new Error("Insufficient stock");
      }

      await client.query(
        "UPDATE products SET stock = stock - $1 WHERE id = $2",
        [item.quantity, item.product_id], // ✅ snake_case
      );

      totalAmount += Number(product.price) * item.quantity;

      verifiedItems.push({
        productId: item.product_id,
        quantity: item.quantity,
        unitprice: product.price,
      });
    }

    // ── Insert order ─────────────────────────────────────────────────────────
    const orderResult = await client.query(
      "INSERT INTO orders(customer_name, customer_email, total_amount) VALUES($1, $2, $3) RETURNING id",
      [orderData.customer_name, orderData.customer_email, totalAmount], // ✅ snake_case, 3 values for 3 placeholders
    );
    const orderId = orderResult.rows[0].id;

    // ── Insert order items ───────────────────────────────────────────────────
    for (const item of verifiedItems) {
      await client.query(
        "INSERT INTO order_items(order_id, product_id, quantity, unit_price) VALUES($1, $2, $3, $4)",
        [orderId, item.productId, item.quantity, item.unitprice],
      );
    }

    await client.query("COMMIT");
    return {
      orderId: orderId,
      totalAmount: totalAmount,
      status: "COMPLETED",
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function getOrderById(orderId) {
  const result = await pool.query(
    `
      SELECT orders.id, orders.customer_name, orders.customer_email,
             orders.total_amount, orders.status, orders.created_at,
             products.name, order_items.quantity, order_items.unit_price
      FROM orders
        INNER JOIN order_items ON orders.id = order_items.order_id
        INNER JOIN products  ON order_items.product_id = products.id
      WHERE orders.id = $1
    `,
    [orderId],
  );
  return result.rows;
}

export { createOrder, getOrderById };

/*
async function createOrder(orderData){
  const client = pool.connect()
  let totalAmount;
  const verifiedItems  = []
  try{

    await client.query("BEGIN")

   for(const item of orderData.items){
      const productResult = client.query(
      "SELECT * FROM products where id = $1",
      [item.id])

      const product = productResult.rows[0]

      if(!product || product.stock <= item.quantity){
      throw new Error("insufficient stock")}

    await client.query(
    "UPDATE products SET stock = stock - $1 where id= $2",
    [item.quantity, item.product_id]
    )

   totalAmount += product.price * item.quantity
      
  verifiedItems.push({
  productId: item.product_id,
  quantity: item.quantity,,
  unitprice: product.unitprice
  })
   }

const orderResult =  await client.query(
   "INSERT INTO orders (customer_name, customer_email, totalAmount)  VALUES($1, $2, $3) RETURNING id,
   [orderDate.customer_name], [orderData.customer_email], [totalAmount] "
   )
  const orderId = orderResult.rows[0].id

   for(const item of verifiedItems){
    await client.query(
    "INSERT INTO order_items (order_id, product_id, quantity, unit_price),
    [orderId], [item.productId], [item.quantity], [item.unit_price]
    "
    )
   }

   await client.query("COMMIT")
   return {
   orderId: orderId,
   totalAmount: totalAmount,
   status: "SUCCESSFUL"}
  )
  }catch(error){
  await client.query("ROLLBACK")
  throw error
  }finally{
  await client.release()
  }
}

async function getOrderById(orderId){
      const result = await client.query(
      "SELECT order_id, order.custmer_name, order.customer_email, order.totalAmount, product.name, order_items.product_id, order_items.order_id, order_items.quantity, order_items.unit_price,
      FROM orders 
      INNER JOIN orders ON order_items.order_id = orders.id
      INNER JOIN products ON order_items.product_id = products.id"
      ), [orderId]

      return orderId.rows
}
*/
