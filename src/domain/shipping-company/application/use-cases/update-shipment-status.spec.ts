import { ShipmentNotFoundError } from './errors/shipment-not-found-error'
import { InMemoryShipmentRepository } from 'test/repositories/in-memory-shipment-repository'
import { makeShipment } from 'test/factories/make-shipment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { UpdateShipmentStatusUseCase } from './update-shipment-status'

let updateShipmentStatusUseCase: UpdateShipmentStatusUseCase

let shipmentRepository: InMemoryShipmentRepository

describe('Update shipment status use case', () => {
  shipmentRepository = new InMemoryShipmentRepository()

  updateShipmentStatusUseCase = new UpdateShipmentStatusUseCase(
    shipmentRepository,
  )

  beforeAll(async () => {
    const shipment = makeShipment(
      {
        status: 'AWAITING_PICKUP',
      },
      new UniqueEntityId('1'),
    )

    shipmentRepository.create(shipment)
  })

  it('should be able to update a shipment status by id correctly', async () => {
    const result = await updateShipmentStatusUseCase.execute({
      id: '1',
      status: 'PICKED_UP',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      shipment: expect.objectContaining({
        status: 'PICKED_UP',
      }),
    })
  })

  it('should not be able to update a shipment status by id when it does not exist', async () => {
    const result = await updateShipmentStatusUseCase.execute({
      id: '2',
      status: 'PICKED_UP',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ShipmentNotFoundError)
  })
})
