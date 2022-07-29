import { Product, ProductStore } from '../models/product'
import clearDatabase from '../util/clearDatabase'
import populateDatabase from '../util/populateDatabase'

const store = new ProductStore()

const testProductToAdd: Product = {
	// will be populated in the tests
	name: 'product-model-test-prod',
	price: 500,
}
const populatedTestProduct = {
	// is populated by populateDatabase
	product_id: 1,
	name: 'populated product',
	price: 100,
}

const testProductWithId: Product = {
	// will be used for comparison
	product_id: 2, // product_id is automatically generated
	name: 'product-model-test-prod',
	price: 500,
}

describe('Product Model', () => {
	beforeAll(async () => {
		await clearDatabase()
		await populateDatabase()
	})

	afterAll(async () => {
		await clearDatabase()
	})

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
		const res = await store.create(testProductToAdd)
		expect(res).toEqual(testProductWithId)
	})

	test('index method should return a list of all products', async () => {
		const res = await store.index()
		expect(res).toEqual([populatedTestProduct, testProductWithId])
	})

	test('show method should return the correct product', async () => {
		const res = await store.show('1')
		expect(res).toEqual(populatedTestProduct)
	})
})
