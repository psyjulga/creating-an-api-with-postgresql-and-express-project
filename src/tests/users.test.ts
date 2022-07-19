import { User, UserStore } from '../models/user'

const testStore = new UserStore()

const testUserToAdd: User = {
	first_name: 'John',
	last_name: 'Doe',
	password_digest: 'my_secret_password',
}
// user_id is automatically generated
const testUserWithId: User = {
	user_id: '1',
	first_name: 'John',
	last_name: 'Doe',
	password_digest: 'my_secret_password',
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
		const res = await testStore.create(testUserToAdd)
		expect(res).toEqual(testUserWithId)
	})

	test('index method should return a list of all users', async () => {
		const res = await testStore.index()
		expect(res).toEqual([testUserWithId])
	})

	test('show method should return the correct user', async () => {
		const res = await testStore.show('1')
		expect(res).toEqual(testUserWithId)
	})

	// test authenticate method
})
