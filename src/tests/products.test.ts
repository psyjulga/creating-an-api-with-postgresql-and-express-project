// import { Product, ProductStore } from '../models/product'
// import request from 'supertest'
// import app from '../server'
// import { Server } from 'http'
// import clearDatabase from '../util/clearDatabase'

// // testing endpoints => HANDLER
// const server: Server = app.listen(() => console.log('server running for tests'))

// describe('Product Handler', () => {
// 	afterAll(async () => {
// 		await clearDatabase('DELETE FROM products WHERE price=250')
// 	})
//   // ??
// 	// product is successfully passed to handler, but returns 400
// 	// ??
// 	test('POST /products/ calls create() and returns 200', async () => {
// 		const res = await request(server)
// 			.post('/products')
// 			.send({ name: 'product-route-test-product', price: 250 })
// 		expect(res.status).toBe(200)
// 	})
// 	test('GET /products/ calls index() and returns 200', async () => {
// 		const res = await request(server).get('/products/')
// 		expect(res.status).toBe(200)
// 	})
// 	test('GET /products/:id calls show() and returns 200', async () => {
// 		const res = await request(server).get('/products/1')
// 		expect(res.status).toBe(200)
// 	})

// 	server.close()
// })

// // testing model-database-interaction => MODEL
// const testStore = new ProductStore()

// const testProductToAdd: Product = {
// 	name: 'product-model-test-prod',
// 	price: 500,
// }
// // product_id is automatically generated
// const testProductWithId: Product = {
// 	product_id: 1,
// 	name: 'product-model-test-prod',
// 	price: 500,
// }

// describe('Product Model', () => {
// 	afterAll(async () => {
// 		await clearDatabase('DELETE FROM products WHERE price=500')
// 	})

// 	test('should have an index method', () => {
// 		expect(testStore.index).toBeDefined()
// 	})

// 	test('should have a show method', () => {
// 		expect(testStore.show).toBeDefined()
// 	})

// 	test('should have a create method', () => {
// 		expect(testStore.create).toBeDefined()
// 	})

// 	test('create method should add a product to the database', async () => {
// 		const res = await testStore.create(testProductToAdd)
// 		expect(res).toEqual(testProductWithId)
// 	})

// 	test('index method should return a list of all products', async () => {
// 		const res = await testStore.index()
// 		expect(res).toEqual([testProductWithId])
// 	})

// 	test('show method should return the correct product', async () => {
// 		const res = await testStore.show('1')
// 		expect(res).toEqual(testProductWithId)
// 	})
// })
