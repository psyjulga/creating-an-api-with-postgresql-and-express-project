import client from '../database'

export type Product = {
	product_id?: number
	name: string
	price: number
}

export class ProductStore {
	async index(): Promise<Product[]> {
		let conn
		try {
			conn = await client.connect()
			const sql = 'SELECT * FROM products'
			const res = await conn.query(sql)
			return res.rows
		} catch (e) {
			throw new Error(`Error in ProductStore index(): ${e}`)
		} finally {
			conn?.release()
		}
	}
	async show(product_id: string): Promise<Product> {
		let conn
		try {
			conn = await client.connect()
			const sql = 'SELECT * FROM products WHERE product_id=($1)'
			const res = await conn.query(sql, [product_id])
			return res.rows[0]
		} catch (e) {
			throw new Error(`Error in ProductStore show(${product_id}): ${e}`)
		} finally {
			conn?.release()
		}
	}
	async create(product: Product): Promise<Product> {
		const { name, price } = product
		let conn
		try {
			conn = await client.connect()
			const sql =
				'INSERT INTO products (product_id, name, price) VALUES (default, $1, $2) RETURNING *'
			const res = await conn.query(sql, [name, price])
			return res.rows[0]
		} catch (e) {
			throw new Error(`Error in ProductStore create(${name}): ${e}`)
		} finally {
			conn?.release()
		}
	}

	async closeClient() {
		await client.end()
	}
}
