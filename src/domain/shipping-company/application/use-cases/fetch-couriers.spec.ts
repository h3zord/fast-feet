import { generate as generateCpf } from 'gerador-validador-cpf'
import { Cpf } from '../../enterprise/entities/value-objects/cpf'
import { InMemoryCourierRepository } from 'test/repositories/in-memory-courier-repository'
import { makeCourier } from 'test/factories/make-courier'
import { FetchCouriersUseCase } from './fetch-couriers'

let fetchCouriersUseCase: FetchCouriersUseCase

let courierRepository: InMemoryCourierRepository

describe('Fetch couriers use case', () => {
  courierRepository = new InMemoryCourierRepository()

  fetchCouriersUseCase = new FetchCouriersUseCase(courierRepository)

  beforeAll(async () => {
    const courier1 = makeCourier({
      cpf: Cpf.create({ value: generateCpf() }),
    })

    const courier2 = makeCourier({
      cpf: Cpf.create({ value: generateCpf() }),
    })

    courierRepository.create(courier1)
    courierRepository.create(courier2)
  })

  it('should be able to fetch all couriers correctly', async () => {
    const result = await fetchCouriersUseCase.execute()

    expect(result.isRight()).toBe(true)
    expect(result.value?.couriers).toHaveLength(2)
  })
})
