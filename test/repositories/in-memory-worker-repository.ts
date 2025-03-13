import { WorkerRepository } from '@/domain/shipping-company/application/repositories/worker-repository'
import { Administrator } from '@/domain/shipping-company/enterprise/entities/administrator'
import { Courier } from '@/domain/shipping-company/enterprise/entities/courier'

export class InMemoryWorkerRepository implements WorkerRepository {
  public items: (Administrator | Courier)[] = []

  async findByCpf(cpf: string) {
    const worker = this.items.find((item) => item.cpf.toString() === cpf)

    if (!worker) {
      return null
    }

    return worker
  }
}
