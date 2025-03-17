import { Either, left, right } from '@/core/errors/either'
import { Receiver } from '../../enterprise/entities/receiver'
import { ReceiverNotFoundError } from './errors/receiver-not-found-error'
import { ReceiverRepository } from '../repositories/receiver-repository'

interface EditReceiverUseCaseRequest {
  cpf: string
  address: string
}

type EditReceiverUseCaseResponse = Either<
  ReceiverNotFoundError,
  {
    receiver: Receiver
  }
>

export class EditReceiverUseCase {
  constructor(private receiverRepository: ReceiverRepository) {}

  public async execute({
    cpf,
    address,
  }: EditReceiverUseCaseRequest): Promise<EditReceiverUseCaseResponse> {
    const receiver = await this.receiverRepository.findByCpf(cpf)

    if (!receiver) {
      return left(new ReceiverNotFoundError())
    }

    receiver.address = address

    await this.receiverRepository.save(receiver)

    return right({
      receiver,
    })
  }
}
