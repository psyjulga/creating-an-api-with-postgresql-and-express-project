import { UserStore, User } from '../models/user'
import { Application, NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

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

const create = async (req: Request, res: Response) => {
	// a new user is created ('sign up') => new password => TOKEN (jwt.sign())

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
		res.status(200)
		res.json(token)
	} catch (e) {
		res.status(400)
		res.json(e)
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
		res.status(200)
		res.json(token)
	} catch (e) {
		res.status(401) // 401 => not authenticated
		res.json(e)
	}
}

// EXPRESS MIDDLEWARE FUNCTION => where to put it ??!!
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
