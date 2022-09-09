import { jest } from '@jest/globals'
import supertest from 'supertest'
import starkbank from 'starkbank'
import app, { init } from '../src/index.js'
import * as invoicesMock from '../src/utils/generateInvoices.js'
import invoices from '../src/utils/invoicesFactory.js'

const agent = supertest(app)

describe('App unit tests', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		jest.resetAllMocks()
	})

	const invoicesArray = invoices()

	it('should create invoices when the app is started', () => {
		const invoices = jest
			.spyOn(invoicesMock, 'generateInvoices')
			.mockResolvedValue(invoicesArray)

		init()

		expect(invoicesArray.length).toBeGreaterThanOrEqual(8)
		expect(invoicesArray.length).toBeLessThanOrEqual(12)
		expect(invoices).toHaveBeenCalled()
	})

	it('should create a transfer when the event is correct and return 201', async () => {
		const event = {
			event: {
				subscription: 'invoice',
				log: {
					type: 'credited',
					invoice: {
						amount: 50000,
					}
				}
			}
		}

		const transfer = jest.spyOn(starkbank.transfer, 'create').mockResolvedValue({})

		const res = await agent.post('/transfer').send(event)

		expect(res.status).toEqual(201)
		expect(transfer).toBeCalled()
	})

	it('should not create a transfer when the event is incorrect and return 400', async () => {
		const event = {
			event: {
				subscription: 'boleto',
				log: {
					type: 'created',
					invoice: {
						amount: 50000
					}
				}
			}
		}

		const transfer = jest
			.spyOn(starkbank.transfer, 'create')
			.mockResolvedValue({})

		const res = await agent.post('/transfer').send(event)

		expect(res.status).toEqual(400)
		expect(transfer).not.toBeCalled()
	})

	it('should not create a transfer when there is no event and return 422', async () => {
		const event = {}

		const transfer = jest
			.spyOn(starkbank.transfer, 'create')
			.mockResolvedValue({})

		const res = await agent.post('/transfer').send(event)

		expect(res.status).toEqual(422)
		expect(transfer).not.toBeCalled()
	})
})
