import { Either, left, right } from '@/core/errors/either'
import { CourierNotFoundError } from './errors/courier-not-found-error'
import { CourierRepository } from '../repositories/courier-repository'

interface DeleteCourierUseCaseRequest {
  cpf: string
}

type DeleteCourierUseCaseResponse = Either<CourierNotFoundError, null>

export class DeleteCourierUseCase {
  constructor(private courierRepository: CourierRepository) {}

  public async execute({
    cpf,
  }: DeleteCourierUseCaseRequest): Promise<DeleteCourierUseCaseResponse> {
    const courier = await this.courierRepository.findByCpf(cpf)

    if (!courier) {
      return left(new CourierNotFoundError())
    }

    await this.courierRepository.delete(courier)

    return right(null)
  }
}
