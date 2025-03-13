import { Administrator } from '../../enterprise/entities/administrator'

export abstract class AdministratorRepository {
  abstract create(administrator: Administrator): Promise<void>
}
