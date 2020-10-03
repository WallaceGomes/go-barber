import { Router } from 'express';
import AuthUserService from '../../../services/AuthUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const usersRepository = new UsersRepository();

  const authUser = new AuthUserService(usersRepository);

  const { user, token } = await authUser.execute({
    email,
    password,
  });

  user.password = '';

  return response.json({ user, token });
});

export default sessionsRouter;
