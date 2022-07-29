CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(25),
  last_name VARCHAR(25),
  password_digest VARCHAR
);

