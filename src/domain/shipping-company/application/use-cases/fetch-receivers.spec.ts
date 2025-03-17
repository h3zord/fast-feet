import { InMemoryReceiverRepository } from 'test/repositories/in-memory-receiver-repository'
import { makeReceiver } from 'test/factories/make-receiver'
import { FetchReceiversUseCase } from './fetch-receivers'

let fetchReceiversUseCase: FetchReceiversUseCase

let receiverRepository: InMemoryReceiverRepository

describe('Fetch receivers use case', () => {
  receiverRepository = new InMemoryReceiverRepository()

  fetchReceiversUseCase = new FetchReceiversUseCase(receiverRepository)

  beforeAll(async () => {
    const receiver1 = makeReceiver()
    const receiver2 = makeReceiver()

    receiverRepository.create(receiver1)
    receiverRepository.create(receiver2)
  })

  it('should be able to fetch all receivers correctly', async () => {
    const result = await fetchReceiversUseCase.execute()

    expect(result.isRight()).toBe(true)
    expect(result.value?.receivers).toHaveLength(2)
  })
})
