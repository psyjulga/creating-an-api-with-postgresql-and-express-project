import { Order, OrderStore } from '../models/order'

const testStore = new OrderStore()

const testOrderToAdd: Order = {
	status: 'active',
	user_id: 1,
}
// order_id is automatically generated
const testOrderWithId: Order = {
	order_id: '1',
	status: 'active',
	user_id: 1,
}

describe('Order Model', () => {
	test('should have an index method', () => {
		expect(testStore.index).toBeDefined()
	})

	test('should have a show method', () => {
		expect(testStore.show).toBeDefined()
	})

	test('should have a create method', () => {
		expect(testStore.create).toBeDefined()
	})

	test('should have a addProductToOrder method', () => {
		expect(testStore.addProductToOrder).toBeDefined()
	})

	test('create method should add a order to the database', async () => {
		const res = await testStore.create(testOrderToAdd)
		expect(res).toEqual(testOrderWithId)
	})

	test('index method should return a list of all products', async () => {
		const res = await testStore.index()
		expect(res).toEqual([testOrderWithId])
	})

	test('show method should return the correct product', async () => {
		const res = await testStore.show('1')
		expect(res).toEqual(testOrderWithId)
	})

	// test addProductToOrder
})
