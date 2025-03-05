import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface RecipientProps {
  createdAt: Date
}

export class Recipient extends Entity<RecipientProps> {
  static create(
    props: Optional<RecipientProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const recipient = new Recipient(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return recipient
  }
}
