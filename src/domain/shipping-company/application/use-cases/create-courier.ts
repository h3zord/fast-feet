import { Either, left, right } from '@/core/errors/either'
import { Courier } from '../../enterprise/entities/courier'
import { CourierAlreadyExistsError } from './errors/courier-already-exists-error'
import { Cpf } from '../../enterprise/entities/value-objects/cpf'
import { HashGenerator } from '../cryptography/hash-generator'
import { CourierRepository } from '../repositories/courier-repository'

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
    private courierRepository: CourierRepository,
    private hashGenerator: HashGenerator,
  ) {}

  public async execute({
    cpf,
    password,
  }: CreateCourierUseCaseRequest): Promise<CreateCourierUseCaseResponse> {
    const courierExists = await this.courierRepository.findByCpf(cpf)

    if (courierExists) {
      return left(new CourierAlreadyExistsError(cpf))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const courier = Courier.create({
      cpf: Cpf.create({ value: cpf }),
      password: hashedPassword,
    })

    await this.courierRepository.create(courier)

    return right({
      courier,
    })
  }
}
