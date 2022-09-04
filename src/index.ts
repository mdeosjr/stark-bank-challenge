import express, { json, Express } from 'express'
import cors from 'cors'
import createWebhook from './configs/webhook.js'

const app = express()

app.use(cors())
app.use(json())

export function init(): Promise<Express> {
	createWebhook()
	return Promise.resolve(app)
}

export default app
