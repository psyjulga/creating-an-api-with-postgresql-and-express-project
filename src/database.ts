import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
	POSTGRES_URL,
	POSTGRES_DB,
	POSTGRES_TEST_DB,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	ENV,
} = process.env

console.log('postgres db in database.ts: ', POSTGRES_DB)

const client = new Pool({
	host: POSTGRES_URL,
	database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_TEST_DB,
	user: POSTGRES_USER,
	password: POSTGRES_PASSWORD,
})

export default client
