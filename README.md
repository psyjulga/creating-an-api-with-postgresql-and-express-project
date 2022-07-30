# Storefront Backend Project

## Instructions

1. `npm install` to install all dependencies
2. `npm run db` to load the postgres container with docker and initialize the databases
3. `npm run migrate-up` to run the migrations to create the database tables
4. `npm run watch` to compile to Typescript and start the server on **PORT 3000**
5. `npm run test` to run the tests with jest

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
