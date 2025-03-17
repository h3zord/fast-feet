import { generate as generateCpf } from 'gerador-validador-cpf'
import { Cpf } from '../../enterprise/entities/value-objects/cpf'
import { ReceiverNotFoundError } from './errors/receiver-not-found-error'
import { InMemoryReceiverRepository } from 'test/repositories/in-memory-receiver-repository'
import { makeReceiver } from 'test/factories/make-receiver'
import { DeleteReceiverUseCase } from './delete-receiver'

let deleteReceiverUseCase: DeleteReceiverUseCase

let receiverRepository: InMemoryReceiverRepository

describe('Delete receiver use case', () => {
  receiverRepository = new InMemoryReceiverRepository()

  deleteReceiverUseCase = new DeleteReceiverUseCase(receiverRepository)

  const cpf = generateCpf()

  beforeAll(async () => {
    const receiver = makeReceiver({
      cpf: Cpf.create({ value: cpf }),
    })

    receiverRepository.create(receiver)
  })

  it('should be able to delete a receiver by cpf correctly', async () => {
    const result = await deleteReceiverUseCase.execute({
      cpf,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeNull()
    expect(receiverRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a receiver by cpf when it does not exist', async () => {
    const result = await deleteReceiverUseCase.execute({
      cpf: 'invalid-cpf',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ReceiverNotFoundError)
  })
})
