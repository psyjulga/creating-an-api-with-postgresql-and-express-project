import { Product, ProductStore } from '../models/product'

const store = new ProductStore()

const populatedTestProduct = {
	// is inserted into the database via the test command
	product_id: 1,
	name: 'populated product',
	price: 100,
}

describe('Product Model', () => {
	test('should have an index method', () => {
		expect(store.index).toBeDefined()
	})

	test('should have a show method', () => {
		expect(store.show).toBeDefined()
	})

	test('should have a create method', () => {
		expect(store.create).toBeDefined()
	})

	test('create method should add a product to the database', async () => {
		const testProductToAdd: Product = {
			name: 'product-model-test-prod',
			price: 500,
		}

		const res = await store.create(testProductToAdd)
		const { product_id, name, price } = res

		expect(typeof product_id).toBe('number')
		expect(name).toBe('product-model-test-prod')
		expect(price).toBe(500)
	})

	test('index method should return a list of all products', async () => {
		const res = await store.index()

		expect(res.length).toBeGreaterThanOrEqual(1)
		expect(res[0]).toEqual(populatedTestProduct)
	})

	test('show method should return the correct product', async () => {
		const res = await store.show('1')
		expect(res).toEqual(populatedTestProduct)

		await store.closeClient()
	})
})
