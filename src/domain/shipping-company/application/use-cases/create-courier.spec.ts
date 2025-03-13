import { generate as generateCpf } from 'gerador-validador-cpf'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { CreateCourierUseCase } from './create-courier'
import { CourierAlreadyExistsError } from './errors/courier-already-exists-error'
import { InMemoryCourierRepository } from 'test/repositories/in-memory-courier-repository'

let createCourierUseCase: CreateCourierUseCase

let courierRepository: InMemoryCourierRepository
let fakeHasher: FakeHasher

describe('Create Courier use case', () => {
  courierRepository = new InMemoryCourierRepository()
  fakeHasher = new FakeHasher()

  createCourierUseCase = new CreateCourierUseCase(courierRepository, fakeHasher)

  const cpf = generateCpf()

  it('should be able to create a courier correctly', async () => {
    const result = await createCourierUseCase.execute({
      cpf,
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(courierRepository.items).toHaveLength(1)
  })

  it('should not be able to create a courier when it already exists', async () => {
    const result = await createCourierUseCase.execute({
      cpf,
      password: '123456',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(CourierAlreadyExistsError)
  })
})
