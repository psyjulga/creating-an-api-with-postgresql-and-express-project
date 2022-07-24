import client from '../database'

export type Order = {
	order_id?: string | number
	status: 'active' | 'complete'
	user_id: string
	// references users table
}

export type OrdersProducts = {
	id?: string | number
	quantity: number
	order_id: string
	product_id: string
}

export class OrderStore {
	async index(): Promise<Order[]> {
		try {
			const conn = await client.connect()
			const sql = 'SELECT * FROM orders'
			const res = await conn.query(sql)
			conn.release()
			return res.rows
		} catch (e) {
			throw new Error(`Error in OrderStore index(): ${e}`)
		}
	}

	async show(order_id: string): Promise<Order> {
		try {
			const conn = await client.connect()
			const sql = 'SELECT * FROM orders WHERE order_id=($1)'
			const res = await conn.query(sql, [order_id])
			conn.release()
			return res.rows[0]
		} catch (e) {
			throw new Error(`Error in OrderStore show(${order_id}): ${e}`)
		}
	}

	async showOrderByUser(user_id: string): Promise<Order> {
		try {
			const conn = await client.connect()
			const sql = 'SELECT * FROM orders WHERE user_id=($1)'
			const res = await conn.query(sql, [user_id])
			conn.release()
			return res.rows[0]
		} catch (e) {
			throw new Error(`Error in OrderStore showOrderByUser(${user_id}): ${e}`)
		}
	}

	async create(order: Order): Promise<Order> {
		const { status, user_id } = order
		try {
			const conn = await client.connect()
			const sql =
				'INSERT INTO orders (order_id, status, user_id) VALUES (default, $1, $2) RETURNING *'
			const res = await conn.query(sql, [status, user_id])
			conn.release()
			return res.rows[0]
		} catch (e) {
			throw new Error(`Error in OrderStore create(...): ${e}`)
		}
	}

	async addProductToOrder(orders_products: OrdersProducts): Promise<Order> {
		const { quantity, order_id, product_id } = orders_products
		// check if order status is 'active'
		// so that you cannot add products to completed orders
		try {
			const ordersql = 'SELECT * FROM orders WHERE order_id=($1)'
			const conn = await client.connect()

			const result = await conn.query(ordersql, [order_id])

			const order = result.rows[0]

			if (order.status === 'complete') {
				throw new Error(
					`Could not add product ${product_id} to order ${order_id} because order status is ${order.status}`
				)
			}

			conn.release()
		} catch (e) {
			throw new Error(`${e}`)
		}
		// we add a produt to an EXISTING ORDER
		// for that we use the JOIN TABLE => orders_products
		try {
			const conn = await client.connect()
			const sql =
				'INSERT INTO orders_products (id, quantity, order_id, product_id) VALUES(default, $1, $2, $3) RETURNING *'
			const res = await conn.query(sql, [quantity, order_id, product_id])
			const order = res.rows[0]
			conn.release()
			return order
		} catch (e) {
			throw new Error(
				`Error in OrderStore addProduct[${product_id}]ToOrder[${order_id}](...): ${e}`
			)
		}
	}
}
