import { User, UserStore } from '../models/user'

const store = new UserStore()

const testUserToAdd: User = {
	// will be populated in the tests
	first_name: 'John',
	last_name: 'Doe',
	password_digest: 'secret-password', // will be hashed
}
const populatedTestUser = {
	// is inserted into the database via the test command
	user_id: 1,
	first_name: 'first name',
	last_name: 'last name',
	password_digest: 'a password', // is inserted directly (no hashing)
}

describe('User Model', () => {
	test('should have an index method', () => {
		expect(store.index).toBeDefined()
	})

	test('should have a show method', () => {
		expect(store.show).toBeDefined()
	})

	test('should have a create method', () => {
		expect(store.create).toBeDefined()
	})

	test('should have an authenticate method', () => {
		expect(store.authenticate).toBeDefined()
	})

	test('create method should add a user to the database', async () => {
		const res = await store.create(testUserToAdd)
		const { user_id, first_name, last_name, password_digest } = res

		expect(typeof user_id).toBe('number')
		expect(first_name).toBe('John')
		expect(last_name).toBe('Doe')
		expect(password_digest).not.toBe('secret-password')
	})

	test('index method should return a list of all users', async () => {
		const res = await store.index()

		expect(res.length).toBeGreaterThanOrEqual(1)
		expect(res[0]).toEqual(populatedTestUser)
	})

	test('show method should return the correct user', async () => {
		const res = await store.show('1')
		expect(res).toEqual(populatedTestUser)
	})

	test('authenticate method should check the password at login and return it', async () => {
		const res = await store.authenticate('2', 'secret-password')
		const password = res?.password_digest

		expect(typeof password).toBe('string')
		expect(password).not.toEqual('secret-password')

		await store.closeClient()
	})
})
