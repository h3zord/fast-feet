import { Admin } from '../../enterprise/entities/admin'
import { Courier } from '../../enterprise/entities/courier'

export abstract class UserRepository {
  abstract findByCpf(cpf: string): Promise<Admin | Courier>
}
