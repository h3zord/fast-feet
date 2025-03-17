import { generate as generateCpf } from 'gerador-validador-cpf'
import { InMemoryReceiverRepository } from 'test/repositories/in-memory-receiver-repository'
import { CreateReceiverUseCase } from './create-receiver'

let createReceiverUseCase: CreateReceiverUseCase

let receiverRepository: InMemoryReceiverRepository

describe('Create Receiver use case', () => {
  receiverRepository = new InMemoryReceiverRepository()

  createReceiverUseCase = new CreateReceiverUseCase(receiverRepository)

  const cpf = generateCpf()

  it('should be able to create a receiver correctly', async () => {
    const result = await createReceiverUseCase.execute({
      cpf,
      address: 'example-address',
    })

    expect(result.isRight()).toBe(true)
    expect(receiverRepository.items).toHaveLength(1)
  })
})
