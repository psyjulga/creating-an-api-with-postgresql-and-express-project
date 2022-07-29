import { PoolClient } from 'pg'
import client from '../database'

const clearDatabase = async (): Promise<void> => {
	const queries = [
		'DELETE FROM orders_products WHERE quantity IS NOT NULL',
		'DELETE FROM orders WHERE order_id IS NOT NULL',
		'DELETE FROM users WHERE user_id IS NOT NULL',
		'DELETE FROM products WHERE product_id IS NOT NULL',
	]
	let conn: PoolClient | undefined
	try {
		conn = await client.connect()
		queries.forEach(async (query) => {
			await conn?.query(query)
		})
	} catch (e) {
		throw new Error(`Error in clearDatabase(): ${e}`)
	} finally {
		conn?.release()
	}
}

export default clearDatabase
