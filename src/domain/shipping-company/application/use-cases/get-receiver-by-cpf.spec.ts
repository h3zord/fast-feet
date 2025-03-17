import { generate as generateCpf } from 'gerador-validador-cpf'
import { Cpf } from '../../enterprise/entities/value-objects/cpf'
import { GetReceiverByCpfUseCase } from './get-receiver-by-cpf'
import { ReceiverNotFoundError } from './errors/receiver-not-found-error'
import { InMemoryReceiverRepository } from 'test/repositories/in-memory-receiver-repository'
import { makeReceiver } from 'test/factories/make-receiver'

let getReceiverByCpfUseCase: GetReceiverByCpfUseCase

let receiverRepository: InMemoryReceiverRepository

describe('Get receiver by cpf use case', () => {
  receiverRepository = new InMemoryReceiverRepository()

  getReceiverByCpfUseCase = new GetReceiverByCpfUseCase(receiverRepository)

  const cpf = generateCpf()

  beforeAll(async () => {
    const receiver = makeReceiver({
      cpf: Cpf.create({ value: cpf }),
    })

    receiverRepository.create(receiver)
  })

  it('should be able to get a receiver by cpf correctly', async () => {
    const result = await getReceiverByCpfUseCase.execute({
      cpf,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      receiver: expect.objectContaining({
        cpf: Cpf.create({ value: cpf }),
      }),
    })
  })

  it('should not be able to get a receiver by cpf when it does not exist', async () => {
    const result = await getReceiverByCpfUseCase.execute({
      cpf: 'invalid-cpf',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ReceiverNotFoundError)
  })
})
