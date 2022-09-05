import { Router } from 'express'
import { createTransfer } from '../controllers/transferController.js'

const transferRouter = Router()

transferRouter.post('/transfer', createTransfer)

export default transferRouter
