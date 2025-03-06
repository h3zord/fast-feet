import { generate as generateCpf } from 'gerador-validador-cpf'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { CreateCourierUseCase } from './create-courier'
import { CourierAlreadyExistsError } from './errors/courier-already-exists-error'

let createcourierUseCase: CreateCourierUseCase

let userRepository: InMemoryUserRepository
let fakeHasher: FakeHasher

describe('Create Courier use case', () => {
  userRepository = new InMemoryUserRepository()
  fakeHasher = new FakeHasher()

  createcourierUseCase = new CreateCourierUseCase(userRepository, fakeHasher)

  const cpf = generateCpf()

  it('should be able to create a courier correctly', async () => {
    const result = await createcourierUseCase.execute({
      cpf,
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
  })

  it('should not be able to create a courier when it already exists', async () => {
    const result = await createcourierUseCase.execute({
      cpf,
      password: '123456',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(CourierAlreadyExistsError)
  })
})
