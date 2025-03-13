import { Either, left, right } from '@/core/errors/either'
import { Shipment } from '../../enterprise/entities/shipment'
import { ShipmentNotFoundError } from './errors/shipment-not-found-error'
import { ShipmentRepository } from '../repositories/shipment-repository'

interface GetShipmentByIdUseCaseRequest {
  id: string
}

type GetShipmentByIdUseCaseResponse = Either<
  ShipmentNotFoundError,
  {
    shipment: Shipment
  }
>

export class GetShipmentByIdUseCase {
  constructor(private shipmentRepository: ShipmentRepository) {}

  public async execute({
    id,
  }: GetShipmentByIdUseCaseRequest): Promise<GetShipmentByIdUseCaseResponse> {
    const shipment = await this.shipmentRepository.findById(id)

    if (!shipment) {
      return left(new ShipmentNotFoundError())
    }

    return right({
      shipment,
    })
  }
}
