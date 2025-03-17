import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { generate as generateCpf } from 'gerador-validador-cpf'
import { faker } from '@faker-js/faker'
import { Cpf } from '@/domain/shipping-company/enterprise/entities/value-objects/cpf'
import {
  Receiver,
  ReceiverProps,
} from '@/domain/shipping-company/enterprise/entities/receiver'

export function makeReceiver(
  override: Partial<ReceiverProps> = {},
  id?: UniqueEntityId,
) {
  const receiver = Receiver.create(
    {
      cpf: Cpf.create({ value: generateCpf() }),
      address: faker.location.streetAddress({ useFullAddress: true }),
      ...override,
    },
    id,
  )

  return receiver
}
