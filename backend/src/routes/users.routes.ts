import { Router, response } from 'express';
import CreateUserService from './../services/CreateUserService';
import ensureAuth from './../middlewares/ensureAuth';
import multer from 'multer';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from './../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {

  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);

});

usersRouter.patch(
  '/avatar',
  ensureAuth,
  upload.single('avatar'),
  async (request, response) => {

    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.excecute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    })

    delete user.password;
    return response.json(user)

  });

export default usersRouter;
