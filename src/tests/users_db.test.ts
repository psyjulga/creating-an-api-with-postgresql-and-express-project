import { User, UserStore } from '../models/user'
import clearDatabase from '../util/clearDatabase'
import populateDatabase from '../util/populateDatabase'

const store = new UserStore()

const testUserToAdd: User = {
	// will be populated in the tests
	first_name: 'User Model Add',
	last_name: 'Doe',
	password_digest: 'my-secret-password',
}
const populatedTestUser = {
	// is populated by populateDatabase
	user_id: 1,
	first_name: 'first name',
	last_name: 'last name',
	password_digest: 'a password',
}

const testUserWithId: User = {
	// will be used for comparison
	user_id: 2, // user_id is automatically generated
	first_name: 'User Model Add',
	last_name: 'Doe',
	password_digest: 'my-secret-password',
}

describe('User Model', () => {
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

	test('should have an authenticate method', () => {
		expect(store.authenticate).toBeDefined()
	})

	test('create method should add a user to the database', async () => {
		const res = await store.create(testUserToAdd)
		const user = { ...res, password_digest: 'my-secret-password' }
		expect(user).toEqual(testUserWithId)
	})

	test('index method should return a list of all users', async () => {
		let res = await store.index()
		res[0] = { ...res[0], password_digest: 'a password' }
		res[1] = { ...res[1], password_digest: 'my-secret-password' }
		expect(res).toEqual([populatedTestUser, testUserWithId])
	})

	test('show method should return the correct user', async () => {
		const res = await store.show('1')
		const user = { ...res, password_digest: 'a password' }
		expect(user).toEqual(populatedTestUser)
	})

	test('authenticate method should check the password at login and return it', async () => {
		const res = await store.authenticate('2', 'my-secret-password')
		const password = res?.password_digest

		expect(typeof password).toBe('string')
	})
})
