import { Either, left, right } from '@/core/errors/either'
import { Courier } from '../../enterprise/entities/courier'
import { HashComparer } from '../cryptography/hash-comparer'
import { UserRepository } from '../repositories/user-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { Administrator } from '../../enterprise/entities/administrator'

interface AuthenticateUseCaseRequest {
  cpf: string
  password: string
}

type AuthenticateUseCaseResponse = Either<
  WrongCredentialsError,
  {
    user: Administrator | Courier
  }
>

export class AuthenticateUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashComparer: HashComparer,
  ) {}

  public async execute({
    cpf,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByCpf(cpf)

    if (!user) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    return right({
      user,
    })
  }
}
