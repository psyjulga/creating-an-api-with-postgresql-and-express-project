import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
// evtl weglassen weil es schon in server.ts ist?
// aber tests starten den server nicht, aber brauchen
// die db connection
const {
	POSTGRES_URL,
	POSTGRES_DB,
	POSTGRES_TEST_DB,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	NODE_ENV,
} = process.env

// let NODE_ENV
console.log('node_env in database.ts: ', NODE_ENV)

const client = new Pool({
	host: POSTGRES_URL,
	database: NODE_ENV === 'test' ? POSTGRES_TEST_DB : POSTGRES_DB,
	user: POSTGRES_USER,
	password: POSTGRES_PASSWORD,
})

export default client
