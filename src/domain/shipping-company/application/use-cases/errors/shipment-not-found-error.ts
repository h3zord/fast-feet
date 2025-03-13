export class ShipmentNotFoundError extends Error {
  constructor() {
    super(`Shipment not found`)
  }
}
