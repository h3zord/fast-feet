import { Entity } from 'src/core/entities/entity'
import { Cpf } from './value-objects/cpf'

export interface WorkerProps {
  cpf: Cpf
  password: string
  createdAt: Date
}

export abstract class Worker<Props extends WorkerProps> extends Entity<Props> {
  abstract getRole(): 'admin' | 'courier'

  get cpf() {
    return this.props.cpf
  }

  get password() {
    return this.props.password
  }

  get createdAt() {
    return this.createdAt
  }
}
