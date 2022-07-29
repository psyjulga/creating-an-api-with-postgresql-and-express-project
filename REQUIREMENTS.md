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

- product*id \_SERIAL PRIMARY KEY*
- name _VARCHAR(25) NOT NULL_
- price _integer NOT NULL_

#### Users

- user*id \_SERIAL PRIMARY KEY*
- first*name \_VARCHAR(25)*
- last*name \_VARCHAR(25)*
- password*digest \_VARCHAR*

#### Orders

- order*id \_SERIAL PRIMARY KEY*
- status _VARCHAR(15)_ => active / complete
- user*id \_bigint REFERENCES users(user_id)* => **foreign key**

#### Order_Products => Join Table

- id _SERIAL PRIMARY KEY_
- quantity _integer_
- order*id \_bigint REFERENCES orders(order_id)* => **foreign key**
- product*id \_bigint REFERENCES products(product_id)* => **foreign key**
