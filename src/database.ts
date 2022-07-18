import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const { POSTGRES_URL, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } =
	process.env

const client = new Pool({
	host: POSTGRES_URL,
	database: POSTGRES_DB,
	user: POSTGRES_USER,
	password: POSTGRES_PASSWORD,
})

export default client
