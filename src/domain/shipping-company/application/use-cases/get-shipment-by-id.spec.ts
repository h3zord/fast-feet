import { ShipmentNotFoundError } from './errors/shipment-not-found-error'
import { InMemoryShipmentRepository } from 'test/repositories/in-memory-shipment-repository'
import { makeShipment } from 'test/factories/make-shipment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { GetShipmentByIdUseCase } from './get-shipment-by-id'

let getShipmentByIdUseCase: GetShipmentByIdUseCase

let shipmentRepository: InMemoryShipmentRepository

describe('Get Shipment by id use case', () => {
  shipmentRepository = new InMemoryShipmentRepository()

  getShipmentByIdUseCase = new GetShipmentByIdUseCase(shipmentRepository)

  beforeAll(async () => {
    const shipment = makeShipment({}, new UniqueEntityId('1'))

    shipmentRepository.create(shipment)
  })

  it('should be able to get a shipment by id correctly', async () => {
    const result = await getShipmentByIdUseCase.execute({
      id: '1',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      shipment: expect.objectContaining({
        id: new UniqueEntityId('1'),
      }),
    })
  })

  it('should not be able to get a shipment by id when it does not exist', async () => {
    const result = await getShipmentByIdUseCase.execute({
      id: 'invalid-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ShipmentNotFoundError)
  })
})
