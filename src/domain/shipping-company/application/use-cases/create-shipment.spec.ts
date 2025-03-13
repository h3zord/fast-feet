import { CreateShipmentUseCase } from './create-shipment'
import { InMemoryShipmentRepository } from 'test/repositories/in-memory-shipment-repository'

let createShipmentUseCase: CreateShipmentUseCase

let shipmentRepository: InMemoryShipmentRepository

describe('Create Shipment use case', () => {
  shipmentRepository = new InMemoryShipmentRepository()

  createShipmentUseCase = new CreateShipmentUseCase(shipmentRepository)

  it('should be able to create a shipment correctly', async () => {
    const result = await createShipmentUseCase.execute()

    expect(result.isRight()).toBe(true)
    expect(shipmentRepository.items).toHaveLength(1)
  })
})
