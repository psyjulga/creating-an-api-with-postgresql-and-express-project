## API Endpoints

#### Products

- Index [GET] `/products`
- Show [GET] `/products/:id`
- Create [POST] `/products` => **token required**

#### Users

- Index [GET] `/users` => **token required**
- Show [GET] `/users/:id` => **token required**
- Create [POST] `/users` => **token required**

#### Orders

- Index [GET] `/orders` => **token required**
- Show [GET] `/orders/:id` => **token required**
- Show by current Order [GET] `/orders/:id/users` => **token required**
- Create [POST] `/orders` => **token required**
- Add Product to Order [POST] `orders/:id/products` => **token required**

## Database Schema

#### Products

- product_id _SERIAL PRIMARY KEY_
- name _VARCHAR(25) NOT NULL_
- price _integer NOT NULL_

#### Users

- user_id _SERIAL PRIMARY KEY_
- first_name _VARCHAR(25)_
- last_name _VARCHAR(25)_
- password_digest _VARCHAR_

#### Orders

- order_id _SERIAL PRIMARY KEY_
- status _VARCHAR(15)_ => active / complete
- user_id _bigint REFERENCES users(user_id)_ => **foreign key**

### Order_Products => Join Table

- id _SERIAL PRIMARY KEY_
- quantity _integer_
- order_id _bigint REFERENCES orders(order_id)_ => \*_foreign key_
- product_id _bigint REFERENCES products(product_id)_ => \*_foreign key_
