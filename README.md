# Storefront Backend Project

## Instructions

1. Install all dependencies:
   `npm install`
2. Start Docker: `npm run db`
3. Create a user and the databases via psql commands and grant privileges:

```CREATE USER admin WITH PASSWORD '12345';
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
- POSTGRES_PASSWORD=12345
- POSTGRES_DB=storefront
- POSTGRES_TEST_DB=storefront_test
- SERVER_PORT=3000
- BCRYPT_PASSWORD=your-secret-password
- SALT_ROUNDS=10
- TOKEN_SECRET=abc123def456
