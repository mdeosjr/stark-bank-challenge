import express, { json, Express } from 'express'
import './dotenv.js'
import 'express-async-errors'
import cors from 'cors'
import { generateInvoices } from './utils/generateInvoices.js'
import transferRouter from './routers/transferRouter.js'
import errorHandler from './middlewares/errorHandlingMiddleware.js'

const app = express()

app.use(cors())
app.use(json())
app.use(transferRouter)
app.use(errorHandler)

export function init(): Promise<Express> {
	generateInvoices()
	return Promise.resolve(app)
}

export default app
