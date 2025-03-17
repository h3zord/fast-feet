import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface ShipmentProps {
  status: 'AWAITING_PICKUP' | 'PICKED_UP' | 'DELIVERED' | 'RETURNED'
  createdAt: Date
  updatedAt?: Date | null
}

export class Shipment extends Entity<ShipmentProps> {
  private touch() {
    this.props.updatedAt = new Date()
  }

  get status() {
    return this.props.status
  }

  set status(
    status: 'AWAITING_PICKUP' | 'PICKED_UP' | 'DELIVERED' | 'RETURNED',
  ) {
    this.props.status = status

    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<ShipmentProps, 'status' | 'createdAt'> = {},
    id?: UniqueEntityId,
  ) {
    const shipment = new Shipment(
      {
        ...props,
        status: props.status ?? 'AWAITING_PICKUP',
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return shipment
  }
}
