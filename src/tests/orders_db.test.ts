import { Order, OrderStore, OrdersProducts } from '../models/order'

const store = new OrderStore()

const populatedTestOrder = {
	// is inserted into the database via the test command
	order_id: 1,
	status: 'active',
	user_id: '1',
}

describe('Order Model', () => {
	test('should have an index method', () => {
		expect(store.index).toBeDefined()
	})

	test('should have a show method', () => {
		expect(store.show).toBeDefined()
	})

	test('should have a showOrderByUser method', () => {
		expect(store.showOrderByUser).toBeDefined()
	})

	test('should have a create method', () => {
		expect(store.create).toBeDefined()
	})

	test('should have a addProductToOrder method', () => {
		expect(store.addProductToOrder).toBeDefined()
	})

	test('create method should add an order to the database', async () => {
		const testOrderToAdd: Order = {
			status: 'active',
			user_id: '1',
		}
		const res = await store.create(testOrderToAdd)
		const { order_id, status, user_id } = res

		expect(typeof order_id).toBe('number')
		expect(status).toBe('active')
		expect(user_id).toBe('1')
	})

	test('index method should return a list of all orders', async () => {
		const res = await store.index()

		expect(res.length).toBeGreaterThanOrEqual(1)
		expect(res[0]).toEqual(populatedTestOrder)
	})

	test('show method should return the correct order', async () => {
		const res = await store.show('1')
		expect(res).toEqual(populatedTestOrder)
	})

	test('showOrderByUser method should return the order of the current user', async () => {
		const res = await store.showOrderByUser('1')
		expect(res).toEqual(populatedTestOrder)
	})

	test('addProductToOrder method should return the order from the join table', async () => {
		const ordersProductsToAdd: OrdersProducts = {
			quantity: 5,
			order_id: '1',
			product_id: '1',
		}

		const res = await store.addProductToOrder(ordersProductsToAdd)
		const { id, quantity, order_id, product_id } = res
		expect(typeof id).toBe('number')
		expect(quantity).toBe(5)
		expect(order_id).toBe('1')
		expect(product_id).toBe('1')

		await store.closeClient()
	})
})
