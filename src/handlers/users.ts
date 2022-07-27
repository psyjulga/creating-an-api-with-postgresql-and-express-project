import { Application, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserStore, User } from '../models/user'
import verifyAuthToken from '../util/authorization'

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
	try {
		const users = await store.index()
		res.status(200)
		res.json(users)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const show = async (req: Request, res: Response) => {
	try {
		const user = await store.show(req.params.id)
		res.status(200)
		res.json(user)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

// SIGN UP => token created
const create = async (req: Request, res: Response) => {
	const user: User = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		password_digest: req.body.password_digest,
	}

	try {
		const newUser = await store.create(user) // with hashed password
		const token = jwt.sign(
			{ user: newUser },
			process.env.TOKEN_SECRET as string
		)
		res.status(200)
		res.json(token)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

// SIGN IN => token created
const authenticate = async (req: Request, res: Response) => {
	try {
		const authenticatedUser = await store.authenticate(
			req.params.id, // user id
			req.body.password_digest // entered password => checks if correct
		)
		const token = jwt.sign(
			{ user: authenticatedUser },
			process.env.TOKEN_SECRET as string
		)
		res.status(200)
		res.json(token)
	} catch (e) {
		res.status(401) // 401 => not authenticated
		res.json(e)
	}
}

const user_routes = (app: Application) => {
	app.get('/users', verifyAuthToken, index)
	app.get('/users/:id', verifyAuthToken, show)
	app.post('/users', verifyAuthToken, create)
	app.get('/users/:id/authenticate', authenticate)
}

export default user_routes
