import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface ShipmentProps {
  createdAt: Date
  updatedAt?: Date | null
}

export class Shipment extends Entity<ShipmentProps> {
  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<ShipmentProps, 'createdAt'> = {},
    id?: UniqueEntityId,
  ) {
    const shipment = new Shipment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return shipment
  }
}
