import { Application, Request, Response } from 'express'
import { ProductStore } from '../models/product'

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
	const products = await store.index()
	res.json(products)
}

const show = async (req: Request, res: Response) => {
	const product = await store.show(req.params.id)
	res.json(product)
}

const create = async (req: Request, res: Response) => {
	const product = {
		name: req.body.name,
		price: req.body.price,
	}
	try {
		const newProduct = await store.create(product)
		res.json(newProduct)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const product_routes = (app: Application) => {
	app.get('/products', index)
	app.get('products/:id', show)
	app.post('/products', create)
}

export default product_routes
