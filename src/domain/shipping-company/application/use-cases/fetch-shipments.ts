import { Either, right } from '@/core/errors/either'
import { ShipmentRepository } from '../repositories/shipment-repository'
import { Shipment } from '../../enterprise/entities/shipment'

type FetchShipmentsUseCaseResponse = Either<
  null,
  {
    shipments: Shipment[]
  }
>

export class FetchShipmentsUseCase {
  constructor(private shipmentRepository: ShipmentRepository) {}

  public async execute(): Promise<FetchShipmentsUseCaseResponse> {
    const shipments = await this.shipmentRepository.fetchAll()

    return right({
      shipments,
    })
  }
}
