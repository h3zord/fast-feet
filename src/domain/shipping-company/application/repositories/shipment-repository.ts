import { Shipment } from '../../enterprise/entities/shipment'

export abstract class ShipmentRepository {
  abstract create(shipment: Shipment): Promise<void>
  abstract findById(id: string): Promise<Shipment | null>
}
