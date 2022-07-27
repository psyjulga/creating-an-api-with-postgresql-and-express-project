// import request from 'supertest'
// import app from '../server'
// import { Server } from 'http'
// import clearDatabase from '../util/clearDatabase'

// const server: Server = app.listen()

// describe('Product Handler', () => {
// 	afterAll(async () => {
// 		await clearDatabase('DELETE FROM products WHERE price=250')
// 		await server.close()
// 	})
// 	test('POST /products/ calls create() and returns 200', async () => {
// 		const res = await request(server)
// 			.post('/products/')
// 			.send({ name: 'product-route-test-prod', price: 250 })
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
// })
