import { Optional } from 'src/core/types/optional'
import { Worker, WorkerProps } from './worker'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

interface CourierProps extends WorkerProps {}

export class Courier extends Worker<CourierProps> {
  public getRole(): 'admin' | 'courier' {
    return 'courier'
  }

  static create(
    props: Optional<CourierProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const courier = new Courier(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return courier
  }
}
