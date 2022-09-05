import starkbank from 'starkbank'

export const user = new starkbank.Project({
	environment: 'sandbox',
	id: process.env.PROJECT_ID,
	privateKey: process.env.PRIVATE_KEY
})
