import { generate as generateCpf } from 'gerador-validador-cpf'
import { makeAdmin } from 'test/factories/make-administrator'
import { Cpf } from '../../enterprise/entities/value-objects/cpf'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'

let authenticateUseCase: AuthenticateUseCase

let userRepository: InMemoryUserRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter

describe('Authenticate use case', () => {
  userRepository = new InMemoryUserRepository()
  fakeHasher = new FakeHasher()
  fakeEncrypter = new FakeEncrypter()

  authenticateUseCase = new AuthenticateUseCase(
    userRepository,
    fakeHasher,
    fakeEncrypter,
  )

  const cpf = generateCpf()

  beforeAll(async () => {
    const admin = makeAdmin({
      cpf: Cpf.create({ value: cpf }),
      password: await fakeHasher.hash('123456'),
    })

    userRepository.create(admin)
  })

  it('should be able to authenticate an user correctly', async () => {
    const result = await authenticateUseCase.execute({
      cpf,
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('should not be able to authenticate an user when the credentials are incorrect', async () => {
    const result = await authenticateUseCase.execute({
      cpf,
      password: 'invalid-password',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
