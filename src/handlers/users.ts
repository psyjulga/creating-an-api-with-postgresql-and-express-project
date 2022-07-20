import { UserStore, User } from '../models/user'
import { Application, NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
	const users = await store.index()
	res.json(users)
}

const show = async (req: Request, res: Response) => {
	const user = await store.show(req.params.id)
	res.json(user)
}

const create = async (req: Request, res: Response) => {
	// when a new user is created ('sign up') => new password => TOKEN (jwt.sign())

	const user: User = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		password_digest: req.body.password_digest,
	}

	try {
		const newUser = await store.create(user)
		const token = jwt.sign(
			{ user: newUser },
			process.env.TOKEN_SECRET as string
		)
		res.json(token)
	} catch (e) {
		res.status(400)
		res.json((e as any) + user)
	}
}

// checks at sign in if password is correct
const authenticate = async (req: Request, res: Response) => {
	try {
		const authenticatedUser = await store.authenticate(
			req.params.id, // user id
			req.body.password_digest // entered password
		)
		const token = jwt.sign(
			{ user: authenticatedUser },
			process.env.TOKEN_SECRET as string
		)
		res.json(token)
	} catch (e) {
		res.status(401)
		res.json({ e })
	}
}

// EXPRESS MIDDLEWARE FUNCTION
const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
	try {
		const authorizationHeader = req.headers.authorization
		const token = authorizationHeader?.split(' ')[1]
		const tokenSecret = process.env.TOKEN_SECRET
		const decoded = jwt.verify(token as string, tokenSecret as string)

		next()
	} catch (error) {
		res.status(401)
	}
}

const user_routes = (app: Application) => {
	app.get('/users', index)
	app.get('/users/:id', show)
	app.post('/users', verifyAuthToken, create)
	app.get('users/:id/authenticate', authenticate)
}

// => verifyAuthToken will be called
//    before the handler's create method

export default user_routes
