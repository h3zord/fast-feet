import { Administrator } from '../../enterprise/entities/administrator'
import { Courier } from '../../enterprise/entities/courier'

export abstract class UserRepository {
  abstract create(user: Courier | Administrator): Promise<void>
  abstract findByCpf(cpf: string): Promise<Administrator | Courier | null>
}
