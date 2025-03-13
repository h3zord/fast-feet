import { Administrator } from '../../enterprise/entities/administrator'
import { Courier } from '../../enterprise/entities/courier'

export abstract class CourierRepository {
  abstract create(user: Courier | Administrator): Promise<void>
  abstract findByCpf(cpf: string): Promise<Courier | null>
  abstract fetchAll(): Promise<Courier[]>
  abstract save(courier: Courier): Promise<void>
  abstract delete(courier: Courier): Promise<void>
}
