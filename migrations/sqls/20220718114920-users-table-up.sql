CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(25),
  last_name VARCHAR(25),
  password_digest VARCHAR
);

INSERT INTO users (user_id, first_name, last_name, password_digest) VALUES (default, 'first name', 'last name', 'a password')