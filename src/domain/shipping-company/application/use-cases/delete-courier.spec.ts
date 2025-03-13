import { generate as generateCpf } from 'gerador-validador-cpf'
import { Cpf } from '../../enterprise/entities/value-objects/cpf'
import { CourierNotFoundError } from './errors/courier-not-found-error'
import { InMemoryCourierRepository } from 'test/repositories/in-memory-courier-repository'
import { makeCourier } from 'test/factories/make-courier'
import { DeleteCourierUseCase } from './delete-courier'

let deleteCourierUseCase: DeleteCourierUseCase

let courierRepository: InMemoryCourierRepository

describe('Delete courier use case', () => {
  courierRepository = new InMemoryCourierRepository()

  deleteCourierUseCase = new DeleteCourierUseCase(courierRepository)

  const cpf = generateCpf()

  beforeAll(async () => {
    const courier = makeCourier({
      cpf: Cpf.create({ value: cpf }),
    })

    courierRepository.create(courier)
  })

  it('should be able to delete a courier by cpf correctly', async () => {
    const result = await deleteCourierUseCase.execute({
      cpf,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toBeNull()
  })

  it('should not be able to delete a courier by cpf when it does not exist', async () => {
    const result = await deleteCourierUseCase.execute({
      cpf: 'invalid-cpf',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(CourierNotFoundError)
  })
})
