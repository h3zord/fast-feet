import { ShipmentNotFoundError } from './errors/shipment-not-found-error'
import { InMemoryShipmentRepository } from 'test/repositories/in-memory-shipment-repository'
import { makeShipment } from 'test/factories/make-shipment'
import { DeleteShipmentUseCase } from './delete-shipment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let deleteShipmentUseCase: DeleteShipmentUseCase

let shipmentRepository: InMemoryShipmentRepository

describe('Delete shipment use case', () => {
  shipmentRepository = new InMemoryShipmentRepository()

  deleteShipmentUseCase = new DeleteShipmentUseCase(shipmentRepository)

  beforeAll(async () => {
    const shipment = makeShipment({}, new UniqueEntityId('1'))

    shipmentRepository.create(shipment)
  })

  it('should be able to delete a shipment by cpf correctly', async () => {
    const result = await deleteShipmentUseCase.execute({
      id: '1',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeNull()
    expect(shipmentRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a shipment by id when it does not exist', async () => {
    const result = await deleteShipmentUseCase.execute({
      id: '2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ShipmentNotFoundError)
  })
})
