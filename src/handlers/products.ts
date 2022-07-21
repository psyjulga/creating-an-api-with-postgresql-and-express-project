import { Application, Request, Response } from 'express'
import { ProductStore } from '../models/product'
import verifyAuthToken from '../util/authorization'

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
	try {
		const products = await store.index()
		res.status(200)
		res.json(products)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const show = async (req: Request, res: Response) => {
	try {
		const product = await store.show(req.params.id)
		res.status(200)
		res.json(product)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const create = async (req: Request, res: Response) => {
	const product = {
		name: req.body.name,
		price: req.body.price,
	}
	try {
		const newProduct = await store.create(product)
		res.status(200)
		res.json(newProduct)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const product_routes = (app: Application) => {
	app.get('/products', index)
	app.get('products/:id', show)
	app.post('/products', verifyAuthToken, create)
}

export default product_routes
