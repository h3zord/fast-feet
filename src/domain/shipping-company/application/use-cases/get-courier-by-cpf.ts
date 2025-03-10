import { Either, left, right } from '@/core/errors/either'
import { Courier } from '../../enterprise/entities/courier'
import { UserRepository } from '../repositories/user-repository'
import { CourierNotFoundError } from './errors/courier-not-found-error'

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
  constructor(private userRepository: UserRepository) {}

  public async execute({
    cpf,
  }: GetCourierByCpfUseCaseRequest): Promise<GetCourierByCpfUseCaseResponse> {
    const courier = await this.userRepository.findByCpf(cpf)

    if (!courier) {
      return left(new CourierNotFoundError())
    }

    return right({
      courier,
    })
  }
}
