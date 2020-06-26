import { getRepository } from 'typeorm';
import User from './../models/User';
import uploadConfig from '../config/upload';
import path from 'path';
import fs from 'fs';
import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {

  public async excecute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('User not authenticated', 401);
    }

    //Se o usuário já possuir um avatar, deleta
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      //verifica se existe um arquivo no path passado
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      //se existe apaga o arquivo
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    //a função save também serve para editar um model
    //veirica se já existe um id ? edita os dados : cria um novo
    await usersRepository.save(user);

    return user;
  }

}

export default UpdateUserAvatarService;
