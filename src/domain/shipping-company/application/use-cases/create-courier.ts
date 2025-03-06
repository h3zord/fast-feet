import { Either, left, right } from '@/core/errors/either'
import { Courier } from '../../enterprise/entities/courier'
import { UserRepository } from '../repositories/user-repository'
import { CourierAlreadyExistsError } from './errors/courier-already-exists-error'
import { Cpf } from '../../enterprise/entities/value-objects/cpf'
import { HashGenerator } from '../cryptography/hash-generator'

interface CreateCourierUseCaseRequest {
  cpf: string
  password: string
}

type CreateCourierUseCaseResponse = Either<
  CourierAlreadyExistsError,
  {
    courier: Courier
  }
>

export class CreateCourierUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  public async execute({
    cpf,
    password,
  }: CreateCourierUseCaseRequest): Promise<CreateCourierUseCaseResponse> {
    const courierExists = await this.userRepository.findByCpf(cpf)

    if (courierExists) {
      return left(new CourierAlreadyExistsError(cpf))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const courier = Courier.create({
      cpf: Cpf.create({ value: cpf }),
      password: hashedPassword,
    })

    await this.userRepository.create(courier)

    return right({
      courier,
    })
  }
}
