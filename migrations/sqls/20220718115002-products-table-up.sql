CREATE TABLE products (
  product_id SERIAL PRIMARY KEY,
  name VARCHAR(25) NOT NULL,
  price integer NOT NULL
);

INSERT INTO products (product_id, name, price) VALUES (default, 'populated product', 100)

