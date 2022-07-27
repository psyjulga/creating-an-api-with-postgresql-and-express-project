import bcrypt from 'bcrypt'
import pepper from 'bcrypt'
import client from '../database'

export type User = {
	user_id?: number
	first_name: string
	last_name: string
	password_digest: string
}

export class UserStore {
	async index(): Promise<User[]> {
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
		try {
			const conn = await client.connect()
			const sql = 'SELECT * FROM users WHERE user_id=($1)'
			const res = await conn.query(sql, [user_id])
			conn.release()
			return res.rows[0]
		} catch (e) {
			throw new Error(`Error in UserStore show(${user_id}): ${e}`)
		}
	}

	// SIGN UP => password hashing
	async create(user: User): Promise<User> {
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

	// SIGN IN => check password
	async authenticate(
		user_id: string,
		password_digest: string
	): Promise<User | null> {
		try {
			const conn = await client.connect()
			const sql = 'SELECT password_digest FROM users WHERE user_id=($1)'

			const res = await conn.query(sql, [user_id])

			if (res.rows.length) {
				const passwordFromUser = res.rows[0]
				if (
					bcrypt.compareSync(
						password_digest + pepper,
						passwordFromUser.password_digest
					)
				) {
					return passwordFromUser
				}
			}
			return null
		} catch (e) {
			throw new Error(
				`Error in UserStore authenticate(${user_id},${password_digest}): ${e}`
			)
		}
	}
}
