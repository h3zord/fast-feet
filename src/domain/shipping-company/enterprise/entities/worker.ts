import { Entity } from '@/core/entities/entity'
import { Cpf } from './value-objects/cpf'

export interface WorkerProps {
  cpf: Cpf
  password: string
  createdAt: Date
  updatedAt?: Date | null
}

export abstract class Worker<Props extends WorkerProps> extends Entity<Props> {
  abstract getRole(): 'admin' | 'courier'

  private touch() {
    this.props.updatedAt = new Date()
  }

  get cpf() {
    return this.props.cpf
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password

    this.touch()
  }

  get createdAt() {
    return this.createdAt
  }

  get updatedAt() {
    return this.updatedAt
  }
}
