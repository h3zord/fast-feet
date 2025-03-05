import { Optional } from '@/core/types/optional'
import { Worker, WorkerProps } from './worker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface AdmininistratorProps extends WorkerProps {}

export class Administrator extends Worker<AdmininistratorProps> {
  public getRole(): 'admin' | 'courier' {
    return 'admin'
  }

  static create(
    props: Optional<AdmininistratorProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const admin = new Administrator(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return admin
  }
}
