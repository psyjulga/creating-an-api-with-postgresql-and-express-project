import { Application, Request, Response } from 'express'
import { OrdersProducts, OrderStore } from '../models/order'
import verifyAuthToken from '../util/authorization'

const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
	try {
		const orders = await store.index()
		res.status(200)
		res.json(orders)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const show = async (req: Request, res: Response) => {
	try {
		const order = await store.show(req.params.id)
		res.status(200)
		res.json(order)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const showOrderByUser = async (req: Request, res: Response) => {
	try {
		const orderByUser = await store.showOrderByUser(req.params.id)
		res.status(200)
		res.json(orderByUser)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const create = async (req: Request, res: Response) => {
	const order = {
		status: req.body.status,
		user_id: req.body.user_id,
	}
	try {
		const newOrder = await store.create(order)
		res.status(200)
		res.json(newOrder)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const addProductToOrder = async (req: Request, res: Response) => {
	const quantity: number = parseInt(req.body.quantity)
	const order_id: number = parseInt(req.params.id)
	const product_id: number = parseInt(req.body.product_id)

	const productToAdd: OrdersProducts = {
		quantity,
		order_id,
		product_id,
	}

	try {
		const addedProduct = await store.addProductToOrder(productToAdd)
		res.status(200)
		res.json(addedProduct)
	} catch (e) {
		res.status(400)
		res.json(e)
	}
}

const order_routes = (app: Application) => {
	app.get('/orders', verifyAuthToken, index)
	app.get('orders/:id', verifyAuthToken, show)
	app.get('orders/:id/users', verifyAuthToken, showOrderByUser)
	app.post('/orders', verifyAuthToken, create)
	app.post('/order/:id/products', verifyAuthToken, addProductToOrder)
}

export default order_routes
