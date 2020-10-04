import { Router } from 'express';
import { container } from 'tsyringe';
import multer from 'multer';
import CreateUserService from '../../../services/CreateUserService';
import ensureAuth from '../middlewares/ensureAuth';
import uploadConfig from '../../../../../config/upload';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = container.resolve(CreateUserService);

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  user.password = '';

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuth,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.excecute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    // delete user.password;
    user.password = '';
    return response.json(user);
  },
);

export default usersRouter;
