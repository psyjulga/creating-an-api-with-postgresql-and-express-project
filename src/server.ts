import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app: Application = express()
const address: string = '0.0.0.0:3000'
const port = process.env.SERVER_PORT

app.use(cors())
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
	res.send('server running!')
})

app.listen(port, function () {
	console.log(`starting app on: ${address}`)
})
