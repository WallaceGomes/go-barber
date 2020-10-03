import User from '../infra/typeorm/entities/User';
import uploadConfig from '../../../config/upload';
import path from 'path';
import fs from 'fs';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  constructor(private usersRepository: IUsersRepository) {}

  public async excecute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findByID(user_id);

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
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
