import { Either, left, right } from '@/core/errors/either'
import { ShipmentNotFoundError } from './errors/shipment-not-found-error'
import { ShipmentRepository } from '../repositories/shipment-repository'

interface DeleteShipmentUseCaseRequest {
  id: string
}

type DeleteShipmentUseCaseResponse = Either<ShipmentNotFoundError, null>

export class DeleteShipmentUseCase {
  constructor(private shipmentRepository: ShipmentRepository) {}

  public async execute({
    id,
  }: DeleteShipmentUseCaseRequest): Promise<DeleteShipmentUseCaseResponse> {
    const shipment = await this.shipmentRepository.findById(id)

    if (!shipment) {
      return left(new ShipmentNotFoundError())
    }

    await this.shipmentRepository.delete(shipment)

    return right(null)
  }
}
