import { Administrator } from '../../enterprise/entities/administrator'
import { Courier } from '../../enterprise/entities/courier'

export abstract class UserRepository {
  abstract findByCpf(cpf: string): Promise<Administrator | Courier | null>
}
