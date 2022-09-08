# Storefront Backend Project

*My second backend project with the following task:*
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

## Instructions

1. Install all dependencies:
   `npm install`
2. Start Docker: `npm run db`
3. Create a user and the databases via psql commands and grant privileges:

```
   CREATE USER admin WITH PASSWORD 'admin';
   CREATE DATABASE storefront;
   CREATE DATABASE storefront_test;
   GRANT ALL PRIVILEGES ON DATABASE storefront TO admin;
   GRANT ALL PRIVILEGES ON DATABASE storefront_test TO admin;
```

4. Run the migrations:
   `npm run migrate-up`
5. Compile to Typescript and start the server on **PORT 3000**:
   `npm run watch`
6. Run the tests with jest:
   `npm run test`

## Routes and Database Schema

=> overview of all endpoints and tables inside `REQUIREMENTS.md`

## Environment Variables

### => are listed in the .env file which is added to .gitignore

- POSTGRES_URL=localhost
- POSTGRES_PORT=5432
- POSTGRES_USER=admin
- POSTGRES_PASSWORD=admin
- POSTGRES_DB=storefront
- POSTGRES_TEST_DB=storefront_test
- SERVER_PORT=3000
- BCRYPT_PASSWORD=your-secret-password
- SALT_ROUNDS=10
- TOKEN_SECRET=abc123def456
