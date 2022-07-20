import client from '../database'

export type Product = {
	product_id?: number
	name: string
	price: number
}

export class ProductStore {
	async index(): Promise<Product[]> {
		try {
			const conn = await client.connect()
			const sql = 'SELECT * FROM products'
			const res = await conn.query(sql)
			conn.release()
			return res.rows
		} catch (e) {
			throw new Error(`Error in ProductStore index(): ${e}`)
		}
	}
	async show(product_id: string): Promise<Product> {
		try {
			const conn = await client.connect()
			const sql = 'SELECT * FROM products WHERE product_id=($1)'
			const res = await conn.query(sql, [product_id])
			conn.release()
			return res.rows[0]
		} catch (e) {
			throw new Error(`Error in ProductStore show(${product_id}): ${e}`)
		}
	}
	async create(product: Product): Promise<Product> {
		// TOKEN required
		// in handler ?
		const { name, price } = product
		try {
			const conn = await client.connect()
			const sql =
				'INSERT INTO products (product_id, name, price) VALUES (default, $1, $2) RETURNING *'
			// !!!!!!
			// maybe syntax error - "default"
			const res = await conn.query(sql, [name, price])
			conn.release()
			return res.rows[0]
		} catch (e) {
			throw new Error(`Error in ProductStore create(${name}): ${e}`)
		}
	}
}
