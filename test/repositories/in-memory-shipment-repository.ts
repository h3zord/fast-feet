import { ShipmentRepository } from '@/domain/shipping-company/application/repositories/shipment-repository'
import { Shipment } from '@/domain/shipping-company/enterprise/entities/shipment'

export class InMemoryShipmentRepository implements ShipmentRepository {
  public items: Shipment[] = []

  async create(shipment: Shipment) {
    this.items.push(shipment)
  }

  async findById(id: string) {
    const shipment = this.items.find((item) => item.id.toString() === id)

    if (!shipment) {
      return null
    }

    return shipment
  }
}
