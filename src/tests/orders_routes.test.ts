import request from 'supertest'
import app from '../server'
import { Server } from 'http'
import clearDatabase from '../util/clearDatabase'
import populateDatabase from '../util/populateDatabase'
import { OrderStore } from '../models/order'

const store = new OrderStore()
let server: Server

describe('Order Handler', () => {
	beforeAll(async () => {
		server = app.listen()
		await clearDatabase()
		await populateDatabase()
	})

	afterAll(async () => {
		server.close()
		await clearDatabase()
		// store.closeClient()
	})

	test('POST orders/ calls create() and returns 200', async () => {
		const res = await request(server).post('/orders/').send({
			status: 'active',
			user_id: '1',
		})
		expect(res.status).toBe(200)
	})
	test('GET /orders/ calls index() and returns 200', async () => {
		const res = await request(server).get('/orders/')
		expect(res.status).toBe(200)
	})
	test('GET /orders/:id calls show() and returns 200', async () => {
		const res = await request(server).get('/orders/1')
		expect(res.status).toBe(200)
	})
	test('GET /orders/:id/users calls showOrderByUser() and returns 200', async () => {
		const res = await request(server).get('/orders/1/users')
		expect(res.status).toBe(200)
	})
	test('POST orders/:id/products calls addProductToOrder() and returns 200', async () => {
		const res = await request(server).post('/orders/1/products').send({
			quantity: 5,
			product_id: 1,
		})
		expect(res.status).toBe(200)
	})
})
