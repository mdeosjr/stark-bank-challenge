import starkbank from 'starkbank'
import nodeSchedule from 'node-schedule'
import { user } from '../configs/authentication.js'
import invoices from './invoicesFactory.js'

async function generateInvoices() {
	starkbank.user = user

	const startTime = new Date(Date.now())
	const endTime = new Date(startTime.getTime() + 86400000)
	const invoicesArray = invoices()

	nodeSchedule.scheduleJob(
		{ start: startTime, end: endTime, rule: '0 * */3 * * *' },
		async function () {
			await starkbank.invoice.create(invoicesArray)
		}
	)

	return invoicesArray
}

export { generateInvoices }
