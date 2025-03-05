import { generate as generateCpf } from 'gerador-validador-cpf'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import { Cpf } from '@/domain/shipping-company/enterprise/entities/value-objects/cpf'
import {
  AdmininistratorProps,
  Administrator,
} from '@/domain/shipping-company/enterprise/entities/administrator'

export function makeAdmin(
  override: Partial<AdmininistratorProps> = {},
  id?: UniqueEntityId,
) {
  const administrator = Administrator.create(
    {
      cpf: Cpf.create({ value: generateCpf() }),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return administrator
}
