import { generate as generateCpf } from 'gerador-validador-cpf'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import { Cpf } from '@/domain/shipping-company/enterprise/entities/value-objects/cpf'
import {
  Courier,
  CourierProps,
} from '@/domain/shipping-company/enterprise/entities/courier'

export function makeCourier(
  override: Partial<CourierProps> = {},
  id?: UniqueEntityId,
) {
  const courier = Courier.create(
    {
      cpf: Cpf.create({ value: generateCpf() }),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return courier
}
