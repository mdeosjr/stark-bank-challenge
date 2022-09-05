import express, { json, Express } from 'express'
import './dotenv.js'
import cors from 'cors'
import generateInvoices from './configs/init.js'
import transferRouter from './routers/transferRouter.js'

const app = express()

app.use(cors())
app.use(json())
app.use(transferRouter)

export function init(): Promise<Express> {
	generateInvoices()
	return Promise.resolve(app)
}

export default app
