import { Receiver } from '../../enterprise/entities/receiver'

export abstract class ReceiverRepository {
  abstract create(receiver: Receiver): Promise<void>
  abstract findById(id: string): Promise<Receiver | null>
  abstract fetchAll(): Promise<Receiver[]>
  abstract save(receiver: Receiver): Promise<void>
  abstract delete(receiver: Receiver): Promise<void>
}
