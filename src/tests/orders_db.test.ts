import { Order, OrderStore, OrdersProducts } from '../models/order'
import clearDatabase from '../util/clearDatabase'
import populateDatabase from '../util/populateDatabase'

const store = new OrderStore()

const testOrderToAdd: Order = {
	// will be populated in the tests
	status: 'active',
	user_id: '1',
}

const populatedTestOrder = {
	// is populated by populateDatabase
	order_id: 1,
	status: 'active',
	user_id: '1',
}

const testOrderWithId: Order = {
	// will be used for comparison
	order_id: 2, // order_id is automatically generated
	status: 'active',
	user_id: '1',
}

describe('Order Model', () => {
	beforeAll(async () => {
		await clearDatabase()
		await populateDatabase()
	})

	afterAll(async () => {
		await clearDatabase()
		// store.closeClient()
	})

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
		const res = await store.create(testOrderToAdd)
		expect(res).toEqual(testOrderWithId)
	})

	test('index method should return a list of all orders', async () => {
		const res = await store.index()
		expect(res).toEqual([populatedTestOrder, testOrderWithId])
	})

	test('show method should return the correct order', async () => {
		const res = await store.show('2')
		expect(res).toEqual(testOrderWithId)
	})

	test('showOrderByUser method should return the order of the current user', async () => {
		const res = await store.showOrderByUser('1')
		expect(res).toEqual(populatedTestOrder)
	})

	test('addProductToOrder method should return the order from the join table', async () => {
		const ordersProductsToAdd = {
			quantity: 5,
			order_id: '1',
			product_id: '1',
		}

		const ordersProductsWithId: OrdersProducts = {
			id: 1, // id will be autogenerated
			quantity: 5,
			order_id: '1',
			product_id: '1',
		}

		const res = await store.addProductToOrder(ordersProductsToAdd)
		expect(res).toEqual(ordersProductsWithId)
	})
})
