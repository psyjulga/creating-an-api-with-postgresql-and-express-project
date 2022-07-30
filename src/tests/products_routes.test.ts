import request from 'supertest'
import app from '../server'
import { Server } from 'http'
import { ProductStore } from '../models/product'

const store = new ProductStore()
let server: Server

describe('Product Handler', () => {
	server = app.listen()

	test('POST /products/ calls create() and returns 200', async () => {
		const res = await request(server)
			.post('/products/')
			.send({ name: 'product-route-test-prod', price: 250 })
		expect(res.status).toBe(200)
	})
	test('GET /products/ calls index() and returns 200', async () => {
		const res = await request(server).get('/products/')
		expect(res.status).toBe(200)
	})
	test('GET /products/:id calls show() and returns 200', async () => {
		const res = await request(server).get('/products/1')
		expect(res.status).toBe(200)

		await store.closeClient()
	})

	server.close()
})
