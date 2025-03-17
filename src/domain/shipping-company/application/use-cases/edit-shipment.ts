import { Either, left, right } from '@/core/errors/either'
import { Shipment } from '../../enterprise/entities/shipment'
import { ShipmentNotFoundError } from './errors/shipment-not-found-error'
import { ShipmentRepository } from '../repositories/shipment-repository'

interface EditShipmentUseCaseRequest {
  id: string
}

type EditShipmentUseCaseResponse = Either<
  ShipmentNotFoundError,
  {
    shipment: Shipment
  }
>

export class EditShipmentUseCase {
  constructor(private shipmentRepository: ShipmentRepository) {}

  public async execute({
    id,
  }: EditShipmentUseCaseRequest): Promise<EditShipmentUseCaseResponse> {
    const shipment = await this.shipmentRepository.findById(id)

    if (!shipment) {
      return left(new ShipmentNotFoundError())
    }

    await this.shipmentRepository.save(shipment)

    return right({
      shipment,
    })
  }
}
