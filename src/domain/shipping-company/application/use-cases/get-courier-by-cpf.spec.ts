import { generate as generateCpf } from 'gerador-validador-cpf'
import { Cpf } from '../../enterprise/entities/value-objects/cpf'
import { GetCourierByCpfUseCase } from './get-courier-by-cpf'
import { CourierNotFoundError } from './errors/courier-not-found-error'
import { InMemoryCourierRepository } from 'test/repositories/in-memory-courier-repository'
import { makeCourier } from 'test/factories/make-courier'

let getCourierByCpfUseCase: GetCourierByCpfUseCase

let courierRepository: InMemoryCourierRepository

describe('GetCourierByCpf use case', () => {
  courierRepository = new InMemoryCourierRepository()

  getCourierByCpfUseCase = new GetCourierByCpfUseCase(courierRepository)

  const cpf = generateCpf()

  beforeAll(async () => {
    const courier = makeCourier({
      cpf: Cpf.create({ value: cpf }),
    })

    courierRepository.create(courier)
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
