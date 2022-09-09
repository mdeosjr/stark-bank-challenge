import faker from 'faker-br'

export default function invoices() {
	const randomNumber = faker.random.number({ min: 8, max: 12 })
	const invoices = []

	for (let i = 0; i < randomNumber; i++) {
		invoices.push({
			amount: faker.random.number({ min: 1000, max: 100000 }),
			taxId: faker.br.cpf(),
			name: faker.name.findName()
		})
	}

	return invoices
}
