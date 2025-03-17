import { Either, left, right } from '@/core/errors/either'
import { Shipment } from '../../enterprise/entities/shipment'
import { ShipmentNotFoundError } from './errors/shipment-not-found-error'
import { ShipmentRepository } from '../repositories/shipment-repository'

interface UpdateShipmentStatusUseCaseRequest {
  id: string
  status: 'AWAITING_PICKUP' | 'PICKED_UP' | 'DELIVERED' | 'RETURNED'
}

type UpdateShipmentStatusUseCaseResponse = Either<
  ShipmentNotFoundError,
  {
    shipment: Shipment
  }
>

export class UpdateShipmentStatusUseCase {
  constructor(private shipmentRepository: ShipmentRepository) {}

  public async execute({
    id,
    status,
  }: UpdateShipmentStatusUseCaseRequest): Promise<UpdateShipmentStatusUseCaseResponse> {
    const shipment = await this.shipmentRepository.findById(id)

    if (!shipment) {
      return left(new ShipmentNotFoundError())
    }

    shipment.status = status

    await this.shipmentRepository.save(shipment)

    return right({
      shipment,
    })
  }
}
