import { ShipmentNotFoundError } from './errors/shipment-not-found-error'
import { InMemoryShipmentRepository } from 'test/repositories/in-memory-shipment-repository'
import { makeShipment } from 'test/factories/make-shipment'
import { EditShipmentUseCase } from './edit-shipment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let editShipmentUseCase: EditShipmentUseCase

let shipmentRepository: InMemoryShipmentRepository

describe('Edit shipment use case', () => {
  shipmentRepository = new InMemoryShipmentRepository()

  editShipmentUseCase = new EditShipmentUseCase(shipmentRepository)

  beforeAll(async () => {
    const shipment = makeShipment({}, new UniqueEntityId('1'))

    shipmentRepository.create(shipment)
  })

  it('should be able to edit a shipment by id correctly', async () => {
    const result = await editShipmentUseCase.execute({
      id: '1',
    })

    expect(result.isRight()).toBe(true)
  })

  it('should not be able to edit a shipment by id when it does not exist', async () => {
    const result = await editShipmentUseCase.execute({
      id: '2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ShipmentNotFoundError)
  })
})
