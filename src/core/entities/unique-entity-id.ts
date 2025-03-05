import { randomUUID } from 'node:crypto'

export class UniqueEntityId {
  private value: string

  constructor(id?: string) {
    this.value = id ?? randomUUID()
  }

  public toString() {
    return this.value
  }

  public equals(id: UniqueEntityId) {
    return id.toString() === this.value
  }
}
