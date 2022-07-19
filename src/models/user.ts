import bcrypt from 'bcrypt'
import pepper from 'bcrypt'
import client from '../database'

export type User = {
	user_id?: string
	first_name: string
	last_name: string
	password_digest: string
}

export class UserStore {
	async index(): Promise<User[]> {
		// add TOKEN !!
		try {
			const conn = await client.connect()
			const sql = 'SELECT * FROM users'
			const res = await conn.query(sql)
			conn.release()
			return res.rows
		} catch (e) {
			throw new Error(`Error in UserStore index(): ${e}`)
		}
	}

	async show(user_id: string): Promise<User> {
		// add TOKEN !!
		try {
			const conn = await client.connect()
			const sql = 'SELECT * FROM products WHERE id=($1)'
			const res = await conn.query(sql, [user_id])
			conn.release()
			return res.rows[0]
		} catch (e) {
			throw new Error(`Error in UserStore show(${user_id}): ${e}`)
		}
	}

	async create(user: User): Promise<User> {
		// sign up => token
		// add TOKEN !!
		const { first_name, last_name, password_digest } = user
		try {
			const conn = await client.connect()
			const sql =
				'INSERT INTO users (user_id, first_name, last_name, password_digest) VALUES(default, $1, $2, $3) RETURNING *'

			const saltRounds = process.env.SALT_ROUNDS
			const hash = bcrypt.hashSync(
				password_digest + pepper,
				parseInt(saltRounds as string)
			)

			const res = await conn.query(sql, [first_name, last_name, hash])
			const user = res.rows[0]

			conn.release()

			return user
		} catch (e) {
			throw new Error(`Error in UserStore create(...): ${e}`)
		}
	}

	// where / how to use that !!
	async authenticate(
		user_id: string,
		password_digest: string
	): Promise<User | null> {
		const conn = await client.connect()
		const sql = 'SELECT password_digest FROM users WHERE user_id=($1)'

		const result = await conn.query(sql, [user_id])
		console.log(password_digest + pepper)

		if (result.rows.length) {
			const user = result.rows[0]
			console.log(user)

			if (bcrypt.compareSync(password_digest + pepper, user.password_digest)) {
				return user
			}
		}
		return null
	}
}
