import starkbank from 'starkbank'
import nodeSchedule from 'node-schedule'
import { user } from '../configs/authentication.js'
import invoices from './invoicesFactory.js'

starkbank.user = user

async function generateInvoices() {
	sendInvoices()

	const startTime = new Date(Date.now())
	const endTime = new Date(startTime.getTime() + 86400000)

	nodeSchedule.scheduleJob(
		{ start: startTime, end: endTime, rule: '0 */3 * * *' },
		function () {
			sendInvoices()
		}
	)
}

async function sendInvoices() {
	const invoicesArray = invoices()
	await starkbank.invoice.create(invoicesArray)
}

export { generateInvoices }
