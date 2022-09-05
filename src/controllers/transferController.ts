import { Request, Response } from 'express'
import { transferCreation } from '../services/transferService.js'

export async function createTransfer(req: Request, res: Response) {
	const { event } = req.body

    await transferCreation(event)

    res.sendStatus(201)
}
