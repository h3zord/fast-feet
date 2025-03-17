import { InMemoryShipmentRepository } from 'test/repositories/in-memory-shipment-repository'
import { makeShipment } from 'test/factories/make-shipment'
import { FetchReceiversUseCase } from './fetch-receivers'

let fetchReceiversUseCase: FetchReceiversUseCase

let shipmentRepository: InMemoryShipmentRepository

describe('Fetch receivers use case', () => {
  shipmentRepository = new InMemoryShipmentRepository()

  fetchReceiversUseCase = new FetchReceiversUseCase(shipmentRepository)

  beforeAll(async () => {
    const shipment1 = makeShipment()
    const shipment2 = makeShipment()

    shipmentRepository.create(shipment1)
    shipmentRepository.create(shipment2)
  })

  it('should be able to fetch all receivers correctly', async () => {
    const result = await fetchReceiversUseCase.execute()

    expect(result.isRight()).toBe(true)
    expect(result.value?.receivers).toHaveLength(2)
  })
})
