import { CourierRepository } from '@/domain/shipping-company/application/repositories/courier-repository'
import { Courier } from '@/domain/shipping-company/enterprise/entities/courier'

export class InMemoryCourierRepository implements CourierRepository {
  public items: Courier[] = []

  async create(courier: Courier) {
    this.items.push(courier)
  }

  async findByCpf(cpf: string) {
    const courier = this.items.find((item) => item.cpf.toString() === cpf)

    if (!courier) {
      return null
    }

    return courier
  }

  async fetchAll() {
    return this.items
  }

  async save(courier: Courier) {
    const courierIndex = this.items.findIndex(
      (item) => item.cpf.toString() === courier.cpf.toString(),
    )

    this.items[courierIndex] = courier
  }

  async delete(courier: Courier) {
    const courierIndex = this.items.findIndex(
      (item) => item.cpf.toString() === courier.cpf.toString(),
    )

    this.items.splice(courierIndex, 1)
  }
}
