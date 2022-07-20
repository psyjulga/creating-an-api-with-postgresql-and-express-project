import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'

import user_routes from './handlers/users'
import order_routes from './handlers/orders'
import product_routes from './handlers/products'

dotenv.config()

const app: Application = express()
const address: string = '0.0.0.0:3000'
const port = process.env.SERVER_PORT

app.use(cors())
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
	res.send('server running!')
})

user_routes(app)
order_routes(app)
product_routes(app)

app.listen(port, function () {
	console.log(`server running at: ${address}`)
})
