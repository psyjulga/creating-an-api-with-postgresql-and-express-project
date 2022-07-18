CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(25),
  email VARCHAR(25),
  password_digest VARCHAR(25)
);