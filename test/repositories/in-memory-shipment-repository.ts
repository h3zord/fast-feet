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

  async fetchAll() {
    return this.items
  }

  async save(shipment: Shipment) {
    const shipmentIndex = this.items.findIndex(
      (item) => item.id.toString() === shipment.id.toString(),
    )

    this.items[shipmentIndex] = shipment
  }

  async delete(shipment: Shipment) {
    const shipmentIndex = this.items.findIndex(
      (item) => item.id.toString() === shipment.id.toString(),
    )

    this.items.splice(shipmentIndex, 1)
  }
}
