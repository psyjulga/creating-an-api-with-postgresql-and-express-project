import { User, UserStore } from '../models/user'
import clearDatabase from '../util/clearDatabase'

const testStore = new UserStore()

const testUserToAdd: User = {
	first_name: 'User Model Add',
	last_name: 'Doe',
	password_digest: 'my-secret-password',
}
// user_id is automatically generated
const testUserWithId: User = {
	user_id: 1,
	first_name: 'User Model Add',
	last_name: 'Doe',
	password_digest: 'my-secret-password',
}

describe('User Model', () => {
	afterAll(async () => {
		await clearDatabase('DELETE FROM users WHERE user_id IS NOT NULL')
	})

	test('should have an index method', () => {
		expect(testStore.index).toBeDefined()
	})

	test('should have a show method', () => {
		expect(testStore.show).toBeDefined()
	})

	test('should have a create method', () => {
		expect(testStore.create).toBeDefined()
	})

	test('should have an authenticate method', () => {
		expect(testStore.authenticate).toBeDefined()
	})

	test('create method should add a user to the database', async () => {
		const res = await testStore.create(testUserToAdd)
		const user = { ...res, password_digest: 'my-secret-password' }
		expect(user).toEqual(testUserWithId)
	})

	test('index method should return a list of all users', async () => {
		let res = await testStore.index()
		res[0] = { ...res[0], password_digest: 'my-secret-password' }
		expect(res).toEqual([testUserWithId])
	})

	test('show method should return the correct user', async () => {
		const res = await testStore.show('1')
		const user = { ...res, password_digest: 'my-secret-password' }
		expect(user).toEqual(testUserWithId)
	})

	test('authenticate method should check the password at login and return it', async () => {
		const res = await testStore.authenticate('1', 'my-secret-password')
		const password = res?.password_digest

		expect(typeof password).toBe('string')
		expect(password).toContain('.')
	})
})
