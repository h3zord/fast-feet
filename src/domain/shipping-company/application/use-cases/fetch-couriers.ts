import { Either, right } from '@/core/errors/either'
import { Courier } from '../../enterprise/entities/courier'
import { CourierRepository } from '../repositories/courier-repository'

type FetchCouriersUseCaseResponse = Either<
  null,
  {
    couriers: Courier[]
  }
>

export class FetchCouriersUseCase {
  constructor(private courierRepository: CourierRepository) {}

  public async execute(): Promise<FetchCouriersUseCaseResponse> {
    const couriers = await this.courierRepository.fetchAll()

    return right({
      couriers,
    })
  }
}
