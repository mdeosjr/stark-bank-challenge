import starkbank from 'starkbank'
import '../dotenv.js'

let user = new starkbank.Project({
	environment: 'sandbox',
	id: '4784188939042816',
	privateKey: process.env.PRIVATE_KEY
})

starkbank.user = user