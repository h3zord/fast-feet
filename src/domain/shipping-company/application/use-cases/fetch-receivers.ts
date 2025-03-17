import { Either, right } from '@/core/errors/either'
import { ReceiverRepository } from '../repositories/receiver-repository'
import { Receiver } from '../../enterprise/entities/receiver'

type FetchReceiversUseCaseResponse = Either<
  null,
  {
    receivers: Receiver[]
  }
>

export class FetchReceiversUseCase {
  constructor(private receiverRepository: ReceiverRepository) {}

  public async execute(): Promise<FetchReceiversUseCaseResponse> {
    const receivers = await this.receiverRepository.fetchAll()

    return right({
      receivers,
    })
  }
}
