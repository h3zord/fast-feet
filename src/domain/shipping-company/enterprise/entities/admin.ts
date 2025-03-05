import { Optional } from '@/core/types/optional'
import { Worker, WorkerProps } from './worker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface AdminProps extends WorkerProps {}

export class Admin extends Worker<AdminProps> {
  public getRole(): 'admin' | 'courier' {
    return 'admin'
  }

  static create(props: Optional<AdminProps, 'createdAt'>, id?: UniqueEntityId) {
    const admin = new Admin(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return admin
  }
}
