export class CourierNotFoundError extends Error {
  constructor() {
    super('Courier not found')
  }
}
