import { ReceiverRepository } from '@/domain/shipping-company/application/repositories/receiver-repository'
import { Receiver } from '@/domain/shipping-company/enterprise/entities/receiver'

export class InMemoryReceiverRepository implements ReceiverRepository {
  public items: Receiver[] = []

  async create(receiver: Receiver) {
    this.items.push(receiver)
  }

  async findByCpf(cpf: string) {
    const receiver = this.items.find((item) => item.cpf.toString() === cpf)

    if (!receiver) {
      return null
    }

    return receiver
  }

  async fetchAll() {
    return this.items
  }

  async save(receiver: Receiver) {
    const receiverIndex = this.items.findIndex(
      (item) => item.id.toString() === receiver.id.toString(),
    )

    this.items[receiverIndex] = receiver
  }

  async delete(receiver: Receiver) {
    const receiverIndex = this.items.findIndex(
      (item) => item.id.toString() === receiver.id.toString(),
    )

    this.items.splice(receiverIndex, 1)
  }
}
