import { Either, left, right } from '@/core/errors/either'
import { ReceiverNotFoundError } from './errors/receiver-not-found-error'
import { ReceiverRepository } from '../repositories/receiver-repository'

interface DeleteReceiverUseCaseRequest {
  cpf: string
}

type DeleteReceiverUseCaseResponse = Either<ReceiverNotFoundError, null>

export class DeleteReceiverUseCase {
  constructor(private receiverRepository: ReceiverRepository) {}

  public async execute({
    cpf,
  }: DeleteReceiverUseCaseRequest): Promise<DeleteReceiverUseCaseResponse> {
    const receiver = await this.receiverRepository.findByCpf(cpf)

    if (!receiver) {
      return left(new ReceiverNotFoundError())
    }

    await this.receiverRepository.delete(receiver)

    return right(null)
  }
}
