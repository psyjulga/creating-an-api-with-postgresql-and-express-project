## API Endpoints

#### Products

- Index [GET] `/products`
- Show [GET] `/products/:id`
- Create [POST] `/products` => **token required**

#### Users

- Index [GET] `/users` => **token required**
- Show [GET] `/users/:id` => **token required**
- Create [POST] `/users` => SIGN UP
- Authenticate [GET] `users/:id/authenticate` => SIGN IN

#### Orders

- Index [GET] `/orders` => **token required**
- Show [GET] `/orders/:id` => **token required**
- Show by current User [GET] `/orders/:id/users` => **token required**
- Create [POST] `/orders` => **token required**
- Add Product to Order [POST] `orders/:id/products` => **token required**

## Database Schema

#### Products

- product_id => SERIAL PRIMARY KEY
- name => VARCHAR(25) NOT NULL
- price => integer NOT NULL

#### Users

- user_id => SERIAL PRIMARY KEY
- first_name => VARCHAR(25)
- last_name => VARCHAR(25)
- password_digest => VARCHAR

#### Orders

- order_id => SERIAL PRIMARY KEY
- status => VARCHAR(15) => active or complete
- user_id => bigint REFERENCES users(user_id) => **foreign key**

#### Order_Products => Join Table

- id => SERIAL PRIMARY KEY
- quantity => integer
- order_id => bigint REFERENCES orders(order_id) => **foreign key**
- product_id => bigint REFERENCES products(product_id) => **foreign key**
