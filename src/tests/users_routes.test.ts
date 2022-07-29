import request from 'supertest'
import app from '../server'
import { Server } from 'http'
import clearDatabase from '../util/clearDatabase'
import populateDatabase from '../util/populateDatabase'

let server: Server

describe('User Handler', () => {
	beforeAll(async () => {
		server = app.listen()
		await clearDatabase()
		await populateDatabase()
	})

	afterAll(async () => {
		await clearDatabase()
		server.close()
	})

	test('POST /users/ calls create() and returns 200', async () => {
		const res = await request(server).post('/users/').send({
			first_name: 'User Handler Send',
			last_name: 'Doe',
			password_digest: 'handler-test-password',
		})

		expect(res.status).toBe(200)
	})
	test('GET /users/ calls index() and returns 200', async () => {
		const res = await request(server).get('/users/')
		expect(res.status).toBe(200)
	})
	test('GET /users/:id calls show() and returns 200', async () => {
		const res = await request(server).get('/users/1')
		expect(res.status).toBe(200)
	})
	test('GET /users/:id/authenticate calls authenticate() and returns 200', async () => {
		const res = await request(server)
			.get('/users/2/authenticate')
			.send({ password_digest: 'handler-test-password' })

		expect(res.status).toBe(200)
	})
})
