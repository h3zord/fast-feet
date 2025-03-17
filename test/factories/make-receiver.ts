import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
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
      ...override,
      address: faker.location.streetAddress({ useFullAddress: true }),
    },
    id,
  )

  return receiver
}
