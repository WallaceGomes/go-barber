import IHashProvider from '../models/IHashProvider';

class FakeHashProvider implements IHashProvider {
  public async gerenateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}
export default FakeHashProvider;
