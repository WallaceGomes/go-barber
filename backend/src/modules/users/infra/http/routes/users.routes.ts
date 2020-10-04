import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import ensureAuth from '../middlewares/ensureAuth';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';

const usersRouter = Router();
const userAvatarController = new UserAvatarController();
const usersController = new UsersController();
const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.patch('/avatar', ensureAuth, userAvatarController.update);

export default usersRouter;
