import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Shipment,
  ShipmentProps,
} from '@/domain/shipping-company/enterprise/entities/shipment'

export function makeShipment(
  override: Partial<ShipmentProps> = {},
  id?: UniqueEntityId,
) {
  const shipment = Shipment.create(
    {
      ...override,
    },
    id,
  )

  return shipment
}
