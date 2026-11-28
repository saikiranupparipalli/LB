-- seed.sql
-- Mock product catalog data insertion.

INSERT INTO products (name, description, price, stock)
VALUES
    ('Wireless Mechanical Keyboard', 'Compact 75% ergonomic mechanical keyboard with tactile switches.', 89.99, 20),
    ('Ergonomic Gaming Mouse', 'Lightweight optical sensor mouse with programmable buttons.', 49.99, 15),
    ('27-Inch 4K Monitor', 'IPS UHD display with USB-C power delivery and thin bezels.', 329.99, 8),
    ('Noise-Cancelling Headphones', 'Over-ear wireless headphones with 30-hour battery life.', 199.50, 12),
    ('USB-C Hub (7-in-1)', 'Aluminum multiport adapter with HDMI, USB 3.0, and SD card reader.', 34.99, 25),
    ('Braided USB-C Cable', 'Durable 2m fast-charging 100W USB-C to USB-C cable.', 15.00, 0)
ON CONFLICT (name) DO NOTHING;
