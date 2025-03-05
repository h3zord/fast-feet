import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface OrderProps {
  createdAt: Date
}

export class Order extends Entity<OrderProps> {
  static create(props: Optional<OrderProps, 'createdAt'>, id?: UniqueEntityId) {
    const order = new Order(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return order
  }
}
