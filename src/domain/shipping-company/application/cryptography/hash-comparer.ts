export abstract class HashComparer {
  abstract compare(rawPassword: string, hash: string): Promise<boolean>
}
