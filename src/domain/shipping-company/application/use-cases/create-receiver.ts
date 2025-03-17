import { Either, left, right } from '@/core/errors/either'
import { Receiver } from '../../enterprise/entities/receiver'
import { ReceiverRepository } from '../repositories/receiver-repository'
import { ReceiverAlreadyExistsError } from './errors/receiver-already-exists-error'
import { Cpf } from '../../enterprise/entities/value-objects/cpf'

interface CreateReceiverUseCaseRequest {
  cpf: string
  address: string
}

type CreateReceiverUseCaseResponse = Either<
  ReceiverAlreadyExistsError,
  {
    receiver: Receiver
  }
>

export class CreateReceiverUseCase {
  constructor(private receiverRepository: ReceiverRepository) {}

  public async execute({
    cpf,
    address,
  }: CreateReceiverUseCaseRequest): Promise<CreateReceiverUseCaseResponse> {
    const receiverExists = await this.receiverRepository.findByCpf(cpf)

    if (receiverExists) {
      return left(new ReceiverAlreadyExistsError(cpf))
    }

    const receiver = Receiver.create({
      cpf: Cpf.create({
        value: cpf,
      }),
      address,
    })

    await this.receiverRepository.create(receiver)

    return right({
      receiver,
    })
  }
}
