import { Admin } from '../../enterprise/entities/admin'
import { Courier } from '../../enterprise/entities/courier'
import { HashComparer } from '../cryptography/hash-comparer'
import { UserRepository } from '../repositories/user-repository'

interface AuthenticateUseCaseRequest {
  cpf: string
  password: string
}

type AuthenticateUseCaseResponse = Admin | Courier

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
      throw new Error('CPF or password are invalid')
    }

    const isPasswordValid = this.hashComparer.compare(password, user.password)

    if (!isPasswordValid) {
      throw new Error('CPF or password are invalid')
    }

    return user
  }
}
