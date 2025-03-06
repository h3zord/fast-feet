export class CourierAlreadyExistsError extends Error {
  constructor(identifier: string) {
    super(`Courier "${identifier}" already exists`)
  }
}
