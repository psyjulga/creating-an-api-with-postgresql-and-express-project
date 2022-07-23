import { User, UserStore } from '../models/user'
import request from 'supertest'
import app from '../server'
import { Server } from 'http'

// testing endpoints => HANDLER
const server: Server = app.listen()

describe('User Handler', () => {
	test('POST /users/ calls create() and returns 200', async () => {
		const res = await request(server).post('/users/').send({
			first_name: 'Jane',
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
		// test authenticate method
		// DOES THAT WORK ??!!
		const res = await request(server).get('/users/1/authenticate')
		expect(res.status).toBe(200)
	})
	server.close()
})

// testing model-database-interaction => MODEL
const testStore = new UserStore()

const testUserToAdd: User = {
	first_name: 'John',
	last_name: 'Doe',
	password_digest: 'my_secret_password',
}
// user_id is automatically generated
const testUserWithId: User = {
	user_id: 1,
	first_name: 'John',
	last_name: 'Doe',
	password_digest: 'my-secret-password',
}

describe('User Model', () => {
	test('should have an index method', () => {
		expect(testStore.index).toBeDefined()
	})

	test('should have a show method', () => {
		expect(testStore.show).toBeDefined()
	})

	test('should have a create method', () => {
		expect(testStore.create).toBeDefined()
	})

	test('should have a authenticate method', () => {
		expect(testStore.authenticate).toBeDefined()
	})

	test('create method should add a user to the database', async () => {
		let res = await testStore.create(testUserToAdd)
		res = { ...res, password_digest: 'my-secret-password' }
		expect(res).toEqual(testUserWithId)
	})

	test('index method should return a list of all users', async () => {
		let res = await testStore.index()
		res[0] = { ...res[0], password_digest: 'my-secret-password' }
		expect(res).toEqual([testUserWithId])
	})

	test('show method should return the correct user', async () => {
		let res = await testStore.show('1')
		res = { ...res, password_digest: 'my-secret-password' }
		expect(res).toEqual(testUserWithId)
	})

	// test authenticate method
})
