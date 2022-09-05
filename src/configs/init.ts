import starkbank from 'starkbank'
import { user } from './authentication.js'
import invoices from '../utils/invoicesFactory.js'

export default async function generateInvoices() {
	starkbank.user = user

	const invoicesArray = invoices()	

	//await starkbank.invoice.create([invoicesArray[0]])
}
