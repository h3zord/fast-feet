import { generate as generateCpf } from 'gerador-validador-cpf'
import { Cpf } from '../../enterprise/entities/value-objects/cpf'
import { CourierNotFoundError } from './errors/courier-not-found-error'
import { InMemoryCourierRepository } from 'test/repositories/in-memory-courier-repository'
import { makeCourier } from 'test/factories/make-courier'
import { EditCourierUseCase } from './edit-courier'

let editCourierUseCase: EditCourierUseCase

let courierRepository: InMemoryCourierRepository

describe('Edit courier use case', () => {
  courierRepository = new InMemoryCourierRepository()

  editCourierUseCase = new EditCourierUseCase(courierRepository)

  const cpf = generateCpf()

  beforeAll(async () => {
    const courier = makeCourier({
      cpf: Cpf.create({ value: cpf }),
    })

    courierRepository.create(courier)
  })

  it('should be able to edit a courier by cpf correctly', async () => {
    const result = await editCourierUseCase.execute({
      cpf,
      password: 'new-password',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      courier: expect.objectContaining({
        password: 'new-password',
      }),
    })
  })

  it('should not be able to edit a courier by cpf when it does not exist', async () => {
    const result = await editCourierUseCase.execute({
      cpf: 'invalid-cpf',
      password: 'new-password',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(CourierNotFoundError)
  })
})
