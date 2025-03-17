import { Shipment } from '../../enterprise/entities/shipment'

export abstract class ShipmentRepository {
  abstract create(shipment: Shipment): Promise<void>
  abstract findById(id: string): Promise<Shipment | null>
  abstract fetchAll(): Promise<Shipment[]>
  abstract save(shipment: Shipment): Promise<void>
  abstract delete(shipment: Shipment): Promise<void>
}
