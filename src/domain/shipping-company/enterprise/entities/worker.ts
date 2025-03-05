import { Entity } from 'src/core/entities/entity'
import { Cpf } from './value-objects/cpf'

interface WorkerProps {
  cpf: Cpf
  password: string
}

export abstract class Worker<Props extends WorkerProps> extends Entity<Props> {
  private _cpf: Cpf
  private _password: string

  abstract getRole(): 'admin' | 'courier'

  get cpf() {
    return this._cpf
  }

  get password() {
    return this._password
  }
}
