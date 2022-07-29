CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  status VARCHAR(15),
  user_id bigint REFERENCES users(user_id)
);

