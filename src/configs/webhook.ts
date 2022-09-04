import starkbank from 'starkbank'

export default async function createWebhook(): Promise<string> {
	let webhook = await starkbank.webhook.create({
		url: 'http://localhost:5000/transfer',
		subscriptions: ['invoice']
	})

    return webhook
}
