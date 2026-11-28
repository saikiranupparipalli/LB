-- 07_sql_practice.sql
-- Phase 4: Direct SQL operations, CRUD, filtering, joins, and transactions.

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL CHECK (price >=0),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(150) NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
    status VARCHAR(30) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'COMPLETED', 'CANCELLED')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items(
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(id),
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL 
);

INSERT INTO products(name, description, price, stock)
VALUES
('Wireless Keyboard', 'Ergonomic mechanical keyboard', 89.99, 20),
('Gaming Mouse', 'Optical sensor RGB mouse', 49.99, 5),
('USB-C Cable', 'Fast charging durable cable', 15.00, 0);

SELECT * FROM products;

SELECT * FROM products WHERE (stock > 0);

SELECT * FROM products ORDER BY price DESC LIMIT 2;


SELECT * FROM orders
INNER JOIN order_items ON orders.id  = order_items.order_id
INNER JOIN products ON order_items.product_id = products.id;

BEGIN;
UPDATE products  SET stock = stock - 1 WHERE id = 1 AND stock >=1;

INSERT INTO orders  (customer_name, customer_email, total_amount) VALUES('Bob', 'bob@example.com', 89);

INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES(1,1,1,89);
COMMIT;