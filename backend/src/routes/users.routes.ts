import { Router, response } from 'express';
import CreateUserService from './../services/CreateUserService';
import ensureAuth from './../middlewares/ensureAuth';
import multer from 'multer';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from './../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);

  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuth,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.excecute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      })

      delete user.password;
      return response.json(user)
    } catch (err) {
      return response.status(err.statusCode).json({ message: err.message });
    }

  });

export default usersRouter;
