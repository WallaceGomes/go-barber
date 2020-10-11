import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import uploadConfig from '../../../config/upload';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProviders';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async excecute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findByID(user_id);

    if (!user) {
      throw new AppError('User not authenticated', 401);
    }

    //Se o usuário já possuir um avatar, deleta
    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

    //a função save também serve para editar um model
    //veirica se já existe um id ? edita os dados : cria um novo
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
