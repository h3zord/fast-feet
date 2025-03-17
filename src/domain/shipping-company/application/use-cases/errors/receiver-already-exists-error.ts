export class ReceiverAlreadyExistsError extends Error {
  constructor(identifier: string) {
    super(`Receiver "${identifier}" already exists`)
  }
}
