import { Either, left, right } from '@/core/errors/either'
import { Courier } from '../../enterprise/entities/courier'
import { CourierNotFoundError } from './errors/courier-not-found-error'
import { CourierRepository } from '../repositories/courier-repository'

interface EditCourierUseCaseRequest {
  cpf: string
  password: string
}

type EditCourierUseCaseResponse = Either<
  CourierNotFoundError,
  {
    courier: Courier
  }
>

export class EditCourierUseCase {
  constructor(private courierRepository: CourierRepository) {}

  public async execute({
    cpf,
    password,
  }: EditCourierUseCaseRequest): Promise<EditCourierUseCaseResponse> {
    const courier = await this.courierRepository.findByCpf(cpf)

    if (!courier) {
      return left(new CourierNotFoundError())
    }

    courier.password = password

    await this.courierRepository.save(courier)

    return right({
      courier,
    })
  }
}
