import { Either, left, right } from '@/core/errors/either'
import { HashComparer } from '../cryptography/hash-comparer'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { Encrypter } from '../cryptography/encrypter'
import { WorkerRepository } from '../repositories/worker-repository'

interface AuthenticateUseCaseRequest {
  cpf: string
  password: string
}

type AuthenticateUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

export class AuthenticateUseCase {
  constructor(
    private workerRepository: WorkerRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  public async execute({
    cpf,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const worker = await this.workerRepository.findByCpf(cpf)

    if (!worker) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      worker.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: worker.id.toString(),
      role: worker.getRole(),
    })

    return right({
      accessToken,
    })
  }
}
