import { Router } from 'express';
import AuthUserService from '../../../../modules/users/services/AuthUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authUser = new AuthUserService();

  const { user, token } = await authUser.execute({
    email,
    password,
  });

  user.password = '';

  return response.json({ user, token });
});

export default sessionsRouter;
