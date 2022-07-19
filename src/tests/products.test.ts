import { Product, ProductStore } from '../models/product'

const testStore = new ProductStore()

const testProductToAdd: Product = {
	name: 'test-product-1',
	price: 500,
}
// product_id is automatically generated
const testProductWithId: Product = {
	product_id: '1',
	name: 'test-product-1',
	price: 500,
}

describe('Product Model', () => {
	test('should have an index method', () => {
		expect(testStore.index).toBeDefined()
	})

	test('should have a show method', () => {
		expect(testStore.show).toBeDefined()
	})

	test('should have a create method', () => {
		expect(testStore.create).toBeDefined()
	})

	test('create method should add a product to the database', async () => {
		const res = await testStore.create(testProductToAdd)
		expect(res).toEqual(testProductWithId)
	})

	test('index method should return a list of all products', async () => {
		const res = await testStore.index()
		expect(res).toEqual([testProductWithId])
	})

	test('show method should return the correct product', async () => {
		const res = await testStore.show('123')
		expect(res).toEqual(testProductWithId)
	})
})
