import { Either, right } from '@/core/errors/either'
import { Receiver } from '../../enterprise/entities/receiver'
import { ReceiverRepository } from '../repositories/receiver-repository'

interface CreateReceiverUseCaseRequest {
  address: string
}

type CreateReceiverUseCaseResponse = Either<
  null,
  {
    receiver: Receiver
  }
>

export class CreateReceiverUseCase {
  constructor(private receiverRepository: ReceiverRepository) {}

  public async execute({
    address,
  }: CreateReceiverUseCaseRequest): Promise<CreateReceiverUseCaseResponse> {
    const receiver = Receiver.create({
      address,
    })

    await this.receiverRepository.create(receiver)

    return right({
      receiver,
    })
  }
}
