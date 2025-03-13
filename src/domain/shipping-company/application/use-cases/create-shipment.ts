import { Either, right } from '@/core/errors/either'
import { Shipment } from '../../enterprise/entities/shipment'
import { ShipmentRepository } from '../repositories/shipment-repository'

// interface CreateShipmentUseCaseRequest {}

type CreateShipmentUseCaseResponse = Either<
  null,
  {
    shipment: Shipment
  }
>

export class CreateShipmentUseCase {
  constructor(private shipmentRepository: ShipmentRepository) {}

  public async execute(): Promise<CreateShipmentUseCaseResponse> {
    const shipment = Shipment.create()

    await this.shipmentRepository.create(shipment)

    return right({
      shipment,
    })
  }
}
