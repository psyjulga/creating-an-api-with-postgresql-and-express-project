CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  status VARCHAR(15),
  user_id bigint REFERENCES users(user_id)
);

INSERT INTO orders (order_id, status, user_id) VALUES (default, 'active', 1)
