import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Cpf } from './value-objects/cpf'

export interface ReceiverProps {
  cpf: Cpf
  address: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Receiver extends Entity<ReceiverProps> {
  get cpf() {
    return this.props.cpf
  }

  get address() {
    return this.props.address
  }

  set address(address: string) {
    this.props.address = address
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

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
