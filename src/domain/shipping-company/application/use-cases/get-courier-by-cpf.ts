import { Either, left, right } from '@/core/errors/either'
import { Courier } from '../../enterprise/entities/courier'
import { CourierNotFoundError } from './errors/courier-not-found-error'
import { CourierRepository } from '../repositories/courier-repository'

interface GetCourierByCpfUseCaseRequest {
  cpf: string
}

type GetCourierByCpfUseCaseResponse = Either<
  CourierNotFoundError,
  {
    courier: Courier
  }
>

export class GetCourierByCpfUseCase {
  constructor(private courierRepository: CourierRepository) {}

  public async execute({
    cpf,
  }: GetCourierByCpfUseCaseRequest): Promise<GetCourierByCpfUseCaseResponse> {
    const courier = await this.courierRepository.findByCpf(cpf)

    if (!courier) {
      return left(new CourierNotFoundError())
    }

    return right({
      courier,
    })
  }
}
