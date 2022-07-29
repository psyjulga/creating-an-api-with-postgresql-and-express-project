import { PoolClient } from 'pg'
import client from '../database'

const populateDatabase = async (): Promise<void> => {
	const queries = [
		`INSERT INTO products (product_id, name, price) VALUES (default, 'populated product', 100)`,
		`INSERT INTO users (user_id, first_name, last_name, password_digest) VALUES (default, 'first name', 'last name', 'a password')`,
		`INSERT INTO orders (order_id, status, user_id) VALUES (default, 'active', 1)`,
	]
	let conn: PoolClient | undefined
	try {
		conn = await client.connect()
		queries.forEach(async (query) => {
			await conn?.query(query)
		})
	} catch (e) {
		throw new Error(`Error in populateDatabase(): ${e}`)
	} finally {
		conn?.release()
	}
}

export default populateDatabase
