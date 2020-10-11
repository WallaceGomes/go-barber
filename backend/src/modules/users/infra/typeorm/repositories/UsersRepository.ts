import { getRepository, Repository } from 'typeorm';

import User from '../entities/User';
import IUsersRepository from '../../../repositories/IUsersRepository';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;
  //precisa explicitar o tipo de retorno que essa função terá: User ou null
  //como este método é async o tipo retornado sempre será uma promise
  //mas a tipagem da promise também pode ser setado como abaixo

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByID(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const User = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(User);

    return User;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
