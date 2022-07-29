import request from 'supertest'
import app from '../server'
import { Server } from 'http'
import clearDatabase from '../util/clearDatabase'
import populateDatabase from '../util/populateDatabase'

let server: Server

describe('Product Handler', () => {
	beforeAll(async () => {
		server = app.listen()
		await clearDatabase()
		await populateDatabase()
	})

	afterAll(async () => {
		await clearDatabase()
		server.close()
	})

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
	})
})
