import { UserRepository } from '@/domain/shipping-company/application/repositories/user-repository'
import { Administrator } from '@/domain/shipping-company/enterprise/entities/administrator'
import { Courier } from '@/domain/shipping-company/enterprise/entities/courier'

export class InMemoryUserRepository implements UserRepository {
  public items: (Administrator | Courier)[] = []

  async findByCpf(cpf: string) {
    const user = this.items.find((item) => item.cpf.toString() === cpf)

    if (!user) {
      return null
    }

    return user
  }

  async create(user: Administrator | Courier) {
    this.items.push(user)
  }
}
