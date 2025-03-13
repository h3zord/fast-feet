import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface ReceiverProps {
  createdAt: Date
  updatedAt?: Date | null
}

export class Receiver extends Entity<ReceiverProps> {
  static create(
    props: Optional<ReceiverProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const receiver = new Receiver(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return receiver
  }
}
