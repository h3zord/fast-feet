import { InMemoryShipmentRepository } from 'test/repositories/in-memory-shipment-repository'
import { makeShipment } from 'test/factories/make-shipment'
import { FetchShipmentsUseCase } from './fetch-shipments'

let fetchShipmentsUseCase: FetchShipmentsUseCase

let shipmentRepository: InMemoryShipmentRepository

describe('Fetch shipments use case', () => {
  shipmentRepository = new InMemoryShipmentRepository()

  fetchShipmentsUseCase = new FetchShipmentsUseCase(shipmentRepository)

  beforeAll(async () => {
    const shipment1 = makeShipment()
    const shipment2 = makeShipment()

    shipmentRepository.create(shipment1)
    shipmentRepository.create(shipment2)
  })

  it('should be able to fetch all shipments correctly', async () => {
    const result = await fetchShipmentsUseCase.execute()

    expect(result.isRight()).toBe(true)
    expect(result.value?.shipments).toHaveLength(2)
  })
})
