import starkbank from 'starkbank'
import { user } from '../configs/authentication.js'

export async function transferCreation(event) {
	starkbank.user = user

	if (!event)
		throw { type: 'unprocessable_entity', message: 'No invoice event' }

	if (event.subscription !== 'invoice' || event.log.type !== 'credited')
		throw { type: 'bad_request', message: 'Invoice not credited' }

	if (event.subscription === 'invoice' && event.log.type === 'credited') {
		await starkbank.transfer.create([
			{
				amount: event.log.invoice.amount - event.log.invoice.fee,
				bankCode: '20018183',
				branchCode: '0001',
				accountNumber: '6341320293482496',
				taxId: '20.018.183/0001-80',
				name: 'Stark Bank S.A.',
				accountType: 'payment'
			}
		])
	}
}
