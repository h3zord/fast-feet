import { generate as generateCpf } from 'gerador-validador-cpf'
import { makeAdmin } from 'test/factories/make-administrator'
import { Cpf } from '../../enterprise/entities/value-objects/cpf'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { GetCourierByCpfUseCase } from './get-courier-by-cpf'
import { CourierNotFoundError } from './errors/courier-not-found-error'

let getCourierByCpfUseCase: GetCourierByCpfUseCase

let userRepository: InMemoryUserRepository

describe('GetCourierByCpf use case', () => {
  userRepository = new InMemoryUserRepository()

  getCourierByCpfUseCase = new GetCourierByCpfUseCase(userRepository)

  const cpf = generateCpf()

  beforeAll(async () => {
    const admin = makeAdmin({
      cpf: Cpf.create({ value: cpf }),
    })

    userRepository.create(admin)
  })

  it('should be able to get a courier by cpf correctly', async () => {
    const result = await getCourierByCpfUseCase.execute({
      cpf,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      courier: expect.objectContaining({
        cpf: Cpf.create({ value: cpf }),
      }),
    })
  })

  it('should not be able to get a courier by cpf when it does not exist', async () => {
    const result = await getCourierByCpfUseCase.execute({
      cpf: 'invalid-cpf',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(CourierNotFoundError)
  })
})
