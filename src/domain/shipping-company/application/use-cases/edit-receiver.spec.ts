import { generate as generateCpf } from 'gerador-validador-cpf'
import { Cpf } from '../../enterprise/entities/value-objects/cpf'
import { ReceiverNotFoundError } from './errors/receiver-not-found-error'
import { InMemoryReceiverRepository } from 'test/repositories/in-memory-receiver-repository'
import { makeReceiver } from 'test/factories/make-receiver'
import { EditReceiverUseCase } from './edit-receiver'

let editReceiverUseCase: EditReceiverUseCase

let receiverRepository: InMemoryReceiverRepository

describe('Edit receiver use case', () => {
  receiverRepository = new InMemoryReceiverRepository()

  editReceiverUseCase = new EditReceiverUseCase(receiverRepository)

  const cpf = generateCpf()

  beforeAll(async () => {
    const receiver = makeReceiver({
      cpf: Cpf.create({ value: cpf }),
    })

    receiverRepository.create(receiver)
  })

  it('should be able to edit a receiver by cpf correctly', async () => {
    const result = await editReceiverUseCase.execute({
      cpf,
      address: 'new-address',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      receiver: expect.objectContaining({
        address: 'new-address',
      }),
    })
  })

  it('should not be able to edit a receiver by cpf when it does not exist', async () => {
    const result = await editReceiverUseCase.execute({
      cpf: 'invalid-cpf',
      address: 'new-address',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ReceiverNotFoundError)
  })
})
