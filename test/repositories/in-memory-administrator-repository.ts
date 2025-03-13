import { AdministratorRepository } from '@/domain/shipping-company/application/repositories/administrator-repository'
import { Administrator } from '@/domain/shipping-company/enterprise/entities/administrator'

export class InMemoryAdministratorRepository
  implements AdministratorRepository
{
  public items: Administrator[] = []

  async create(administrator: Administrator) {
    this.items.push(administrator)
  }
}
