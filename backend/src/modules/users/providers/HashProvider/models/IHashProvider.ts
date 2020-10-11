export default interface IHashProvider {
  gerenateHash(payload: string): Promise<string>;
  compareHash(pauload: string, hashed: string): Promise<boolean>;
}
