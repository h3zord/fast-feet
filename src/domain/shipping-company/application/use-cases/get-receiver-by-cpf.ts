import { Either, left, right } from '@/core/errors/either'
import { Receiver } from '../../enterprise/entities/receiver'
import { ReceiverNotFoundError } from './errors/receiver-not-found-error'
import { ReceiverRepository } from '../repositories/receiver-repository'

interface GetReceiverByCpfUseCaseRequest {
  cpf: string
}

type GetReceiverByCpfUseCaseResponse = Either<
  ReceiverNotFoundError,
  {
    receiver: Receiver
  }
>

export class GetReceiverByCpfUseCase {
  constructor(private receiverRepository: ReceiverRepository) {}

  public async execute({
    cpf,
  }: GetReceiverByCpfUseCaseRequest): Promise<GetReceiverByCpfUseCaseResponse> {
    const receiver = await this.receiverRepository.findByCpf(cpf)

    if (!receiver) {
      return left(new ReceiverNotFoundError())
    }

    return right({
      receiver,
    })
  }
}
